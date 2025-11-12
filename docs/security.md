# TI-Sports Security Best Practices (Next.js 16)

## 1. Overview

Dokumen ini mengcover aspek keamanan komprehensif untuk proyek **Next.js 16** dengan **App Router**, **React 19**, dan **Supabase** sebagai backend.

**Prinsip utama:**
- **Defense in depth**: Multiple layers of security
- **Zero trust**: Validate semua input dari client
- **Least privilege**: Minimal access yang dibutuhkan
- **Audit trail**: Logging untuk monitoring
- **Secure by default**: Aktifkan security features dari awal

**Target audience:** Developers yang membangun production-ready applications dengan Next.js 16 dan Supabase.

---

## 2. App Router & API Hardening

### 2.1 Server Components Security

**Server Components adalah default** di Next.js 16 App Router. Ini memberikan keuntungan keamanan:

✅ **Advantages:**
- Code hanya run di server, tidak exposed ke client
- Direct database access tanpa expose credentials
- Sensitive operations tidak visible di client bundle
- Automatic security through server-only execution

**Example: Secure Data Fetching**

```typescript
// app/admin/dashboard/page.tsx - Server Component
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  const supabase = createClient();
  
  // ✅ Auth check di server
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    redirect('/login');
  }

  // ✅ Check admin role dari JWT claims
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    redirect('/unauthorized');
  }

  // ✅ Fetch sensitive admin data - tidak exposed ke client
  const { data: transactions } = await supabase
    .from('transactions')
    .select('*, users(email, full_name)')
    .order('created_at', { ascending: false })
    .limit(100);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Render admin data */}
    </div>
  );
}
```

**⚠️ Security Checklist:**

- [ ] Sensitive data fetching hanya di Server Components
- [ ] Auth checks di server sebelum render
- [ ] Role-based access control (RBAC) implementation
- [ ] No API keys or secrets in client components
- [ ] Use environment variables for sensitive config

### 2.2 Route Handlers Security

**Best Practices untuk `/app/api` routes:**

```typescript
// app/api/bookings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { z } from 'zod';

// ✅ Input validation schema
const bookingSchema = z.object({
  event_id: z.string().uuid(),
  participant_count: z.number().min(1).max(10),
  notes: z.string().max(500).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // ✅ 1. Authentication check
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // ✅ 2. Parse and validate input
    const body = await request.json();
    const validatedData = bookingSchema.parse(body);

    // ✅ 3. Business logic with RLS protection
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        ...validatedData,
        user_id: user.id, // ✅ Use authenticated user ID
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Booking creation error:', error);
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      );
    }

    // ✅ 4. Return success response
    return NextResponse.json({
      success: true,
      data: booking,
    }, { status: 201 });

  } catch (error) {
    // ✅ 5. Proper error handling
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: error.errors 
        },
        { status: 400 }
      );
    }
    
    // ❌ NEVER expose internal error details
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**🔒 Route Handler Security Checklist:**

- [ ] **Authentication**: Verify user sebelum process request
- [ ] **Input Validation**: Gunakan Zod/validator untuk semua input
- [ ] **Rate Limiting**: Implement rate limiting (via middleware atau Vercel)
- [ ] **CORS**: Set proper CORS headers untuk public APIs
- [ ] **Error Handling**: Jangan expose stack trace atau internal details
- [ ] **SQL Injection**: Gunakan Supabase parameterized queries (automatic)
- [ ] **XSS Prevention**: Sanitize user input sebelum store/display

### 2.3 Server Actions Security

```typescript
// app/actions/booking-actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { z } from 'zod';

const bookingSchema = z.object({
  event_id: z.string().uuid(),
  participant_count: z.number().min(1).max(10),
  notes: z.string().max(500).optional(),
});

export async function createBooking(formData: FormData) {
  try {
    // ✅ 1. Parse FormData
    const rawData = {
      event_id: formData.get('event_id') as string,
      participant_count: Number(formData.get('participant_count')),
      notes: formData.get('notes') as string || undefined,
    };

    // ✅ 2. Validate input
    const validatedData = bookingSchema.parse(rawData);

    // ✅ 3. Auth check
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return {
        success: false,
        error: 'You must be logged in',
      };
    }

    // ✅ 4. Check user limits (business logic)
    const { count } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('status', 'active');

    if (count && count >= 5) {
      return {
        success: false,
        error: 'Maximum active bookings reached',
      };
    }

    // ✅ 5. Create booking with RLS
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        ...validatedData,
        user_id: user.id,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;

    // ✅ 6. Revalidate cache
    revalidatePath('/bookings');
    revalidatePath(`/events/${validatedData.event_id}`);

    return {
      success: true,
      data: booking,
    };
  } catch (error) {
    console.error('Server action error:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Invalid form data',
        details: error.errors,
      };
    }
    
    return {
      success: false,
      error: 'Failed to create booking',
    };
  }
}
```

**Server Actions Security Best Practices:**

- [ ] Always use `'use server'` directive
- [ ] Validate all input dengan schema validator
- [ ] Check authentication di setiap action
- [ ] Implement business logic checks (rate limits, permissions)
- [ ] Use RLS untuk data access control
- [ ] Return structured errors, never expose internals
- [ ] Log errors untuk monitoring

### 2.4 Environment Variables

**Setup yang aman:**

```bash
# .env.local (NEVER commit to git)

# Public variables (exposed to browser)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=https://ti-sports.com

# Private variables (server-only)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
PAYMENT_SERVER_KEY=your-payment-server-key
WEBHOOK_SECRET=your-webhook-secret
DATABASE_URL=postgresql://...
```

```typescript
// lib/env.ts - Type-safe environment variables
import { z } from 'zod';

const envSchema = z.object({
  // Public
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  
  // Private (server-only)
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  PAYMENT_SERVER_KEY: z.string().min(1),
  WEBHOOK_SECRET: z.string().min(1),
});

export const env = envSchema.parse(process.env);
```

**⚠️ Environment Security Rules:**

- [ ] **NEVER** commit `.env.local` ke Git
- [ ] Add `.env*.local` ke `.gitignore`
- [ ] Gunakan `NEXT_PUBLIC_*` prefix hanya untuk public vars
- [ ] Service role key **ONLY** di server-side code
- [ ] Rotate keys regularly di production
- [ ] Use different keys untuk dev/staging/production

---

## 3. Authentication & Sessions

### 3.1 Supabase Auth Integration

**Server-side authentication:**

```typescript
// utils/supabase/server.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Server component context
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Server component context
          }
        },
      },
    }
  );
}
```

**Client-side authentication:**

```typescript
// utils/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

### 3.2 Middleware untuk Session Refresh

```typescript
// proxy.ts (renamed from middleware.ts in Next.js 16)
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // ✅ Refresh session if expired
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
```

### 3.3 JWT Claims & Role-Based Access

**Supabase JWT structure:**

```json
{
  "aud": "authenticated",
  "exp": 1234567890,
  "sub": "user-uuid",
  "email": "user@example.com",
  "phone": "",
  "app_metadata": {
    "provider": "email",
    "providers": ["email"]
  },
  "user_metadata": {
    "full_name": "John Doe"
  },
  "role": "authenticated",
  "is_anonymous": false
}
```

**Custom claims via Database Function:**

```sql
-- Create function untuk add custom claims
CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  claims jsonb;
  user_role text;
BEGIN
  -- Fetch user role
  SELECT role INTO user_role
  FROM public.profiles
  WHERE id = (event->>'user_id')::uuid;

  claims := event->'claims';

  -- Add custom claim
  IF user_role IS NOT NULL THEN
    claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
  END IF;

  -- Update event claims
  event := jsonb_set(event, '{claims}', claims);

  RETURN event;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.custom_access_token_hook TO supabase_auth_admin;
REVOKE EXECUTE ON FUNCTION public.custom_access_token_hook FROM authenticated, anon, public;
```

**Using custom claims dalam RLS:**

```sql
-- RLS policy untuk admin-only access
CREATE POLICY "Admin can access all transactions"
ON transactions
FOR SELECT
TO authenticated
USING (
  (SELECT auth.jwt()->>'user_role') = 'admin'
);
```

---

## 4. Input Validation & Data Sanitization

### 4.1 Zod Schema Validation

**Comprehensive validation example:**

```typescript
// lib/validations/booking.ts
import { z } from 'zod';

export const bookingSchema = z.object({
  event_id: z.string().uuid('Invalid event ID'),
  participant_count: z
    .number()
    .int()
    .min(1, 'At least 1 participant required')
    .max(10, 'Maximum 10 participants allowed'),
  notes: z
    .string()
    .max(500, 'Notes cannot exceed 500 characters')
    .optional()
    .transform((val) => val?.trim()), // ✅ Sanitize whitespace
  email: z
    .string()
    .email('Invalid email address')
    .toLowerCase(), // ✅ Normalize email
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
```

### 4.2 XSS Prevention

**React automatically escapes content**, tapi hati-hati dengan:

```typescript
// ❌ DANGEROUS - Never use dangerouslySetInnerHTML with user input
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ SAFE - React escapes automatically
<div>{userInput}</div>

// ✅ SAFE - Sanitize HTML if you must render it
import DOMPurify from 'isomorphic-dompurify';

function SafeHTML({ html }: { html: string }) {
  const sanitized = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href'],
  });
  
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}
```

### 4.3 SQL Injection Prevention

**Supabase automatically uses parameterized queries**, tapi jangan manual concatenate SQL:

```typescript
// ❌ DANGEROUS - SQL injection risk
const { data } = await supabase
  .rpc('search_events', {
    query: `SELECT * FROM events WHERE title LIKE '%${userInput}%'`
  });

// ✅ SAFE - Use Supabase query builder
const { data } = await supabase
  .from('events')
  .select('*')
  .ilike('title', `%${userInput}%`);

// ✅ SAFE - Use RPC with parameters
const { data } = await supabase
  .rpc('search_events', {
    search_term: userInput
  });
```

### 4.4 File Upload Security

```typescript
// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // ✅ Auth check
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // ✅ Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WEBP allowed' },
        { status: 400 }
      );
    }

    // ✅ Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum 5MB allowed' },
        { status: 400 }
      );
    }

    // ✅ Generate safe filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${crypto.randomUUID()}.${fileExt}`;

    // ✅ Upload to Supabase Storage dengan RLS
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      path: data.path,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
```

**File Upload Security Checklist:**

- [ ] Validate file type (whitelist, not blacklist)
- [ ] Validate file size
- [ ] Generate random filenames (prevent directory traversal)
- [ ] Store files dengan authenticated user's ID di path
- [ ] Scan files untuk malware (production: use Cloudflare/AWS scanning)
- [ ] Set proper CORS dan storage policies
- [ ] Use CDN untuk serve files (not directly from storage)

---

## 5. Rate Limiting & Captcha

### 5.1 Cloudflare Turnstile Integration

**Setup di Supabase Dashboard:**
1. Navigate to: Authentication > Bot and Abuse Protection
2. Enable CAPTCHA protection
3. Select "Cloudflare Turnstile"
4. Enter Turnstile Secret Key

**Client-side implementation:**

```typescript
// components/auth/signup-form.tsx
'use client';

import { useState, useRef } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { createClient } from '@/utils/supabase/client';

export function SignupForm() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const captchaRef = useRef<any>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaToken) {
      alert('Please complete the captcha');
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();
      
      // ✅ Pass captcha token to Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          captchaToken, // ✅ Cloudflare Turnstile token
        },
      });

      if (error) throw error;

      alert('Signup successful! Check your email.');
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed');
      
      // ✅ Reset captcha on error
      captchaRef.current?.reset();
      setCaptchaToken(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {/* ✅ Cloudflare Turnstile widget */}
      <Turnstile
        ref={captchaRef}
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onSuccess={(token) => setCaptchaToken(token)}
        onExpire={() => setCaptchaToken(null)}
      />

      <button
        type="submit"
        disabled={!captchaToken || isSubmitting}
      >
        {isSubmitting ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
}
```

**Anonymous Sign-In dengan Captcha:**

```typescript
// components/auth/anonymous-signin.tsx
'use client';

import { useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { createClient } from '@/utils/supabase/client';

export function AnonymousSignIn() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleAnonymousSignIn = async () => {
    if (!captchaToken) {
      alert('Please complete captcha');
      return;
    }

    try {
      const supabase = createClient();
      
      // ✅ Anonymous sign-in dengan captcha protection
      const { data, error } = await supabase.auth.signInAnonymously({
        options: {
          captchaToken,
        },
      });

      if (error) throw error;

      console.log('Anonymous user created:', data.user?.id);
      // Redirect atau continue flow
    } catch (error) {
      console.error('Anonymous sign-in error:', error);
    }
  };

  return (
    <div className="space-y-4">
      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onSuccess={(token) => setCaptchaToken(token)}
      />
      
      <button
        onClick={handleAnonymousSignIn}
        disabled={!captchaToken}
      >
        Continue as Guest
      </button>
    </div>
  );
}
```

### 5.2 Rate Limiting dengan Middleware

```typescript
// lib/rate-limiter.ts
import { NextRequest } from 'next/server';

interface RateLimitConfig {
  interval: number; // milliseconds
  uniqueTokenPerInterval: number; // max unique tokens
}

const cache = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(config: RateLimitConfig) {
  return {
    check: async (request: NextRequest, limit: number, token: string) => {
      const now = Date.now();
      const cached = cache.get(token);

      if (cached) {
        if (now < cached.resetTime) {
          cached.count++;
          
          if (cached.count > limit) {
            return { success: false, remaining: 0 };
          }
          
          return {
            success: true,
            remaining: limit - cached.count,
          };
        } else {
          // Reset counter
          cache.set(token, {
            count: 1,
            resetTime: now + config.interval,
          });
          return { success: true, remaining: limit - 1 };
        }
      } else {
        cache.set(token, {
          count: 1,
          resetTime: now + config.interval,
        });
        return { success: true, remaining: limit - 1 };
      }
    },
  };
}
```

**Usage dalam Route Handler:**

```typescript
// app/api/bookings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limiter';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

export async function POST(request: NextRequest) {
  // ✅ Rate limit by IP address
  const ip = request.ip ?? '127.0.0.1';
  
  const { success, remaining } = await limiter.check(
    request,
    10, // 10 requests per minute
    `booking_${ip}`
  );

  if (!success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Try again later.' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Remaining': '0',
          'Retry-After': '60',
        },
      }
    );
  }

  // Continue dengan normal request processing...
}
```

**⚠️ Production Rate Limiting:**

Untuk production-grade rate limiting, gunakan:
- **Vercel Edge Config** + middleware
- **Upstash Redis** untuk distributed rate limiting
- **Cloudflare Rate Limiting** rules

---

## 6. Secure Deployment

### 6.1 Security Headers

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

**Content Security Policy (CSP):**

```typescript
// proxy.ts - Add CSP header
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // ✅ Strict CSP
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
    "frame-src https://challenges.cloudflare.com",
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);

  return response;
}
```

### 6.2 HTTPS & Secure Cookies

**Supabase cookie configuration:**

```typescript
// utils/supabase/server.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({
              name,
              value,
              ...options,
              // ✅ Secure cookie settings
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/',
            });
          } catch (error) {
            // Server Component context
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({
              name,
              value: '',
              ...options,
              maxAge: 0,
            });
          } catch (error) {
            // Server Component context
          }
        },
      },
    }
  );
}
```

### 6.3 Dependency Security

**Automated security checks:**

```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Check with higher severity
npm audit --audit-level=high
```

**package.json scripts:**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "audit": "npm audit --audit-level=moderate",
    "audit:fix": "npm audit fix"
  }
}
```

**Dependabot configuration (.github/dependabot.yml):**

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    groups:
      production-dependencies:
        dependency-type: "production"
      development-dependencies:
        dependency-type: "development"
```

---

## 7. Error Handling & Monitoring

### 7.1 Error Boundaries

```typescript
// app/error.tsx - Root error boundary
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // ✅ Log error ke monitoring service
    console.error('Application error:', error);
    
    // TODO: Send to Sentry/LogRocket/etc
    // logErrorToService(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-4">
          We're sorry for the inconvenience.
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
```

**Custom error logging:**

```typescript
// lib/error-logger.ts
interface ErrorLog {
  message: string;
  stack?: string;
  userId?: string;
  timestamp: string;
  path: string;
}

export async function logError(error: Error, context?: Record<string, any>) {
  const errorLog: ErrorLog = {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    path: typeof window !== 'undefined' ? window.location.pathname : 'server',
    ...context,
  };

  // ❌ NEVER expose stack trace to users
  console.error('Error logged:', errorLog);

  // ✅ Send to monitoring service in production
  if (process.env.NODE_ENV === 'production') {
    try {
      await fetch('/api/log-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorLog),
      });
    } catch (e) {
      // Fail silently
      console.error('Failed to log error:', e);
    }
  }
}
```

### 7.2 Structured Logging

```typescript
// lib/logger.ts
type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: Record<string, any>;
}

class Logger {
  private log(level: LogLevel, message: string, data?: Record<string, any>) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
    };

    if (process.env.NODE_ENV === 'development') {
      console[level === 'error' ? 'error' : 'log'](
        `[${entry.timestamp}] ${level.toUpperCase()}: ${message}`,
        data || ''
      );
    } else {
      // Production: send to logging service
      // this.sendToLogService(entry);
    }
  }

  info(message: string, data?: Record<string, any>) {
    this.log('info', message, data);
  }

  warn(message: string, data?: Record<string, any>) {
    this.log('warn', message, data);
  }

  error(message: string, data?: Record<string, any>) {
    this.log('error', message, data);
  }

  debug(message: string, data?: Record<string, any>) {
    if (process.env.NODE_ENV === 'development') {
      this.log('debug', message, data);
    }
  }
}

export const logger = new Logger();
```

**Usage:**

```typescript
// app/api/bookings/route.ts
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    logger.info('Booking creation started', {
      ip: request.ip,
      userAgent: request.headers.get('user-agent'),
    });

    // ... booking logic

    logger.info('Booking created successfully', {
      bookingId: booking.id,
    });

    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    logger.error('Booking creation failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
```

---

## 8. Production Security Checklist

### 8.1 Pre-Deployment Checklist

**Application Security:**
- [ ] RLS enabled pada semua tables di Supabase
- [ ] Service role key hanya di server-side code
- [ ] Environment variables properly configured
- [ ] CORS settings configured correctly
- [ ] Rate limiting implemented
- [ ] Captcha enabled untuk auth endpoints
- [ ] File upload validation implemented
- [ ] XSS protection verified
- [ ] SQL injection tests passed

**Authentication & Authorization:**
- [ ] Anonymous sign-in dengan captcha protection
- [ ] JWT claims untuk role-based access
- [ ] Session refresh di middleware
- [ ] Secure cookie settings (httpOnly, secure, sameSite)
- [ ] Password policies enforced
- [ ] Email verification enabled
- [ ] MFA available untuk admin users

**API & Routes:**
- [ ] Input validation dengan Zod schemas
- [ ] Proper error handling (no stack trace exposure)
- [ ] Webhook signature verification
- [ ] API documentation updated
- [ ] Rate limits tested

**Infrastructure:**
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] CSP policy implemented
- [ ] Dependencies audited (`npm audit`)
- [ ] Production environment variables set
- [ ] Database backups automated
- [ ] Monitoring & alerting setup

### 8.2 Post-Deployment Monitoring

**Security Monitoring:**
- [ ] Setup error tracking (Sentry, Datadog, etc.)
- [ ] Configure uptime monitoring
- [ ] Setup security alerts (failed auth attempts, rate limit hits)
- [ ] Monitor Supabase logs
- [ ] Track API response times
- [ ] Monitor database performance

**Regular Security Tasks:**
- [ ] Weekly dependency updates
- [ ] Monthly security audits
- [ ] Quarterly key rotation
- [ ] Review RLS policies
- [ ] Check failed authentication logs
- [ ] Review access logs

### 8.3 Incident Response Plan

**Security Incident Checklist:**

1. **Detection:**
   - Monitor logs untuk unusual activity
   - Setup alerts untuk suspicious patterns
   - Regular security scans

2. **Response:**
   - Isolate affected systems
   - Rotate compromised keys immediately
   - Block malicious IPs
   - Document incident timeline

3. **Recovery:**
   - Fix vulnerability
   - Deploy security patch
   - Verify fix in staging
   - Deploy to production

4. **Post-Incident:**
   - Conduct post-mortem
   - Update security policies
   - Implement additional safeguards
   - Notify affected users if required

---

## 9. References

### Official Documentation

1. **Next.js Security**
   - https://nextjs.org/docs/app/building-your-application/configuring/mdx
   - Security best practices untuk App Router

2. **Supabase Security**
   - https://supabase.com/docs/guides/auth
   - https://supabase.com/docs/guides/database/postgres/row-level-security
   - Authentication dan RLS documentation

3. **OWASP Top 10**
   - https://owasp.org/www-project-top-ten/
   - Web application security risks

4. **Cloudflare Turnstile**
   - https://developers.cloudflare.com/turnstile/
   - CAPTCHA alternative documentation

### Security Tools

5. **npm audit**
   - Built-in npm security audit tool

6. **Snyk**
   - https://snyk.io/
   - Vulnerability scanning & monitoring

7. **OSV Scanner**
   - https://google.github.io/osv-scanner/
   - Open source vulnerability scanner

### Compliance & Standards

8. **PCI DSS** (jika handle payments)
   - https://www.pcisecuritystandards.org/

9. **GDPR Compliance**
   - https://gdpr.eu/
   - Data protection regulations

---

**Document Version:** 1.0  
**Last Updated:** November 2025  
**Maintained By:** TI-Sports Security Team