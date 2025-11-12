# TI-Sports Next.js 16 & React 19 Migration Guide

## 1. Project Context

**TI-Sports** adalah project modern sports booking yang menggunakan stack:

- **Framework**: Next.js 16.0.1 (stable, dirilis Oktober 2025)
- **Router**: App Router dengan folder `/app` (bukan Pages Router)
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 3.4.15
- **UI Components**: Radix UI (shadcn style components)
- **Animations**: Framer Motion 12.23.24
- **React**: React 19.2.0
- **Backend**: Supabase (Auth, Database, Storage)
- **Form**: React Hook Form 7.66.0 + Zod 4.1.12
- **Node.js**: 20.9+ (required)

**Fokus dokumentasi:**
- Pattern modern Next.js 16 + React 19 yang production-ready
- Mengatasi deprecation Framer Motion
- Mencegah pattern Next.js 13/14 yang sudah usang
- Best practices untuk App Router architecture

---

## 2. Next.js 16 Overview dan Perbedaan dengan 14/15

### 2.1 Highlight Perubahan

**Turbopack (Stable)**
- Sekarang **default bundler** untuk dev dan production
- 2-5× faster builds dibanding Webpack
- 5-10× faster Fast Refresh/HMR
- File system caching untuk startup lebih cepat
- Opt-out dengan `next dev --webpack` atau `next build --webpack`

**React 19.2 Integration**
- View Transitions API untuk smooth animations
- `useEffectEvent` untuk memisahkan reactive/non-reactive logic
- `<Activity />` component untuk background UI state
- Improved error handling dan suspense

**Cache Components (New Caching Model)**
- Explicit caching dengan `use cache` directive
- Opt-in caching (default: dynamic execution at request time)
- `cacheLife` profiles untuk stale-while-revalidate behavior
- New APIs: `updateTag()`, `refresh()`, `revalidateTag(tag, cacheLife)`

**Enhanced Routing & Navigation**
- **Layout deduplication**: Shared layout di-download sekali, bukan per-page
- **Incremental prefetching**: Hanya prefetch bagian yang belum di-cache
- Prefetch cancellation ketika link keluar viewport
- Prioritize hover/re-entry untuk prefetching

**Improved DX**
- Better build & dev logging dengan breakdown waktu
- Next.js Devtools MCP untuk AI-assisted debugging
- Separate output directories untuk concurrent dev/build
- Lockfile mechanism untuk prevent concurrent instances

**Breaking Changes**
- `middleware.ts` → `proxy.ts` (clarify network boundary)
- `revalidateTag(tag)` → `revalidateTag(tag, 'max')`
- Default `images.minimumCacheTTL` berubah dari 60s → 4 hours
- Node.js 18 tidak support lagi, minimum 20.9+
- Parallel routes harus punya `default.js`

### 2.2 Fitur Deprecated/Tidak Direkomendasikan

**❌ JANGAN GUNAKAN:**

1. **Pages Router patterns**:
   - `pages/` directory
   - `getServerSideProps`
   - `getStaticProps`
   - `getInitialProps`
   - `_app.js`, `_document.js`

2. **Old config di next.config.js**:
   ```javascript
   // ❌ DEPRECATED
   experimental: {
     appDir: true,
     serverActions: true,
     ppr: true
   }
   ```

3. **Old caching patterns**:
   - `experimental.dynamicIO` → gunakan `cacheComponents`
   - Route-level `export const experimental_ppr` → gunakan Cache Components

4. **Middleware di folder terpisah**: Gunakan `proxy.ts` di root

---

## 3. Migration Checklist ke Next.js 16

### 3.1 Pre-Migration

- [ ] Backup project Anda
- [ ] Pastikan Node.js 20.9+ terinstall
- [ ] Update dependencies ke versi compatible
- [ ] Run `npm audit` dan fix vulnerabilities
- [ ] Dokumentasikan custom Webpack config (jika ada)

### 3.2 Automated Migration

**Cara paling aman:**

```bash
npx @next/codemod@canary upgrade latest
```

Codemod ini akan:
- Rename `middleware.ts` → `proxy.ts`
- Update cache API calls
- Fix parallel routes dengan tambahkan `default.js`
- Remove deprecated experimental flags
- Update import paths jika perlu

### 3.3 Manual Steps

**Update package.json:**

```bash
npm install next@latest react@latest react-dom@latest
npm install @types/react@latest @types/react-dom@latest --save-dev
```

**Verify next.config.js:**

```typescript
// next.config.ts (modern style)
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Turbopack sudah default, tidak perlu config
  reactCompiler: true, // Optional: enable React Compiler
  
  // Remove deprecated flags
  // experimental: { appDir: true } ❌ 
  // experimental: { serverActions: true } ❌
};

export default nextConfig;
```

**Update tsconfig.json:**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "dom", "dom.iterable"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 3.4 Audit Project

**Cek folder structure:**

```
✅ app/               (App Router - BENAR)
❌ pages/             (Pages Router - HAPUS atau MIGRATE)
✅ proxy.ts           (New middleware name)
❌ middleware.ts      (Rename ke proxy.ts)
✅ app/api/           (Route handlers)
```

**Cek imports:**

```typescript
// ✅ BENAR - Modern Next.js 16
import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { redirect, notFound } from 'next/navigation';

// ❌ SALAH - Jangan import dari next/server untuk app router pages
// import { NextApiRequest, NextApiResponse } from 'next';
```

---

## 4. Canonical Code Patterns di Next.js 16 + React 19

### 4.1 Server Components

**Pattern yang BENAR:**

```typescript
// app/events/page.tsx - Server Component (DEFAULT)
import { createClient } from '@/utils/supabase/server';
import { EventCard } from '@/components/event-card';

// ✅ ASYNC Server Component - Next.js 16 standard
export default async function EventsPage() {
  // Server-side data fetching
  const supabase = createClient();
  
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching events:', error);
    return <div>Error loading events</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events?.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

// ✅ Metadata export untuk SEO
export const metadata = {
  title: 'Events | TI-Sports',
  description: 'Browse available sports events',
};
```

**Kenapa ini valid:**
- Server Component adalah **default** di App Router
- `async` function langsung supported
- Data fetching di server = faster initial load, SEO-friendly
- Tidak perlu `'use client'` directive
- Automatic code splitting & tree shaking

**Error Handling Pattern:**

```typescript
// app/events/[id]/page.tsx
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function EventDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const supabase = createClient();
  
  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', params.id)
    .single();

  // ✅ Use Next.js navigation functions
  if (error || !event) {
    notFound(); // Shows app/not-found.tsx
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold">{event.title}</h1>
      <p className="text-gray-600">{event.description}</p>
    </div>
  );
}
```

### 4.2 Client Components

**Pattern yang BENAR:**

```typescript
// components/booking-form.tsx - Client Component
'use client'; // ✅ Directive pertama di file

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ Dari next/navigation, bukan next/router
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// ✅ Zod schema untuk validation
const bookingSchema = z.object({
  event_id: z.string().uuid(),
  participant_count: z.number().min(1).max(10),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export function BookingForm({ eventId }: { eventId: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      event_id: eventId,
      participant_count: 1,
    },
  });

  // ✅ Event handler dengan proper async/await
  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    
    try {
      const { data: booking, error } = await supabase
        .from('bookings')
        .insert({
          event_id: data.event_id,
          participant_count: data.participant_count,
          notes: data.notes,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;

      // ✅ Programmatic navigation
      router.push(`/bookings/${booking.id}`);
      router.refresh(); // Refresh server data
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to create booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Number of Participants
        </label>
        <input
          type="number"
          {...register('participant_count', { valueAsNumber: true })}
          className="w-full px-4 py-2 border rounded-lg"
          min="1"
          max="10"
        />
        {errors.participant_count && (
          <p className="text-red-500 text-sm mt-1">
            {errors.participant_count.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Notes (Optional)
        </label>
        <textarea
          {...register('notes')}
          className="w-full px-4 py-2 border rounded-lg"
          rows={3}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating Booking...' : 'Book Now'}
      </Button>
    </form>
  );
}
```

**Kenapa ini valid untuk React 19:**
- `'use client'` directive clearly marks client-side code
- Hooks (`useState`, `useForm`) hanya di client components
- Event handlers untuk user interactions
- Browser APIs (localStorage, window) hanya accessible di client
- React 19 improved error boundaries work with this pattern

### 4.3 Route Handlers (API Routes)

**Pattern yang BENAR:**

```typescript
// app/api/bookings/route.ts - GET handler
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// ✅ Named export untuk HTTP methods
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // ✅ Get user session
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // ✅ Query with RLS protection
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*, events(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // ✅ Return JSON response
    return NextResponse.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error('GET /api/bookings error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

```typescript
// app/api/bookings/route.ts - POST handler
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // ✅ Parse request body
    const body = await request.json();
    
    // ✅ Validate with Zod
    const bookingSchema = z.object({
      event_id: z.string().uuid(),
      participant_count: z.number().min(1).max(10),
      notes: z.string().optional(),
    });
    
    const validatedData = bookingSchema.parse(body);

    // ✅ Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // ✅ Insert with validated data
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

    return NextResponse.json({
      success: true,
      data: booking,
    }, { status: 201 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('POST /api/bookings error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**Webhook Handler Example:**

```typescript
// app/api/webhooks/payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// ✅ Use service role for webhook (bypass RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // ⚠️ Server-side only
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-signature');
    
    // ✅ Verify webhook signature
    const isValid = verifySignature(body, signature);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const payload = JSON.parse(body);
    
    // ✅ Update payment status dengan service role
    const { error } = await supabaseAdmin
      .from('transactions')
      .update({
        status: payload.transaction_status,
        paid_at: payload.transaction_status === 'settlement' ? new Date().toISOString() : null,
      })
      .eq('order_id', payload.order_id);

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

function verifySignature(body: string, signature: string | null): boolean {
  if (!signature) return false;
  
  const serverKey = process.env.PAYMENT_SERVER_KEY!;
  const hash = crypto
    .createHmac('sha512', serverKey)
    .update(body)
    .digest('hex');
  
  return hash === signature;
}
```

**Perubahan dari Next.js 14:**
- `NextRequest` & `NextResponse` dari `next/server` (standard Web API)
- Tidak ada `req.query`, gunakan `request.nextUrl.searchParams`
- Tidak ada `req.body`, gunakan `await request.json()` atau `request.text()`
- Route handlers support streaming responses

### 4.4 Server Actions

**Pattern yang BENAR:**

```typescript
// app/actions/booking-actions.ts
'use server'; // ✅ Directive untuk Server Actions

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { z } from 'zod';

// ✅ Input validation schema
const bookingSchema = z.object({
  event_id: z.string().uuid(),
  participant_count: z.number().min(1).max(10),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

// ✅ Server Action dengan proper error handling
export async function createBooking(formData: BookingFormData) {
  try {
    // Validate input
    const validatedData = bookingSchema.parse(formData);
    
    const supabase = createClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return {
        success: false,
        error: 'You must be logged in to create a booking',
      };
    }

    // Insert booking
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

    // ✅ Revalidate relevant paths
    revalidatePath('/bookings');
    revalidatePath(`/events/${validatedData.event_id}`);

    return {
      success: true,
      data: booking,
    };
  } catch (error) {
    console.error('Create booking error:', error);
    
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

// ✅ Server Action dengan redirect
export async function deleteBooking(bookingId: string) {
  const supabase = createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return { success: false, error: 'Unauthorized' };
  }

  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId)
    .eq('user_id', user.id); // RLS check

  if (error) {
    return { success: false, error: 'Failed to delete booking' };
  }

  revalidatePath('/bookings');
  redirect('/bookings'); // ✅ Redirect after action
}
```

**Client Component yang memanggil Server Action:**

```typescript
// components/booking-form-with-action.tsx
'use client';

import { useFormState } from 'react-dom'; // ✅ React 19 hook
import { useFormStatus } from 'react-dom'; // ✅ React 19 hook
import { createBooking } from '@/app/actions/booking-actions';
import { Button } from '@/components/ui/button';

function SubmitButton() {
  const { pending } = useFormStatus(); // ✅ Hook dari react-dom
  
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Creating Booking...' : 'Book Now'}
    </Button>
  );
}

export function BookingFormWithAction({ eventId }: { eventId: string }) {
  const [state, formAction] = useFormState(createBooking, {
    success: false,
    error: null,
  });

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="event_id" value={eventId} />
      
      <div>
        <label className="block text-sm font-medium mb-2">
          Number of Participants
        </label>
        <input
          type="number"
          name="participant_count"
          className="w-full px-4 py-2 border rounded-lg"
          min="1"
          max="10"
          defaultValue={1}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Notes (Optional)
        </label>
        <textarea
          name="notes"
          className="w-full px-4 py-2 border rounded-lg"
          rows={3}
        />
      </div>

      {state.error && (
        <div className="text-red-500 text-sm">{state.error}</div>
      )}

      {state.success && (
        <div className="text-green-500 text-sm">Booking created successfully!</div>
      )}

      <SubmitButton />
    </form>
  );
}
```

**Kenapa pattern ini benar:**
- `'use server'` directive wajib di file server actions
- Server Actions run di server, bisa access database langsung
- Automatic serialization/deserialization
- Progressive enhancement: form works without JS
- `useFormState` & `useFormStatus` adalah React 19 APIs
- `revalidatePath` untuk cache invalidation
- Proper error handling dengan return values

---

## 5. React 19 Gotchas

### 5.1 React 19.2 Features di Next.js 16

**View Transitions:**

```typescript
'use client';

import { startTransition } from 'react';
import { useRouter } from 'next/navigation';

export function NavigateWithTransition() {
  const router = useRouter();

  const handleNavigate = () => {
    // ✅ Wrap navigation dalam startTransition
    startTransition(() => {
      router.push('/events');
    });
  };

  return (
    <button onClick={handleNavigate}>
      Go to Events
    </button>
  );
}
```

**useEffectEvent (Experimental):**

```typescript
'use client';

import { useState, useEffect, experimental_useEffectEvent as useEffectEvent } from 'react';

export function ChatRoom({ roomId }: { roomId: string }) {
  const [message, setMessage] = useState('');

  // ✅ Extract non-reactive logic
  const onMessage = useEffectEvent((msg: string) => {
    console.log('Message received in room:', roomId, msg);
  });

  useEffect(() => {
    const connection = createConnection(roomId);
    connection.on('message', onMessage);
    connection.connect();
    
    return () => connection.disconnect();
  }, [roomId]); // ✅ Only roomId in dependencies

  return <div>Chat Room {roomId}</div>;
}
```

### 5.2 Breaking Changes dari React 18

**Removed:**
- `React.FC` type (gunakan explicit types)
- Implicit children props (must be explicit)

**Before (React 18):**
```typescript
// ❌ Tidak direkomendasikan di React 19
import { FC } from 'react';

const Button: FC = ({ children }) => {
  return <button>{children}</button>;
};
```

**After (React 19):**
```typescript
// ✅ Explicit props type
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
```

**Suspense Improvements:**

```typescript
// app/events/page.tsx
import { Suspense } from 'react';
import { EventList } from '@/components/event-list';
import { EventListSkeleton } from '@/components/event-list-skeleton';

export default function EventsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      
      {/* ✅ Suspense for streaming server components */}
      <Suspense fallback={<EventListSkeleton />}>
        <EventList />
      </Suspense>
    </div>
  );
}
```

---

## 6. Framer Motion 12.23.x dan Deprecation motion()

### 6.1 Penjelasan Warning

**Warning yang muncul:**
```
motion() is deprecated. Use motion.create() instead.
```

**Kenapa muncul:**
- Framer Motion 12.x sedang transisi ke API baru
- `motion()` HOC untuk custom components deprecated
- Tapi `motion.div`, `motion.button`, dll. masih valid

### 6.2 Pattern Lama (Deprecated)

```typescript
// ❌ DEPRECATED - Jangan gunakan
import { motion } from 'framer-motion';

const CustomComponent = ({ children }) => {
  return <div className="custom">{children}</div>;
};

// ❌ motion() HOC deprecated
const AnimatedCustom = motion(CustomComponent);

export function Example() {
  return (
    <AnimatedCustom
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Content
    </AnimatedCustom>
  );
}
```

### 6.3 Pattern Baru (Correct)

**Option 1: Gunakan motion.div langsung (Recommended)**

```typescript
// ✅ BENAR - Gunakan motion.div/button/etc langsung
'use client'; // ✅ Required untuk animations

import { motion } from 'framer-motion';

export function AnimatedCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="rounded-lg border p-6 bg-white shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}
```

**Option 2: Wrap dengan motion.div**

```typescript
// ✅ BENAR - Wrap custom component
'use client';

import { motion } from 'framer-motion';

interface CustomCardProps {
  title: string;
  description: string;
}

function CustomCard({ title, description }: CustomCardProps) {
  return (
    <div className="custom-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export function AnimatedCustomCard(props: CustomCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <CustomCard {...props} />
    </motion.div>
  );
}
```

**Option 3: forwardRef untuk advanced cases**

```typescript
// ✅ BENAR - Dengan forwardRef
'use client';

import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary';
}

// ✅ forwardRef + motion
export const AnimatedButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={`px-6 py-3 rounded-lg ${
          variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';
```

### 6.4 Contoh Animasi di Next.js 16 Client Component

**Fade In on Scroll:**

```typescript
// components/fade-in-section.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function FadeInSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}
```

**List Animation with Stagger:**

```typescript
// components/event-list-animated.tsx
'use client';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export function EventListAnimated({ events }: { events: any[] }) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {events.map((event) => (
        <motion.div
          key={event.id}
          className="border rounded-lg p-6 bg-white"
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          layout
        >
          <h3 className="text-xl font-bold">{event.title}</h3>
          <p className="text-gray-600">{event.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
```

**Modal with AnimatePresence:**

```typescript
// components/booking-modal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function BookingModal({ isOpen, onClose, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

---

## 7. Tailwind CSS 3.4.15 + Next.js 16 App Router

### 7.1 Setup Minimal

**tailwind.config.js:**

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // ... shadcn/ui color system
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

**postcss.config.js:**

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 7.2 Import Global Styles

**app/globals.css:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... dark mode variables */
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

**app/layout.tsx:**

```typescript
import './globals.css'; // ✅ Import di root layout
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

### 7.3 Common Mistakes

**❌ SALAH:**

```typescript
// Jangan import Tailwind di component individual
import 'tailwindcss/tailwind.css'; // ❌ Salah
```

```javascript
// Jangan gunakan path relatif yang salah
// tailwind.config.js
content: [
  '../app/**/*.tsx', // ❌ Path salah
]
```

**✅ BENAR:**

- Import `globals.css` **hanya sekali** di root layout
- Gunakan path yang benar di `content` config
- Pastikan `postcss.config.js` ada di root project

---

## 8. Common Pitfalls dan Cara Mengatasinya

### 8.1 Hydration Mismatch

**Problem:**
```
Error: Hydration failed because the server rendered HTML didn't match the client.
```

**Penyebab:**
- Server render berbeda dengan client render
- Menggunakan `window` atau `localStorage` di Server Component
- Random values atau timestamps yang berbeda

**Solusi:**

```typescript
// ❌ SALAH
export default function Page() {
  const randomId = Math.random(); // ❌ Berbeda di server & client
  return <div id={randomId}>Content</div>;
}

// ✅ BENAR
'use client';

import { useState, useEffect } from 'react';

export default function Page() {
  const [randomId, setRandomId] = useState<number | null>(null);
  
  useEffect(() => {
    setRandomId(Math.random()); // ✅ Hanya di client
  }, []);

  if (randomId === null) return <div>Loading...</div>;
  
  return <div id={String(randomId)}>Content</div>;
}
```

### 8.2 "Cookies can only be modified in Server Actions"

**Problem:**
```
Error: Cookies can only be modified in a Server Action or Route Handler
```

**Solusi:**

```typescript
// ❌ SALAH - Di Server Component
export default async function Page() {
  const cookieStore = cookies();
  cookieStore.set('theme', 'dark'); // ❌ Error
}

// ✅ BENAR - Di Server Action
'use server';

import { cookies } from 'next/headers';

export async function setTheme(theme: string) {
  cookies().set('theme', theme); // ✅ OK
}

// ✅ BENAR - Di Route Handler
export async function POST(request: Request) {
  const { theme } = await request.json();
  cookies().set('theme', theme); // ✅ OK
  return Response.json({ success: true });
}
```

### 8.3 Async Client Component

**Problem:**
```
Error: async/await is not supported in Client Components
```

**Solusi:**

```typescript
// ❌ SALAH
'use client';

export default async function ClientPage() { // ❌ Client components tidak bisa async
  const data = await fetchData();
  return <div>{data}</div>;
}

// ✅ BENAR - Option 1: Server Component
export default async function ServerPage() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// ✅ BENAR - Option 2: useEffect di Client Component
'use client';

import { useState, useEffect } from 'react';

export default function ClientPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;
  return <div>{data}</div>;
}
```

### 8.4 Supabase Client di Server vs Client

**Problem:**
```
Error: Cannot read properties of undefined (reading 'supabaseUrl')
```

**Solusi:**

```typescript
// ❌ SALAH - Gunakan client version di Server Component
'use server';
import { createClient } from '@/utils/supabase/client'; // ❌ Salah

// ✅ BENAR
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
      },
    }
  );
}

// utils/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

---

## 9. Reference Links

### Official Documentation

1. **Next.js 16 Official Release**
   - https://nextjs.org/blog/next-16
   - Changelog lengkap, migration guide, dan breaking changes

2. **Next.js App Router Documentation**
   - https://nextjs.org/docs/app
   - Complete guide untuk App Router patterns

3. **React 19 Documentation**
   - https://react.dev/
   - New features: View Transitions, useEffectEvent, Activity component

4. **Framer Motion Documentation**
   - https://motion.dev/docs/react-quick-start
   - Official docs untuk Motion (formerly Framer Motion)

5. **Tailwind CSS v3.4**
   - https://tailwindcss.com/docs
   - Installation guide dan configuration

6. **Supabase Next.js Integration**
   - https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
   - SSR setup dengan Next.js 16

### Important Articles

7. **Next.js 16 Upgrade Guide**
   - https://nextjs.org/docs/app/building-your-application/upgrading/version-16
   - Step-by-step upgrade instructions

8. **Turbopack Stable Announcement**
   - https://nextjs.org/blog/turbopack-for-development-stable
   - Performance improvements dan migration

9. **React Server Components Explained**
   - https://nextjs.org/docs/app/building-your-application/rendering/server-components
   - When to use Server vs Client Components

### Tools & Resources

10. **Next.js Codemods**
    - `npx @next/codemod@canary upgrade latest`
    - Automated migration tools

11. **Supabase CLI**
    - https://supabase.com/docs/guides/cli
    - Local development dengan Supabase

---

## Appendix: Full Example Structure

**Recommended Project Structure:**

```
ti-sports/
├── app/
│   ├── (auth)/                 # Route group
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── bookings/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── events/
│   │       ├── [id]/
│   │       │   └── page.tsx
│   │       └── page.tsx
│   ├── api/
│   │   ├── bookings/
│   │   │   └── route.ts
│   │   └── webhooks/
│   │       └── payment/
│   │           └── route.ts
│   ├── actions/                # Server Actions
│   │   ├── booking-actions.ts
│   │   └── auth-actions.ts
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── globals.css
│   └── not-found.tsx
├── components/
│   ├── ui/                     # shadcn components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── dialog.tsx
│   ├── booking-form.tsx
│   ├── event-card.tsx
│   └── navbar.tsx
├── lib/
│   └── utils.ts
├── utils/
│   └── supabase/
│       ├── client.ts           # Browser client
│       ├── server.ts           # Server client
│       └── middleware.ts       # Middleware helper
├── proxy.ts                    # Middleware (renamed from middleware.ts)
├── next.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── package.json
```

---

**Document Version:** 1.0  
**Last Updated:** November 2025  
**Target Stack:** Next.js 16.0.1, React 19.2, Supabase, Tailwind CSS 3.4.15