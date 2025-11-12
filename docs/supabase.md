# TI-Sports Supabase Integration (2025)

## 1. Overview & Version Info

**Supabase** adalah open-source Firebase alternative yang menyediakan:
- PostgreSQL database dengan realtime subscriptions
- Authentication system (email, OAuth, **anonymous**)
- Row Level Security (RLS) policies
- File storage dengan access control
- Edge Functions untuk server-side logic
- Realtime database changes subscriptions

**Versi yang digunakan:**
- **Supabase JS SDK**: v2.76+ (November 2025)
- **@supabase/ssr**: Latest (untuk Next.js SSR integration)
- **@supabase/auth-js**: v3+ (dengan anonymous sign-in support)
- **PostgreSQL**: 15+

**Kompatibilitas:**
- Next.js 16 App Router ✅
- React 19 Server & Client Components ✅
- Node.js 20.9+ (required untuk Next.js 16) ✅
- Edge Runtime support ✅

**Fitur utama yang dicover:**
1. Anonymous Sign-In untuk guest users
2. Turnstile Captcha integration
3. Row Level Security (RLS) policies
4. SSR setup dengan Next.js 16
5. Auth flow: Guest → Member conversion
6. Secure practices & deployment checklist

---

## 2. Anonymous Sign-In

### 2.1 Konsep Anonymous Users

**Anonymous sign-in** memungkinkan users menggunakan aplikasi tanpa registrasi terlebih dahulu. Ini menurunkan friction untuk trial atau guest access.

**Key concepts:**
- Anonymous users tetap **authenticated** (bukan public/anon role)
- UUID tetap selama session active
- Dapat di-convert jadi permanent user
- Bisa punya data (bookings, cart) yang persist setelah conversion
- Memerlukan **captcha protection** untuk prevent abuse

**Use cases:**
- Sports booking: Guest bisa booking tanpa account dulu
- E-commerce: Add to cart sebelum checkout/signup
- SaaS trial: Try features sebelum commit signup

### 2.2 Enable Anonymous Sign-In

**Di Supabase Dashboard:**

1. Navigate to: **Authentication** → **Providers**
2. Scroll ke **Anonymous** section
3. Toggle **Enable anonymous sign-ins** ke ON
4. Save changes

**Untuk local development (Supabase CLI):**

```toml
# supabase/config.toml
[auth]
enable_anonymous_sign_ins = true
```

Lalu restart Supabase:
```bash
supabase stop
supabase start
```

### 2.3 Implementation

**Client-side anonymous sign-in:**

```typescript
// components/auth/guest-signin-button.tsx
'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Turnstile } from '@marsidev/react-turnstile';

export function GuestSignInButton() {
  const router = useRouter();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGuestSignIn = async () => {
    if (!captchaToken) {
      alert('Please complete captcha verification');
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      
      // ✅ Anonymous sign-in dengan captcha protection
      const { data, error } = await supabase.auth.signInAnonymously({
        options: {
          captchaToken, // ✅ Required untuk prevent abuse
        },
      });

      if (error) throw error;

      console.log('Anonymous user created:', data.user?.id);
      console.log('Is anonymous:', data.user?.is_anonymous); // true

      // ✅ Redirect ke booking page
      router.push('/events');
      router.refresh();
    } catch (error) {
      console.error('Anonymous sign-in error:', error);
      alert('Failed to sign in as guest');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onSuccess={(token) => setCaptchaToken(token)}
        onExpire={() => setCaptchaToken(null)}
      />
      
      <button
        onClick={handleGuestSignIn}
        disabled={!captchaToken || isLoading}
        className="w-full px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        {isLoading ? 'Signing in...' : 'Continue as Guest'}
      </button>
    </div>
  );
}
```

### 2.4 Validate is_anonymous di JWT

**JWT claims untuk anonymous user:**

```json
{
  "aud": "authenticated",
  "exp": 1234567890,
  "sub": "anonymous-user-uuid",
  "email": null,
  "phone": "",
  "is_anonymous": true,  // ✅ Key claim
  "role": "authenticated"
}
```

**Check di Server Component:**

```typescript
// app/profile/page.tsx
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const supabase = createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    redirect('/login');
  }

  // ✅ Check if user is anonymous
  if (user.is_anonymous) {
    return (
      <div className="container mx-auto p-6">
        <h1>Complete Your Profile</h1>
        <p>Please sign up to access your full profile.</p>
        <a href="/signup" className="btn">Sign Up Now</a>
      </div>
    );
  }

  // Full profile access untuk permanent users
  return (
    <div>
      <h1>Your Profile</h1>
      {/* Profile content */}
    </div>
  );
}
```

### 2.5 Security Notes

**⚠️ Important considerations:**

1. **Always use captcha** untuk anonymous sign-ins:
   - Prevent bot abuse
   - Rate limit spam bookings
   - Protect dari automated attacks

2. **Cleanup stale anonymous users**:
   ```sql
   -- Delete anonymous users inactive > 30 days
   DELETE FROM auth.users
   WHERE is_anonymous = true
     AND last_sign_in_at < now() - interval '30 days';
   ```

3. **Limit anonymous user actions** via RLS:
   - Restrict create/update limits
   - Require email verification untuk sensitive actions
   - Implement rate limiting

---

## 3. Turnstile Captcha Integration

### 3.1 Penjelasan Turnstile

**Cloudflare Turnstile** adalah CAPTCHA alternative yang:
- **Privacy-focused**: Tidak harvest data untuk ads
- **User-friendly**: Sering invisible/one-click
- **Free**: No cost untuk most use cases
- **Fast**: Low latency, global CDN
- **Drop-in replacement** untuk reCAPTCHA

**Comparison:**

| Feature | Turnstile | reCAPTCHA | hCaptcha |
|---------|-----------|-----------|----------|
| Privacy | ✅ High | ❌ Low | ⚠️ Medium |
| Free tier | ✅ Generous | ⚠️ Limited | ✅ Yes |
| UX | ✅ Invisible | ⚠️ Puzzles | ⚠️ Puzzles |
| Cloudflare integration | ✅ Native | ❌ No | ❌ No |

### 3.2 Setup Turnstile

**Step 1: Create Turnstile Site**

1. Login ke Cloudflare Dashboard
2. Navigate to: **Turnstile**
3. Click **Add site**
4. Configure:
   - **Site name**: TI-Sports
   - **Domain**: `ti-sports.com` (atau `localhost` untuk dev)
   - **Widget mode**: 
     - **Managed** (recommended): Shows challenge when needed
     - **Non-interactive**: Always shows checkbox
     - **Invisible**: No widget (best UX)
5. Click **Create**
6. Copy **Site Key** dan **Secret Key**

**Step 2: Add to Environment Variables**

```bash
# .env.local
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-site-key
TURNSTILE_SECRET_KEY=your-secret-key
```

**Step 3: Enable di Supabase**

1. Go to Supabase Dashboard
2. Navigate: **Authentication** → **Settings** → **Bot Protection**
3. Enable **CAPTCHA Protection**
4. Select **Cloudflare Turnstile**
5. Paste **Secret Key**
6. Save

### 3.3 Frontend Implementation

**Install Turnstile React component:**

```bash
npm install @marsidev/react-turnstile
```

**Signup form dengan Turnstile:**

```typescript
// components/auth/signup-form.tsx
'use client';

import { useState, useRef } from 'react';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

const signupSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  full_name: z.string().min(2, 'Name is required'),
});

export function SignupForm() {
  const router = useRouter();
  const captchaRef = useRef<TurnstileInstance>(null);
  
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // ✅ Validate captcha
    if (!captchaToken) {
      setError('Please complete the captcha verification');
      return;
    }

    // ✅ Validate form data
    const validation = signupSchema.safeParse(formData);
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();
      
      // ✅ Sign up dengan captcha token
      const { data, error: signupError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          captchaToken, // ✅ Verified by Supabase
          data: {
            full_name: formData.full_name,
          },
        },
      });

      if (signupError) throw signupError;

      alert('Signup successful! Please check your email for verification.');
      router.push('/login');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err instanceof Error ? err.message : 'Signup failed');
      
      // ✅ Reset captcha on error
      captchaRef.current?.reset();
      setCaptchaToken(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-sm font-medium mb-2">Full Name</label>
        <input
          type="text"
          value={formData.full_name}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          minLength={8}
          required
        />
      </div>

      {/* ✅ Cloudflare Turnstile widget */}
      <Turnstile
        ref={captchaRef}
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onSuccess={(token) => setCaptchaToken(token)}
        onExpire={() => setCaptchaToken(null)}
        onError={() => {
          setError('Captcha verification failed. Please try again.');
          setCaptchaToken(null);
        }}
      />

      {error && (
        <div className="text-red-500 text-sm p-3 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!captchaToken || isSubmitting}
        className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Creating Account...' : 'Sign Up'}
      </button>
    </form>
  );
}
```

### 3.4 Backend Validation (Optional)

Supabase automatically validates captcha token. Tapi untuk custom API routes:

```typescript
// app/api/verify-captcha/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface TurnstileResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Token required' },
        { status: 400 }
      );
    }

    // ✅ Verify dengan Cloudflare
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY!,
          response: token,
        }),
      }
    );

    const data: TurnstileResponse = await response.json();

    if (!data.success) {
      return NextResponse.json(
        { 
          error: 'Captcha verification failed',
          details: data['error-codes'],
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      verified: true,
    });
  } catch (error) {
    console.error('Captcha verification error:', error);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
}
```

---

## 4. RLS (Row Level Security) & Policies

### 4.1 Penjelasan RLS

**Row Level Security** adalah PostgreSQL feature yang:
- Membatasi access ke rows berdasarkan user identity
- Applied automatically pada semua queries
- Enforced di database level (tidak bisa bypass dari client)
- Essential untuk security di Supabase (database exposed ke client)

**Prinsip dasar:**
- **Enable RLS** pada table → default: deny all access
- **Create policies** → define who can do what
- **Test policies** → verify correct access control

### 4.2 Basic RLS Patterns

**Pattern 1: User can only access their own data**

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile"
ON profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
ON profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
```

**Pattern 2: Public read, authenticated write**

```sql
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Anyone can read events (including anon)
CREATE POLICY "Events are publicly readable"
ON events
FOR SELECT
TO anon, authenticated
USING (true);

-- Only authenticated users can create events
CREATE POLICY "Authenticated users can create events"
ON events
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Users can update only their own events
CREATE POLICY "Users can update own events"
ON events
FOR UPDATE
TO authenticated
USING (auth.uid() = created_by)
WITH CHECK (auth.uid() = created_by);
```

**Pattern 3: Admin access**

```sql
-- Assuming profiles table has 'role' column
CREATE POLICY "Admins can access all data"
ON transactions
FOR ALL
TO authenticated
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- More efficient version dengan JWT claims
CREATE POLICY "Admins can access all data"
ON transactions
FOR ALL
TO authenticated
USING (
  (SELECT auth.jwt()->>'user_role') = 'admin'
);
```

### 4.3 TI-Sports RLS Schema

**Profiles table:**

```sql
-- profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  role TEXT DEFAULT 'member' CHECK (role IN ('member', 'admin')),
  points INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- SELECT: Users can view their own profile
CREATE POLICY "Users can view own profile"
ON profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- INSERT: Automatically create profile on signup (via trigger)
CREATE POLICY "Service role can insert profiles"
ON profiles
FOR INSERT
TO service_role
WITH CHECK (true);

-- UPDATE: Users can update their own profile (except role)
CREATE POLICY "Users can update own profile"
ON profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id
  AND (
    NEW.role = OLD.role  -- Cannot change own role
    OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  )
);
```

**Events table:**

```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  venue TEXT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  capacity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'completed')),
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Everyone can view active events"
ON events
FOR SELECT
USING (status = 'active');

-- Authenticated create
CREATE POLICY "Authenticated users can create events"
ON events
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = created_by
  AND status = 'active'
);

-- Owner or admin update
CREATE POLICY "Owner or admin can update events"
ON events
FOR UPDATE
TO authenticated
USING (
  auth.uid() = created_by
  OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
)
WITH CHECK (
  auth.uid() = created_by
  OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Admin delete
CREATE POLICY "Admin can delete events"
ON events
FOR DELETE
TO authenticated
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);
```

**Bookings table:**

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),  -- NULL for anonymous
  participant_count INTEGER NOT NULL CHECK (participant_count > 0),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Users can view their own bookings
CREATE POLICY "Users can view own bookings"
ON bookings
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can create bookings (including anonymous)
CREATE POLICY "Authenticated users can create bookings"
ON bookings
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND status = 'pending'
);

-- Users can update their own bookings
CREATE POLICY "Users can update own bookings"
ON bookings
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id
  AND status IN ('pending', 'cancelled')  -- Can't update confirmed
);

-- Admin can view all bookings
CREATE POLICY "Admin can view all bookings"
ON bookings
FOR SELECT
TO authenticated
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);
```

**Transactions table (payment records):**

```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id),
  user_id UUID REFERENCES profiles(id),
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'settlement', 'failed', 'cancelled')),
  payment_method TEXT,
  order_id TEXT UNIQUE NOT NULL,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Users can view their own transactions
CREATE POLICY "Users can view own transactions"
ON transactions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can create transactions
CREATE POLICY "Users can create transactions"
ON transactions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Service role can update (for webhooks)
CREATE POLICY "Service role can update transactions"
ON transactions
FOR UPDATE
TO service_role
USING (true);

-- Admin can view all
CREATE POLICY "Admin can view all transactions"
ON transactions
FOR SELECT
TO authenticated
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);
```

### 4.4 Anonymous User RLS

**Restrict anonymous users:**

```sql
-- Anonymous users can create bookings but with limits
CREATE POLICY "Anonymous users can create limited bookings"
ON bookings
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND (
    -- Not anonymous, OR
    (SELECT (auth.jwt()->>'is_anonymous')::boolean) = false
    OR
    -- Anonymous but within limits
    (
      (SELECT (auth.jwt()->>'is_anonymous')::boolean) = true
      AND participant_count <= 2  -- Max 2 participants for guests
    )
  )
);

-- Anonymous users can only see recent data
CREATE POLICY "Anonymous users see recent bookings only"
ON bookings
FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id
  AND (
    (SELECT (auth.jwt()->>'is_anonymous')::boolean) = false
    OR
    (
      (SELECT (auth.jwt()->>'is_anonymous')::boolean) = true
      AND created_at >= NOW() - INTERVAL '7 days'
    )
  )
);
```

### 4.5 RLS Performance Tips

**1. Add indexes untuk RLS policies:**

```sql
-- Index on user_id for faster RLS checks
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);

-- Index on auth.uid() column
CREATE INDEX idx_profiles_id ON profiles(id);
```

**2. Use efficient policy conditions:**

```sql
-- ❌ SLOW - Subquery for every row
CREATE POLICY "slow_policy"
ON bookings
FOR SELECT
TO authenticated
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  OR auth.uid() = user_id
);

-- ✅ FAST - Use JWT claims (no subquery)
CREATE POLICY "fast_policy"
ON bookings
FOR SELECT
TO authenticated
USING (
  (SELECT auth.jwt()->>'user_role') = 'admin'
  OR auth.uid() = user_id
);
```

**3. Specify roles dengan TO clause:**

```sql
-- ✅ BETTER - Stop execution early for anon users
CREATE POLICY "fast_authenticated_policy"
ON bookings
FOR SELECT
TO authenticated  -- ✅ Only check for authenticated users
USING (auth.uid() = user_id);
```

---

## 5. Supabase Client Setup di Next.js 16

### 5.1 Install Dependencies

```bash
npm install @supabase/supabase-js @supabase/ssr
```

### 5.2 Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Server-only (NEVER expose to client)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 5.3 Server Client (for Server Components)

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
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // The `remove` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
```

**Usage di Server Component:**

```typescript
// app/bookings/page.tsx
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function BookingsPage() {
  const supabase = createClient();
  
  // ✅ Get authenticated user
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    redirect('/login');
  }

  // ✅ Fetch data dengan RLS
  const { data: bookings } = await supabase
    .from('bookings')
    .select('*, events(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div>
      <h1>Your Bookings</h1>
      {/* Render bookings */}
    </div>
  );
}
```

### 5.4 Browser Client (for Client Components)

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

**Usage di Client Component:**

```typescript
// components/booking-form.tsx
'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export function BookingForm({ eventId }: { eventId: string }) {
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // ✅ Client-side insert dengan RLS
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          event_id: eventId,
          participant_count: 1,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;

      alert('Booking created!');
    } catch (error) {
      console.error(error);
      alert('Booking failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>;
}
```

### 5.5 Service Role Client (for Admin/Webhooks)

```typescript
// utils/supabase/admin.ts
import { createClient } from '@supabase/supabase-js';

// ⚠️ ONLY use in server-side code (API routes, webhooks)
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // ✅ Bypasses RLS
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
```

**Usage di Webhook:**

```typescript
// app/api/webhooks/payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // ✅ Verify webhook signature first
    // ... signature verification

    const supabaseAdmin = createAdminClient();

    // ✅ Update transaction dengan service role (bypass RLS)
    const { error } = await supabaseAdmin
      .from('transactions')
      .update({
        status: body.transaction_status,
        paid_at: new Date().toISOString(),
      })
      .eq('order_id', body.order_id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
```

### 5.6 Middleware untuk Session Refresh

```typescript
// proxy.ts (Next.js 16 renamed from middleware.ts)
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
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
```

---

## 6. Auth Flow: Guest → Member

### 6.1 Anonymous User Creation

```typescript
// components/auth/guest-flow.tsx
'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Turnstile } from '@marsidev/react-turnstile';

export function GuestFlow() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [anonymousUserId, setAnonymousUserId] = useState<string | null>(null);

  const handleGuestSignIn = async () => {
    if (!captchaToken) return;

    try {
      const supabase = createClient();
      
      // ✅ Step 1: Create anonymous user
      const { data, error } = await supabase.auth.signInAnonymously({
        options: { captchaToken },
      });

      if (error) throw error;

      setAnonymousUserId(data.user?.id || null);
      
      // ✅ User can now use app features
      console.log('Guest user ID:', data.user?.id);
      console.log('Is anonymous:', data.user?.is_anonymous); // true
    } catch (error) {
      console.error('Guest sign-in error:', error);
    }
  };

  return (
    <div className="space-y-4">
      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onSuccess={setCaptchaToken}
      />
      
      <button
        onClick={handleGuestSignIn}
        disabled={!captchaToken}
      >
        Continue as Guest
      </button>

      {anonymousUserId && (
        <p className="text-sm text-gray-600">
          Signed in as guest. <a href="/signup">Create account</a> to save your data permanently.
        </p>
      )}
    </div>
  );
}
```

### 6.2 Convert Anonymous → Permanent User

**Option 1: Link Email/Password**

```typescript
// components/auth/convert-to-permanent.tsx
'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export function ConvertToPermanent() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isConverting, setIsConverting] = useState(false);

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsConverting(true);

    try {
      const supabase = createClient();
      
      // ✅ Check current user is anonymous
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user?.is_anonymous) {
        alert('You are already a registered user');
        return;
      }

      // ✅ Update user with email (converts to permanent)
      const { error: updateError } = await supabase.auth.updateUser({
        email,
        password,
      });

      if (updateError) throw updateError;

      alert('Account created! Please verify your email.');
      router.push('/profile');
      router.refresh();
    } catch (error) {
      console.error('Conversion error:', error);
      alert('Failed to create account');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <form onSubmit={handleConvert} className="space-y-4">
      <h2 className="text-2xl font-bold">Create Your Account</h2>
      <p className="text-gray-600">
        Save your bookings permanently by creating an account.
      </p>

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
          minLength={8}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isConverting}
      >
        {isConverting ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );
}
```

**Option 2: Link OAuth Identity**

```typescript
// components/auth/link-google.tsx
'use client';

import { createClient } from '@/utils/supabase/client';

export function LinkGoogleAccount() {
  const handleLinkGoogle = async () => {
    try {
      const supabase = createClient();
      
      // ✅ Check if anonymous
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user?.is_anonymous) {
        alert('Already have an account');
        return;
      }

      // ✅ Link Google identity
      const { error } = await supabase.auth.linkIdentity({
        provider: 'google',
      });

      if (error) throw error;

      // User will be redirected to Google OAuth
      // After success, anonymous user becomes permanent
    } catch (error) {
      console.error('Link Google error:', error);
    }
  };

  return (
    <button
      onClick={handleLinkGoogle}
      className="flex items-center gap-2 px-6 py-3 border rounded-lg"
    >
      <svg /* Google icon */ />
      Link Google Account
    </button>
  );
}
```

**Important notes:**
- User ID **remains the same** after conversion
- All data associated with anonymous user ID is preserved
- `is_anonymous` claim changes from `true` → `false`
- OAuth linking requires **manual linking enabled** di Supabase dashboard

### 6.3 Data Persistence Example

```sql
-- Bookings created as anonymous user persist after conversion
-- Example flow:

-- 1. Anonymous user creates booking
INSERT INTO bookings (event_id, user_id, participant_count)
VALUES ('event-uuid', 'anon-user-uuid', 2);
-- user_id: anon-user-uuid (is_anonymous: true)

-- 2. User converts to permanent (same UUID)
-- via updateUser({ email, password })

-- 3. User ID stays the same
-- SELECT * FROM bookings WHERE user_id = 'anon-user-uuid';
-- Returns previous bookings! ✅

-- 4. is_anonymous claim updated
-- auth.jwt()->>'is_anonymous' = 'false' ✅
```

---

## 7. Best Practices & Checklist

### 7.1 Development Checklist

**Supabase Setup:**
- [ ] Project created di Supabase dashboard
- [ ] Anonymous sign-in enabled
- [ ] Turnstile captcha configured
- [ ] RLS enabled pada semua tables
- [ ] Policies tested untuk each role (anon, member, admin)
- [ ] Service role key saved securely (server-only)
- [ ] Database functions created untuk custom logic

**Next.js Integration:**
- [ ] `@supabase/ssr` installed
- [ ] Server & client Supabase utils created
- [ ] Middleware setup untuk session refresh
- [ ] Environment variables configured
- [ ] Auth flow implemented (login/signup/logout)
- [ ] Anonymous sign-in dengan captcha
- [ ] Convert anonymous → permanent flow

**Security:**
- [ ] Input validation dengan Zod
- [ ] Rate limiting implemented
- [ ] CORS configured properly
- [ ] No sensitive keys di client code
- [ ] Error handling tidak expose internals
- [ ] Captcha required untuk sensitive actions

### 7.2 Production Checklist

**Database:**
- [ ] RLS policies performance tested
- [ ] Indexes created untuk frequent queries
- [ ] Database backups configured
- [ ] Connection pooling configured
- [ ] Realtime subscriptions optimized
- [ ] Anonymous users cleanup scheduled

**Authentication:**
- [ ] Email verification enabled
- [ ] Password policies enforced
- [ ] MFA available untuk admins
- [ ] Session timeout configured
- [ ] OAuth providers configured (if using)
- [ ] Captcha working di production domain

**Monitoring:**
- [ ] Supabase logs monitoring setup
- [ ] Failed auth attempts alerting
- [ ] API rate limit monitoring
- [ ] Database performance monitoring
- [ ] Error tracking (Sentry/etc) configured

### 7.3 Security Best Practices

**DO:**
✅ Always enable RLS pada production tables  
✅ Test RLS policies dengan different user roles  
✅ Use service role ONLY di server-side code  
✅ Validate input dengan schema validators  
✅ Implement rate limiting untuk public endpoints  
✅ Require captcha untuk anonymous actions  
✅ Rotate keys regularly  
✅ Log security events untuk audit  
✅ Use parameterized queries (Supabase automatic)  
✅ Keep dependencies updated  

**DON'T:**
❌ Never expose service role key ke client  
❌ Never trust client-side validation only  
❌ Never skip RLS policies di production  
❌ Never log sensitive data (passwords, tokens)  
❌ Never hardcode secrets di code  
❌ Never allow unlimited anonymous user creation  
❌ Never ignore security warnings dari Supabase  
❌ Never expose internal errors ke users  
❌ Never skip webhook signature verification  
❌ Never use `auth.users` directly untuk queries (use RLS)  

### 7.4 Performance Optimization

**Database:**
```sql
-- Add indexes untuk frequent RLS checks
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_profiles_role ON profiles(role);

-- Use partial indexes untuk specific queries
CREATE INDEX idx_active_events ON events(start_time)
WHERE status = 'active';
```

**Caching:**
```typescript
// app/events/page.tsx
import { createClient } from '@/utils/supabase/server';

export const revalidate = 60; // ✅ Cache for 60 seconds

export default async function EventsPage() {
  const supabase = createClient();
  
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'active')
    .order('start_time', { ascending: true });

  return <div>{/* Render events */}</div>;
}
```

**Realtime Optimization:**
```typescript
// Specify specific columns untuk reduce payload
const channel = supabase
  .channel('public:events')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'events',
      filter: 'status=eq.active', // ✅ Filter di database level
    },
    (payload) => {
      console.log('New event:', payload.new);
    }
  )
  .subscribe();
```

---

## 8. Reference Links (Docs Supabase, Cloudflare Turnstile, Next.js SSR)

### Official Documentation

1. **Supabase Documentation**
   - Main docs: https://supabase.com/docs
   - Auth: https://supabase.com/docs/guides/auth
   - Database: https://supabase.com/docs/guides/database
   - RLS: https://supabase.com/docs/guides/database/postgres/row-level-security

2. **Supabase Anonymous Sign-In**
   - https://supabase.com/docs/guides/auth/auth-anonymous
   - Feature announcement: https://supabase.com/blog/anonymous-sign-ins

3. **Supabase Next.js Integration**
   - SSR guide: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
   - @supabase/ssr docs: https://supabase.com/docs/guides/auth/server-side/nextjs

4. **Supabase RLS Examples**
   - https://supabase.com/docs/guides/database/postgres/row-level-security#rls-examples
   - RLS performance: https://supabase.com/docs/guides/database/postgres/row-level-security#rls-performance-recommendations

5. **Cloudflare Turnstile**
   - Main docs: https://developers.cloudflare.com/turnstile/
   - Getting started: https://developers.cloudflare.com/turnstile/get-started/
   - Migration from reCAPTCHA: https://developers.cloudflare.com/turnstile/migration/

6. **Next.js 16 Documentation**
   - App Router: https://nextjs.org/docs/app
   - Server Components: https://nextjs.org/docs/app/building-your-application/rendering/server-components
   - Middleware: https://nextjs.org/docs/app/building-your-application/routing/middleware

### Community Resources

7. **Supabase GitHub**
   - Main repo: https://github.com/supabase/supabase
   - JS SDK: https://github.com/supabase/supabase-js

8. **Supabase Discord**
   - https://discord.supabase.com
   - Active community untuk troubleshooting

### Tools & Libraries

9. **React Turnstile Component**
   - https://github.com/marsidev/react-turnstile
   - React wrapper untuk Turnstile

10. **Supabase CLI**
    - https://supabase.com/docs/guides/cli
    - Local development tools

---

**Document Version:** 1.0  
**Last Updated:** November 2025  
**Target Stack:** Supabase v2.76+, Next.js 16, React 19  
**Maintained By:** TI-Sports Backend Team