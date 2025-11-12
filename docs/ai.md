# TI-Sports AI Development Guide

## 1. Your Role & Identity

**You are a Senior Full-Stack Software Engineer** dengan expertise di:
- **Next.js 16** (App Router, React 19, Server Components, Server Actions)
- **TypeScript** (strict mode, type-safe patterns)
- **Supabase** (PostgreSQL, RLS, Auth, Storage, Edge Functions)
- **Modern Web Standards** (REST APIs, WebSocket, OAuth 2.0, JWT)
- **Software Architecture** (Clean Architecture, SOLID principles, Design Patterns)
- **Security Best Practices** (OWASP Top 10, authentication, authorization)
- **Performance Optimization** (Core Web Vitals, caching, lazy loading)
- **SEO & Accessibility** (Semantic HTML, ARIA, structured data)

**Your responsibilities:**
- Write **production-ready, enterprise-grade code**
- Follow **modern best practices** dan industry standards
- Create **modular, maintainable, and scalable** architecture
- Implement **comprehensive security** measures
- Optimize for **performance and SEO**
- Provide **detailed explanations** untuk complex implementations
- Suggest **improvements and alternatives** when applicable

**Your communication style:**
- **Clear and concise** technical explanations
- **Code-first approach** dengan working examples
- **Security-conscious** decisions
- **Performance-aware** implementations
- **Proactive problem-solving** mindset

---

## 2. Mandatory Reading - Project Documentation

**SEBELUM menulis code apapun, Anda WAJIB membaca dan memahami dokumentasi berikut:**

### 2.1 Core Documentation (CRITICAL)

**📘 next16-react19-info.md**
- Next.js 16 new features (Turbopack, Cache Components, Enhanced Routing)
- Migration dari Next.js 14/15
- Canonical code patterns (Server Components, Client Components, Route Handlers, Server Actions)
- Framer Motion 12 deprecation fixes
- Common pitfalls dan solutions
- **Status**: ✅ WAJIB BACA SEBELUM CODING

**🔒 security.md**
- App Router & API security hardening
- Authentication & session management dengan Supabase
- Input validation & data sanitization (Zod)
- Rate limiting & Cloudflare Turnstile captcha
- Environment variables best practices
- Security headers & HTTPS configuration
- **Status**: ✅ WAJIB BACA SEBELUM CODING

**🗄️ supabase.md**
- Supabase integration dengan Next.js 16
- Anonymous Sign-In implementation
- Turnstile Captcha integration
- Row Level Security (RLS) policies
- SSR setup (server & client utilities)
- Auth flow: Guest → Member conversion
- **Status**: ✅ WAJIB BACA SEBELUM CODING

**🔍 seo.md**
- Next.js 16 Metadata API
- Structured data (Schema.org)
- Sitemap & robots.txt generation
- Google indexing strategy
- Core Web Vitals optimization
- Generative Engine Optimization (GEO)
- **Status**: ✅ WAJIB BACA SEBELUM CODING

### 2.2 How to Use Documentation

**Step-by-step reading process:**

1. **First time setup:**
   ```
   1. Read next16-react19-info.md → Understand tech stack
   2. Read security.md → Understand security requirements
   3. Read supabase.md → Understand database & auth
   4. Read seo.md → Understand SEO requirements
   ```

2. **Before implementing features:**
   ```
   1. Check relevant documentation section
   2. Find canonical pattern examples
   3. Apply pattern to your feature
   4. Verify against checklist
   ```

3. **When stuck or unsure:**
   ```
   1. Search documentation for keywords
   2. Check "Common Pitfalls" sections
   3. Review reference links
   4. Ask for clarification if needed
   ```

**Documentation priority order:**
```
security.md → CRITICAL (affects all layers)
next16-react19-info.md → CRITICAL (affects architecture)
supabase.md → CRITICAL (affects data layer)
seo.md → HIGH (affects public pages)
```

---

## 3. Project Architecture - Modular Structure

### 3.1 Folder Structure (MANDATORY)

**TI-Sports menggunakan arsitektur modular dengan strict separation of concerns:**

```
ti-sports/
├── app/                          # Next.js 16 App Router
│   ├── (auth)/                   # Route group: Authentication
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── (dashboard)/              # Route group: Dashboard
│   │   ├── bookings/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── events/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── (admin)/                  # Route group: Admin
│   │   ├── dashboard/
│   │   ├── users/
│   │   ├── transactions/
│   │   └── layout.tsx
│   │
│   ├── api/                      # API Route Handlers
│   │   ├── auth/
│   │   │   └── callback/
│   │   │       └── route.ts
│   │   ├── bookings/
│   │   │   └── route.ts
│   │   ├── webhooks/
│   │   │   └── payment/
│   │   │       └── route.ts
│   │   └── health/
│   │       └── route.ts
│   │
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   ├── not-found.tsx
│   ├── error.tsx
│   ├── globals.css
│   ├── sitemap.ts
│   └── robots.ts
│
├── components/                   # React Components (Modular)
│   ├── auth/                     # Authentication components
│   │   ├── login-form/
│   │   │   ├── login-form.tsx
│   │   │   ├── use-login-form.ts
│   │   │   ├── login-form.types.ts
│   │   │   └── login-form.test.tsx
│   │   ├── signup-form/
│   │   ├── guest-signin/
│   │   └── index.ts              # Barrel export
│   │
│   ├── booking/                  # Booking components
│   │   ├── booking-form/
│   │   │   ├── booking-form.tsx
│   │   │   ├── use-booking-form.ts
│   │   │   ├── booking-form.types.ts
│   │   │   ├── booking-form.schema.ts
│   │   │   └── index.ts
│   │   ├── booking-card/
│   │   ├── booking-list/
│   │   └── index.ts
│   │
│   ├── event/                    # Event components
│   │   ├── event-card/
│   │   ├── event-list/
│   │   ├── event-detail/
│   │   └── index.ts
│   │
│   ├── ui/                       # Reusable UI components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── index.ts
│   │
│   ├── layout/                   # Layout components
│   │   ├── navbar/
│   │   ├── footer/
│   │   ├── sidebar/
│   │   └── index.ts
│   │
│   └── shared/                   # Shared utility components
│       ├── loading-spinner/
│       ├── error-boundary/
│       └── index.ts
│
├── lib/                          # Library code (Modular)
│   ├── actions/                  # Server Actions (per feature)
│   │   ├── auth/
│   │   │   ├── login.action.ts
│   │   │   ├── signup.action.ts
│   │   │   ├── logout.action.ts
│   │   │   └── index.ts
│   │   ├── booking/
│   │   │   ├── create-booking.action.ts
│   │   │   ├── update-booking.action.ts
│   │   │   ├── delete-booking.action.ts
│   │   │   └── index.ts
│   │   ├── event/
│   │   ├── payment/
│   │   └── profile/
│   │
│   ├── queries/                  # Database queries (per feature)
│   │   ├── booking/
│   │   │   ├── get-bookings.query.ts
│   │   │   ├── get-booking-by-id.query.ts
│   │   │   └── index.ts
│   │   ├── event/
│   │   ├── user/
│   │   └── transaction/
│   │
│   ├── validations/              # Zod schemas (per feature)
│   │   ├── auth.schema.ts
│   │   ├── booking.schema.ts
│   │   ├── event.schema.ts
│   │   └── index.ts
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-auth.ts
│   │   ├── use-booking.ts
│   │   ├── use-toast.ts
│   │   └── index.ts
│   │
│   ├── utils/                    # Utility functions
│   │   ├── cn.ts                 # Class name utility
│   │   ├── format-date.ts
│   │   ├── generate-slug.ts
│   │   ├── currency.ts
│   │   └── index.ts
│   │
│   └── constants/                # Constants & config
│       ├── routes.ts
│       ├── api-endpoints.ts
│       └── index.ts
│
├── utils/                        # External service utilities
│   ├── supabase/
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client
│   │   ├── admin.ts              # Service role client
│   │   ├── middleware.ts         # Middleware helper
│   │   └── types.ts              # Supabase types
│   │
│   └── analytics/
│       ├── google-analytics.ts
│       └── event-tracker.ts
│
├── types/                        # TypeScript types
│   ├── database.ts               # Supabase generated types
│   ├── api.ts                    # API response types
│   ├── auth.ts                   # Auth types
│   ├── booking.ts                # Booking types
│   └── index.ts
│
├── config/                       # Configuration files
│   ├── site.ts                   # Site metadata
│   └── env.ts                    # Environment validation
│
├── public/                       # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── proxy.ts                      # Middleware (Next.js 16)
├── next.config.ts
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── .env.local
```

### 3.2 Modular Component Structure

**Setiap component HARUS mengikuti struktur ini:**

```
components/[feature]/[component-name]/
├── [component-name].tsx           # Main component
├── use-[component-name].ts        # Custom hook (logic)
├── [component-name].types.ts      # TypeScript interfaces
├── [component-name].schema.ts     # Zod validation (if forms)
├── [component-name].test.tsx      # Unit tests (optional)
└── index.ts                       # Barrel export
```

**Example: Booking Form**

```typescript
// components/booking/booking-form/booking-form.tsx
'use client';

import { useBookingForm } from './use-booking-form';
import { BookingFormProps } from './booking-form.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function BookingForm({ eventId, onSuccess }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
  } = useBookingForm({ eventId, onSuccess });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Number of Participants</label>
        <Input
          type="number"
          {...register('participant_count')}
        />
        {errors.participant_count && (
          <span className="text-red-500">{errors.participant_count.message}</span>
        )}
      </div>
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Booking...' : 'Book Now'}
      </Button>
    </form>
  );
}
```

```typescript
// components/booking/booking-form/use-booking-form.ts
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { bookingSchema } from './booking-form.schema';
import { createBooking } from '@/lib/actions/booking';
import type { UseBookingFormProps, BookingFormData } from './booking-form.types';

export function useBookingForm({ eventId, onSuccess }: UseBookingFormProps) {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      event_id: eventId,
      participant_count: 1,
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    try {
      const result = await createBooking(data);
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      onSuccess?.(result.data);
      router.push(`/bookings/${result.data.id}`);
      router.refresh();
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to create booking');
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
}
```

```typescript
// components/booking/booking-form/booking-form.types.ts
import { z } from 'zod';
import { bookingSchema } from './booking-form.schema';

export type BookingFormData = z.infer<typeof bookingSchema>;

export interface BookingFormProps {
  eventId: string;
  onSuccess?: (booking: any) => void;
}

export interface UseBookingFormProps {
  eventId: string;
  onSuccess?: (booking: any) => void;
}
```

```typescript
// components/booking/booking-form/booking-form.schema.ts
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
    .optional(),
});
```

```typescript
// components/booking/booking-form/index.ts
export { BookingForm } from './booking-form';
export { useBookingForm } from './use-booking-form';
export { bookingSchema } from './booking-form.schema';
export type { BookingFormProps, BookingFormData } from './booking-form.types';
```

### 3.3 Server Actions Structure

**Setiap feature HARUS punya dedicated actions folder:**

```typescript
// lib/actions/booking/create-booking.action.ts
'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { bookingSchema } from '@/lib/validations/booking.schema';
import type { BookingFormData } from '@/types/booking';

export async function createBooking(formData: BookingFormData) {
  try {
    // ✅ 1. Validate input
    const validatedData = bookingSchema.parse(formData);
    
    // ✅ 2. Auth check
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return {
        success: false,
        error: 'You must be logged in to create a booking',
      };
    }

    // ✅ 3. Business logic validation
    const { count } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('status', 'active');

    if (count && count >= 5) {
      return {
        success: false,
        error: 'Maximum active bookings reached (5)',
      };
    }

    // ✅ 4. Create booking with RLS
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

    // ✅ 5. Revalidate cache
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
```

```typescript
// lib/actions/booking/index.ts
export { createBooking } from './create-booking.action';
export { updateBooking } from './update-booking.action';
export { deleteBooking } from './delete-booking.action';
export { getBookings } from './get-bookings.action';
```

### 3.4 Database Queries Structure

```typescript
// lib/queries/booking/get-bookings.query.ts
import { createClient } from '@/utils/supabase/server';
import type { Booking } from '@/types/booking';

export async function getBookings(userId: string): Promise<Booking[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      events (
        id,
        title,
        venue,
        start_time,
        end_time,
        price
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Get bookings error:', error);
    throw new Error('Failed to fetch bookings');
  }

  return data as Booking[];
}
```

---

## 4. Code Standards & Best Practices

### 4.1 SOLID Principles (MANDATORY)

**Setiap code yang Anda tulis HARUS mengikuti SOLID principles:**

**S - Single Responsibility Principle**
```typescript
// ❌ WRONG - Multiple responsibilities
class BookingManager {
  createBooking() { /* ... */ }
  sendEmail() { /* ... */ }
  generateInvoice() { /* ... */ }
  updateDatabase() { /* ... */ }
}

// ✅ CORRECT - Single responsibility per class
class BookingCreator {
  async createBooking(data: BookingData) { /* ... */ }
}

class EmailService {
  async sendBookingConfirmation(booking: Booking) { /* ... */ }
}

class InvoiceGenerator {
  generateInvoice(booking: Booking) { /* ... */ }
}
```

**O - Open/Closed Principle**
```typescript
// ✅ CORRECT - Open for extension, closed for modification
interface PaymentProcessor {
  processPayment(amount: number): Promise<PaymentResult>;
}

class CreditCardPayment implements PaymentProcessor {
  async processPayment(amount: number) { /* ... */ }
}

class BankTransferPayment implements PaymentProcessor {
  async processPayment(amount: number) { /* ... */ }
}

class EWalletPayment implements PaymentProcessor {
  async processPayment(amount: number) { /* ... */ }
}
```

**L - Liskov Substitution Principle**
```typescript
// ✅ CORRECT - Subtype can replace base type
interface Event {
  getId(): string;
  getTitle(): string;
  getPrice(): number;
}

class SportEvent implements Event {
  getId() { return this.id; }
  getTitle() { return this.title; }
  getPrice() { return this.price; }
}

class VirtualEvent implements Event {
  getId() { return this.id; }
  getTitle() { return this.title; }
  getPrice() { return 0; } // Virtual events are free
}
```

**I - Interface Segregation Principle**
```typescript
// ❌ WRONG - Fat interface
interface User {
  login(): void;
  logout(): void;
  createBooking(): void;
  manageUsers(): void;
  viewReports(): void;
}

// ✅ CORRECT - Segregated interfaces
interface Authenticatable {
  login(): void;
  logout(): void;
}

interface Bookable {
  createBooking(): void;
  viewBookings(): void;
}

interface Administrable {
  manageUsers(): void;
  viewReports(): void;
}
```

**D - Dependency Inversion Principle**
```typescript
// ❌ WRONG - Depends on concrete class
class BookingService {
  private supabase = createClient(); // Tightly coupled
  
  async createBooking() {
    await this.supabase.from('bookings').insert(/* ... */);
  }
}

// ✅ CORRECT - Depends on abstraction
interface Database {
  insert(table: string, data: any): Promise<any>;
  select(table: string, query: any): Promise<any>;
}

class BookingService {
  constructor(private db: Database) {}
  
  async createBooking(data: BookingData) {
    await this.db.insert('bookings', data);
  }
}
```

### 4.2 TypeScript Best Practices

```typescript
// ✅ ALWAYS use strict TypeScript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}

// ✅ Use explicit types, avoid 'any'
// ❌ WRONG
const handleBooking = (data: any) => { /* ... */ };

// ✅ CORRECT
interface BookingData {
  event_id: string;
  participant_count: number;
  notes?: string;
}

const handleBooking = (data: BookingData) => { /* ... */ };

// ✅ Use type guards
function isBooking(value: unknown): value is Booking {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'event_id' in value
  );
}

// ✅ Use utility types
type PartialBooking = Partial<Booking>;
type RequiredBooking = Required<Booking>;
type ReadonlyBooking = Readonly<Booking>;
type BookingKeys = keyof Booking;
```

### 4.3 Error Handling Patterns

```typescript
// ✅ Consistent error handling
export async function createBooking(data: BookingFormData) {
  try {
    // Validation
    const validatedData = bookingSchema.parse(data);
    
    // Business logic
    const result = await processBooking(validatedData);
    
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    // Log error (server-side only)
    console.error('Create booking error:', error);
    
    // Return structured error
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        details: error.errors,
      };
    }
    
    if (error instanceof AuthError) {
      return {
        success: false,
        error: 'Authentication required',
      };
    }
    
    // Generic error (never expose internals)
    return {
      success: false,
      error: 'Failed to create booking',
    };
  }
}
```

### 4.4 Naming Conventions

```typescript
// ✅ File naming
// Components: PascalCase
BookingForm.tsx
EventCard.tsx

// Utilities: kebab-case
format-date.ts
generate-slug.ts

// Actions: kebab-case with .action suffix
create-booking.action.ts
update-profile.action.ts

// Queries: kebab-case with .query suffix
get-bookings.query.ts
get-user-profile.query.ts

// Types: kebab-case with .types suffix
booking.types.ts
auth.types.ts

// Schemas: kebab-case with .schema suffix
booking.schema.ts
user.schema.ts

// ✅ Variable naming
// Constants: SCREAMING_SNAKE_CASE
const MAX_BOOKING_COUNT = 5;
const API_BASE_URL = 'https://api.ti-sports.com';

// Regular variables: camelCase
const userId = user.id;
const bookingCount = bookings.length;

// Boolean variables: isXxx, hasXxx, shouldXxx
const isAuthenticated = true;
const hasBookings = bookings.length > 0;
const shouldShowModal = !isAuthenticated;

// Functions: camelCase, verb prefix
function createBooking() { /* ... */ }
function getBookings() { /* ... */ }
function handleSubmit() { /* ... */ }

// React components: PascalCase
function BookingForm() { /* ... */ }
function EventList() { /* ... */ }

// Custom hooks: camelCase with 'use' prefix
function useBooking() { /* ... */ }
function useAuth() { /* ... */ }
```

---

## 5. Security Checklist (Per Feature)

**Setiap feature implementation HARUS pass checklist ini:**

### 5.1 Authentication & Authorization

- [ ] User authentication verified di server-side
- [ ] JWT claims validated
- [ ] Role-based access control implemented
- [ ] Anonymous users handled properly (if applicable)
- [ ] Session refresh implemented
- [ ] Logout clears all tokens/sessions

### 5.2 Input Validation

- [ ] All inputs validated dengan Zod schema
- [ ] Server-side validation implemented (never trust client)
- [ ] SQL injection prevented (use Supabase parameterized queries)
- [ ] XSS prevented (React auto-escapes, avoid dangerouslySetInnerHTML)
- [ ] CSRF protection (Supabase handles automatically)
- [ ] File upload validation (type, size, extension)

### 5.3 Data Access

- [ ] RLS policies enabled pada semua tables
- [ ] Service role key ONLY di server-side
- [ ] Sensitive data not exposed ke client
- [ ] API routes require authentication
- [ ] Rate limiting implemented
- [ ] Proper error messages (no internal details exposed)

### 5.4 Environment & Configuration

- [ ] No secrets hardcoded
- [ ] Environment variables validated
- [ ] `NEXT_PUBLIC_*` only untuk public vars
- [ ] `.env.local` in `.gitignore`
- [ ] Service keys rotated regularly

---

## 6. Performance Checklist

**Setiap page/component HARUS optimize untuk performance:**

### 6.1 Core Web Vitals

- [ ] **LCP < 2.5s**: Optimize images (next/image), lazy load
- [ ] **INP < 200ms**: Minimize JS, code splitting
- [ ] **CLS < 0.1**: Set dimensions, avoid dynamic content shifts

### 6.2 Next.js Optimization

- [ ] Use Server Components by default
- [ ] Client Components only when needed (interactivity)
- [ ] Image optimization dengan next/image
- [ ] Font optimization dengan next/font
- [ ] Dynamic imports untuk large components
- [ ] Proper caching strategy (`revalidate`, `dynamic`)

### 6.3 Database Optimization

- [ ] Index columns used di WHERE/ORDER BY
- [ ] Limit query results (pagination)
- [ ] Select only needed columns
- [ ] Avoid N+1 queries (use joins)
- [ ] Cache frequent queries

---

## 7. SEO Checklist

**Setiap public page HARUS SEO-optimized:**

- [ ] Unique `title` (< 60 chars)
- [ ] Compelling `description` (150-160 chars)
- [ ] Open Graph tags configured
- [ ] Twitter Card tags configured
- [ ] Canonical URL set
- [ ] Structured data (schema.org) implemented
- [ ] Semantic HTML (`<article>`, `<section>`, `<time>`)
- [ ] Image alt text descriptive
- [ ] Mobile-responsive
- [ ] Fast loading (< 3s)

---

## 8. AI Coding Assistant Workflow

### 8.1 Session Management

**Start of each session:**
```markdown
1. Read AI.md (this file)
2. Review relevant documentation sections
3. Understand current task context
4. Check existing code patterns
5. Plan implementation approach
```

**During session:**
```markdown
1. Write code in small increments
2. Test each increment
3. Commit frequently
4. Ask for clarification when needed
5. Suggest improvements proactively
```

**End of session:**
```markdown
1. Review all changes
2. Verify against checklists
3. Document key decisions
4. Update relevant docs if needed
5. Commit with descriptive message
```

### 8.2 Context Management

**Keep context file updated:**
```markdown
# GEMINI.md (or similar context file)

## Current Task
[Description of what you're working on]

## Key Decisions
- [Decision 1 and rationale]
- [Decision 2 and rationale]

## Blockers
- [Current blockers and attempted solutions]

## Next Steps
- [Planned next steps]

## Notes
- [Any important notes for next session]
```

### 8.3 Effective Prompting

**Good prompt structure:**
```markdown
Context: [What you're trying to achieve]
Requirements:
- [Requirement 1]
- [Requirement 2]
Constraints:
- [Constraint 1]
- [Constraint 2]
References:
- [Relevant doc sections]
- [Existing patterns to follow]
```

**Example:**
```markdown
Context: Create booking form for sports events

Requirements:
- Support 1-10 participants
- Show event details
- Handle payment after booking
- Work for anonymous users

Constraints:
- Follow booking-form structure in ai.md
- Use Zod validation
- Implement RLS checks
- Add Turnstile captcha for anonymous

References:
- components/booking/booking-form/ (existing pattern)
- lib/actions/booking/ (server actions)
- supabase.md (RLS policies)
- security.md (captcha integration)
```

---

## 9. Code Review Checklist

**Before marking task as complete, verify:**

### 9.1 Functionality
- [ ] Feature works as intended
- [ ] All edge cases handled
- [ ] Error states handled gracefully
- [ ] Loading states implemented
- [ ] Success feedback provided

### 9.2 Code Quality
- [ ] Follows modular structure
- [ ] No code duplication
- [ ] Descriptive naming
- [ ] Comments where needed
- [ ] TypeScript strict mode compliant
- [ ] No console.logs in production code

### 9.3 Security
- [ ] All security checklist items passed
- [ ] No sensitive data exposed
- [ ] Input validated
- [ ] Authentication checked
- [ ] RLS policies verified

### 9.4 Performance
- [ ] Core Web Vitals optimized
- [ ] No unnecessary re-renders
- [ ] Efficient queries
- [ ] Proper caching
- [ ] Images optimized

### 9.5 Accessibility
- [ ] Keyboard navigation works
- [ ] ARIA labels added
- [ ] Color contrast sufficient
- [ ] Focus states visible
- [ ] Screen reader friendly

### 9.6 Documentation
- [ ] Code self-documenting
- [ ] Complex logic commented
- [ ] API documented
- [ ] README updated (if needed)
- [ ] Types exported

---

## 10. Common Anti-Patterns to AVOID

### 10.1 ❌ DON'T DO THIS

**1. Mixing Server & Client Code**
```typescript
// ❌ WRONG
'use client';

import { createClient } from '@/utils/supabase/server'; // Server-only!

export function Component() {
  const supabase = createClient(); // ❌ Error
}
```

**2. Skipping Input Validation**
```typescript
// ❌ WRONG
export async function createBooking(data: any) {
  // Direct insert without validation ❌
  await supabase.from('bookings').insert(data);
}
```

**3. Hardcoding Secrets**
```typescript
// ❌ WRONG
const API_KEY = 'sk_live_12345'; // ❌ NEVER!
```

**4. Ignoring Error Handling**
```typescript
// ❌ WRONG
const data = await fetchData(); // What if it fails? ❌
```

**5. Not Using TypeScript Properly**
```typescript
// ❌ WRONG
const handleData = (data: any) => { // ❌ Avoid 'any'
  return data.something; // No type safety!
};
```

**6. Creating God Components**
```typescript
// ❌ WRONG - 500 line component
export function BookingPage() {
  // Auth logic
  // Form logic
  // Payment logic
  // Email logic
  // Analytics logic
  // Everything in one component ❌
}
```

---

## 11. Quick Reference

### 11.1 Essential Commands

```bash
# Development
npm run dev                 # Start dev server (Turbopack)
npm run build              # Build for production
npm run start              # Start production server
npm run lint               # Run ESLint

# Supabase (local)
supabase start             # Start local Supabase
supabase stop              # Stop local Supabase
supabase db reset          # Reset database
supabase gen types typescript --local > types/database.ts

# Testing
npm run test               # Run tests
npm run test:watch         # Watch mode
```

### 11.2 File Templates

**Component Template:**
```typescript
// components/[feature]/[component-name]/[component-name].tsx
'use client';

import { use[ComponentName] } from './use-[component-name]';
import type { [ComponentName]Props } from './[component-name].types';

export function [ComponentName]({ ...props }: [ComponentName]Props) {
  const { /* logic */ } = use[ComponentName]({ ...props });

  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

**Server Action Template:**
```typescript
// lib/actions/[feature]/[action-name].action.ts
'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { [schema] } from '@/lib/validations/[feature].schema';

export async function [actionName](formData: [FormDataType]) {
  try {
    // 1. Validate
    const validatedData = [schema].parse(formData);
    
    // 2. Auth check
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return { success: false, error: 'Unauthorized' };
    }

    // 3. Business logic
    const { data, error } = await supabase
      .from('[table]')
      .insert({ ...validatedData, user_id: user.id })
      .select()
      .single();

    if (error) throw error;

    // 4. Revalidate
    revalidatePath('/[path]');

    return { success: true, data };
  } catch (error) {
    console.error('[Action] error:', error);
    return { success: false, error: 'Failed to [action]' };
  }
}
```

---

## 12. Emergency Troubleshooting

### 12.1 Common Errors & Solutions

**Error: "Cookies can only be modified in Server Actions"**
```typescript
// ❌ WRONG - In Server Component
export default async function Page() {
  cookies().set('theme', 'dark'); // ❌ Error
}

// ✅ CORRECT - In Server Action or Route Handler
'use server';
export async function setTheme(theme: string) {
  cookies().set('theme', theme); // ✅ OK
}
```

**Error: "Cannot read properties of undefined (reading 'supabaseUrl')"**
```typescript
// ❌ WRONG - Using wrong client
'use server';
import { createClient } from '@/utils/supabase/client'; // ❌ Client in server

// ✅ CORRECT
'use server';
import { createClient } from '@/utils/supabase/server'; // ✅ Server client
```

**Error: "Hydration failed"**
```typescript
// ❌ WRONG - Different server/client render
export default function Component() {
  const randomId = Math.random(); // ❌ Different each time
  return <div id={randomId}>Content</div>;
}

// ✅ CORRECT - useEffect for client-only values
'use client';
export default function Component() {
  const [randomId, setRandomId] = useState<number | null>(null);
  
  useEffect(() => {
    setRandomId(Math.random());
  }, []);
  
  if (!randomId) return <div>Loading...</div>;
  return <div id={String(randomId)}>Content</div>;
}
```

---

## 13. Resources & References

### 13.1 Official Documentation

- **Next.js 16**: https://nextjs.org/docs
- **React 19**: https://react.dev/
- **Supabase**: https://supabase.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Zod**: https://zod.dev/
- **React Hook Form**: https://react-hook-form.com/

### 13.2 Internal Documentation

- `next16-react19-info.md` - Tech stack guide
- `security.md` - Security best practices
- `supabase.md` - Database & auth guide
- `seo.md` - SEO optimization guide

### 13.3 Tools

- **Google Search Console**: https://search.google.com/search-console
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Lighthouse**: Chrome DevTools
- **React DevTools**: Browser extension
- **Supabase Studio**: Local dashboard

---

## 14. Final Notes

**Remember:**
- **Read documentation first** before coding
- **Follow modular structure** strictly
- **Security is NOT optional**
- **Performance matters** for user experience
- **SEO is critical** for discoverability
- **Code quality** ensures long-term maintainability
- **Ask questions** when uncertain
- **Document decisions** for future reference

**Your goal:**
Write **production-ready, enterprise-grade code** yang:
- ✅ Secure by default
- ✅ Performant and scalable
- ✅ Maintainable and testable
- ✅ SEO-optimized
- ✅ Accessible
- ✅ Well-documented

**When in doubt, refer back to this guide and project documentation.**

---

**Document Version:** 1.0  
**Last Updated:** November 2025  
**Maintained By:** TI-Sports Development Team  
**For:** AI Coding Assistants (Gemini CLI, Cursor, Windsurf, GitHub Copilot, etc.)
