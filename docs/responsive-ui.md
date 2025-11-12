# TI-Sports Responsive UI & UX Guide

## 1. Overview

Dokumen ini adalah **panduan lengkap responsive design** untuk TI-Sports dengan fokus:
- **Mobile-First Design** (95% pengguna dari mobile)
- **Native App-Like Experience** (PWA-ready)
- **Consistent UI/UX** across devices
- **Performance Optimization** (skeleton loading, lazy loading)
- **Tailwind CSS Patterns** yang production-ready
- **Bottom Navigation** dan **Sidebar** architecture

**Target Devices:**
- Mobile: 320px - 767px (primary)
- Tablet: 768px - 1023px (secondary)
- Desktop: 1024px+ (secondary)

**Design Philosophy:**
- **Mobile First**: Design untuk mobile dulu, scale up ke desktop
- **Touch-Friendly**: Min 44×44px touch targets
- **Progressive Enhancement**: Core functionality works without JS
- **Accessibility**: WCAG 2.1 AA compliant

---

## 2. Tailwind CSS Breakpoints & Mobile-First Strategy

### 2.1 Breakpoint System

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      // Mobile-first breakpoints
      'sm': '640px',   // Small tablets, landscape phones
      'md': '768px',   // Tablets
      'lg': '1024px',  // Laptops, desktops
      'xl': '1280px',  // Large desktops
      '2xl': '1536px', // Extra large desktops
    },
  },
};
```

### 2.2 Mobile-First Pattern (MANDATORY)

```typescript
// ✅ CORRECT - Mobile-first approach
<div className="
  w-full          // Mobile: full width
  px-4            // Mobile: 16px padding
  py-6            // Mobile: 24px padding
  
  md:w-auto       // Tablet+: auto width
  md:px-6         // Tablet+: 24px padding
  md:py-8         // Tablet+: 32px padding
  
  lg:max-w-7xl    // Desktop+: max container width
  lg:px-8         // Desktop+: 32px padding
  lg:mx-auto      // Desktop+: center container
">
  Content
</div>

// ❌ WRONG - Desktop-first (avoid this)
<div className="
  max-w-7xl px-8 py-10    // Desktop styles first ❌
  md:px-6 md:py-8         // Override for tablet
  sm:w-full sm:px-4 sm:py-6  // Override for mobile
">
  Content
</div>
```

**Explanation:**
- Base styles = Mobile (no prefix)
- `md:` = Tablet dan larger
- `lg:` = Desktop dan larger
- Kode lebih clean, intentional, dan performant

### 2.3 Responsive Typography

```typescript
// Typography scale (mobile-first)
<h1 className="
  text-2xl        // Mobile: 24px
  font-bold
  leading-tight
  
  md:text-3xl     // Tablet+: 30px
  lg:text-4xl     // Desktop+: 36px
  xl:text-5xl     // Large+: 48px
">
  Heading
</h1>

<p className="
  text-sm         // Mobile: 14px
  leading-relaxed
  
  md:text-base    // Tablet+: 16px
  lg:text-lg      // Desktop+: 18px
">
  Body text
</p>
```

### 2.4 Responsive Spacing

```typescript
// Spacing scale (mobile-first)
<section className="
  px-4 py-8       // Mobile: 16px horizontal, 32px vertical
  
  md:px-6 md:py-12    // Tablet+: 24px, 48px
  lg:px-8 lg:py-16    // Desktop+: 32px, 64px
">
  Section content
</section>
```

---

## 3. Layout Patterns

### 3.1 Container Pattern

```typescript
// components/layout/container.tsx
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function Container({ children, className, size = 'xl' }: ContainerProps) {
  return (
    <div
      className={cn(
        // Base: mobile-first
        'w-full px-4 mx-auto',
        
        // Tablet
        'md:px-6',
        
        // Desktop sizes
        {
          'lg:max-w-4xl': size === 'sm',
          'lg:max-w-5xl': size === 'md',
          'lg:max-w-6xl': size === 'lg',
          'lg:max-w-7xl': size === 'xl',
          'lg:max-w-full lg:px-8': size === 'full',
        },
        
        className
      )}
    >
      {children}
    </div>
  );
}

// Usage
<Container size="lg">
  <h1>Page Content</h1>
</Container>
```

### 3.2 Grid Pattern (Responsive)

```typescript
// Responsive grid for cards/items
<div className="
  grid
  grid-cols-1          // Mobile: 1 column
  gap-4                // Mobile: 16px gap
  
  sm:grid-cols-2       // Small tablets: 2 columns
  md:grid-cols-2       // Tablets: 2 columns
  md:gap-6             // Tablets: 24px gap
  
  lg:grid-cols-3       // Desktop: 3 columns
  lg:gap-8             // Desktop: 32px gap
  
  xl:grid-cols-4       // Large: 4 columns
">
  {items.map(item => (
    <Card key={item.id} {...item} />
  ))}
</div>
```

### 3.3 Flexbox Pattern

```typescript
// Responsive flex direction
<div className="
  flex
  flex-col            // Mobile: vertical stack
  gap-4
  
  md:flex-row         // Tablet+: horizontal
  md:items-center
  md:justify-between
  md:gap-6
">
  <div className="flex-1">Main content</div>
  <div className="w-full md:w-auto">Sidebar</div>
</div>
```

---

## 4. Bottom Navigation (Mobile)

### 4.1 Bottom Nav Architecture

**WAJIB di mobile**, **hidden di desktop** (gunakan sidebar).

```typescript
// components/layout/bottom-nav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Ticket, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/events', label: 'Events', icon: Calendar },
  { href: '/dashboard/pesanan', label: 'Pesanan', icon: Ticket },
  { href: '/dashboard', label: 'Profil', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0 z-50
        bg-white dark:bg-gray-950
        border-t border-gray-200 dark:border-gray-800
        
        md:hidden          // ✅ Hidden pada tablet dan desktop
        
        safe-area-inset-bottom  // iOS safe area
      "
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                // Base styles
                'flex flex-col items-center justify-center',
                'min-w-[60px] h-full',
                'px-2 py-1',
                'rounded-lg',
                'transition-colors duration-200',
                
                // Touch target (min 44x44px)
                'touch-manipulation',
                
                // States
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-900'
              )}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon
                className={cn(
                  'w-6 h-6 mb-1',
                  isActive && 'stroke-[2.5]'
                )}
              />
              <span
                className={cn(
                  'text-xs font-medium',
                  isActive && 'font-semibold'
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

### 4.2 Bottom Nav Layout Wrapper

```typescript
// app/layout.tsx - Add bottom padding for bottom nav
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        {/* Main content with bottom padding on mobile */}
        <main className="
          pb-16          // Mobile: space for bottom nav (64px)
          md:pb-0        // Desktop: no bottom padding
        ">
          {children}
        </main>
        
        {/* Bottom nav - mobile only */}
        <BottomNav />
      </body>
    </html>
  );
}
```

### 4.3 iOS Safe Area Handling

```css
/* globals.css */
/* iOS safe area untuk bottom nav */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .safe-area-inset-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }
  
  /* Adjust main content padding */
  main {
    padding-bottom: calc(4rem + env(safe-area-inset-bottom));
  }
}
```

---

## 5. Sidebar (Desktop)

### 5.1 Sidebar Architecture

**WAJIB di desktop**, **hidden di mobile** (gunakan bottom nav atau drawer).

```typescript
// components/layout/sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Calendar,
  Ticket,
  CreditCard,
  Award,
  Users,
  Settings,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navSections = [
  {
    title: 'Menu',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: Home },
      { href: '/events', label: 'Events', icon: Calendar },
      { href: '/dashboard/pesanan', label: 'Pesanan Saya', icon: Ticket },
      { href: '/dashboard/transaksi', label: 'Transaksi', icon: CreditCard },
    ],
  },
  {
    title: 'Komunitas',
    items: [
      { href: '/dashboard/membership', label: 'Membership', icon: Award },
      { href: '/dashboard/referral', label: 'Referral', icon: Users },
    ],
  },
  {
    title: 'Akun',
    items: [
      { href: '/dashboard/settings', label: 'Pengaturan', icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        hidden              // ✅ Hidden di mobile
        md:flex             // ✅ Visible di tablet+
        md:flex-col
        md:fixed
        md:top-16           // Below navbar
        md:left-0
        md:bottom-0
        md:w-64
        md:border-r md:border-gray-200 dark:border-gray-800
        md:bg-white dark:bg-gray-950
        md:overflow-y-auto
      "
      aria-label="Sidebar navigation"
    >
      <nav className="flex-1 px-4 py-6 space-y-8">
        {navSections.map((section) => (
          <div key={section.title}>
            <h3 className="
              mb-3 px-3
              text-xs font-semibold
              text-gray-500 dark:text-gray-400
              uppercase tracking-wider
            ">
              {section.title}
            </h3>
            
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3',
                        'px-3 py-2',
                        'rounded-lg',
                        'transition-colors duration-200',
                        
                        isActive
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <Icon className={cn(
                        'w-5 h-5',
                        isActive && 'stroke-[2.5]'
                      )} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      
      {/* Logout button at bottom */}
      <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-800">
        <button
          className="
            flex items-center gap-3
            w-full px-3 py-2
            text-left
            text-red-600 dark:text-red-400
            hover:bg-red-50 dark:hover:bg-red-950/20
            rounded-lg
            transition-colors duration-200
          "
        >
          <LogOut className="w-5 h-5" />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}
```

### 5.2 Sidebar Layout Wrapper

```typescript
// app/dashboard/layout.tsx
import { Sidebar } from '@/components/layout/sidebar';
import { BottomNav } from '@/components/layout/bottom-nav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* Sidebar - desktop only */}
      <Sidebar />
      
      {/* Main content */}
      <main className="
        pb-16                  // Mobile: space for bottom nav
        md:pb-0                // Desktop: no bottom padding
        md:ml-64               // Desktop: offset for sidebar
      ">
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
      
      {/* Bottom nav - mobile only */}
      <BottomNav />
    </div>
  );
}
```

---

## 6. Responsive Card Components

### 6.1 Event Card (Mobile-Optimized)

```typescript
// components/event/event-card.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface EventCardProps {
  id: string;
  slug: string;
  title: string;
  venue: string;
  startsAt: string;
  capacity: number;
  priceIDR: number;
  status: 'OPEN' | 'FULL' | 'CLOSED';
  imageUrl: string;
  participantsMasked: string[];
}

export function EventCard({ ...event }: EventCardProps) {
  const spotsLeft = event.capacity - event.participantsMasked.length;
  
  return (
    <Link href={`/events/${event.slug}`}>
      <Card className={cn(
        'overflow-hidden',
        'transition-all duration-300',
        'hover:shadow-lg hover:-translate-y-1',
        
        // Touch feedback
        'active:scale-[0.98]',
        
        // Responsive
        'h-full' // Full height di grid
      )}>
        {/* Image */}
        <div className="
          relative
          aspect-[16/10]     // Mobile: 16:10 ratio
          md:aspect-[4/3]    // Desktop: 4:3 ratio
          overflow-hidden
        ">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
          
          {/* Status badge */}
          <div className="absolute top-2 right-2 md:top-3 md:right-3">
            <Badge
              variant={event.status === 'OPEN' ? 'default' : 'secondary'}
              className="
                text-xs
                md:text-sm
              "
            >
              {event.status}
            </Badge>
          </div>
        </div>
        
        {/* Content */}
        <CardContent className="
          p-3              // Mobile: 12px
          md:p-4           // Desktop: 16px
          space-y-2
          md:space-y-3
        ">
          {/* Title */}
          <h3 className="
            text-base        // Mobile: 16px
            md:text-lg       // Desktop: 18px
            font-semibold
            line-clamp-2     // Max 2 lines
            leading-tight
          ">
            {event.title}
          </h3>
          
          {/* Meta info */}
          <div className="space-y-1.5 text-sm text-muted-foreground">
            {/* Date */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">
                {new Date(event.startsAt).toLocaleDateString('id-ID', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                })}
              </span>
            </div>
            
            {/* Venue */}
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
            
            {/* Spots left */}
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 flex-shrink-0" />
              <span>{spotsLeft} slot tersisa</span>
            </div>
          </div>
          
          {/* Price */}
          <div className="
            flex items-center justify-between
            pt-2 mt-2
            border-t border-gray-200 dark:border-gray-800
          ">
            <span className="
              text-lg          // Mobile: 18px
              md:text-xl       // Desktop: 20px
              font-bold
              text-primary
            ">
              Rp {event.priceIDR.toLocaleString('id-ID')}
            </span>
            
            <span className="
              text-xs
              text-muted-foreground
            ">
              /orang
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
```

### 6.2 Stat Card (Dashboard)

```typescript
// components/dashboard/stat-card.tsx
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
}: StatCardProps) {
  return (
    <Card>
      <CardContent className="
        p-4              // Mobile: 16px
        md:p-6           // Desktop: 24px
      ">
        <div className="flex items-start justify-between">
          {/* Left: Text */}
          <div className="space-y-1 flex-1">
            <p className="
              text-xs          // Mobile: 12px
              md:text-sm       // Desktop: 14px
              text-muted-foreground
              font-medium
            ">
              {title}
            </p>
            
            <p className="
              text-2xl         // Mobile: 24px
              md:text-3xl      // Desktop: 30px
              font-bold
              tracking-tight
            ">
              {value}
            </p>
            
            {description && (
              <p className="text-xs text-muted-foreground">
                {description}
              </p>
            )}
            
            {trend && trendValue && (
              <div className={cn(
                'flex items-center gap-1',
                'text-xs font-medium',
                trend === 'up' && 'text-green-600',
                trend === 'down' && 'text-red-600',
                trend === 'neutral' && 'text-gray-600'
              )}>
                <span>{trendValue}</span>
              </div>
            )}
          </div>
          
          {/* Right: Icon */}
          <div className="
            p-2              // Mobile: 8px
            md:p-3           // Desktop: 12px
            rounded-lg
            bg-primary/10
          ">
            <Icon className="
              w-5 h-5        // Mobile: 20px
              md:w-6 md:h-6  // Desktop: 24px
              text-primary
            " />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

---

## 7. Responsive Tables

### 7.1 Table Pattern (Mobile-Optimized)

**Problem:** Tables overflow di mobile.
**Solution:** Transform table ke card layout di mobile.

```typescript
// components/ui/responsive-table.tsx
'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';

interface ResponsiveTableProps<T> {
  data: T[];
  columns: {
    key: keyof T;
    label: string;
    render?: (value: T[keyof T], item: T) => React.ReactNode;
  }[];
  mobileCardRender?: (item: T) => React.ReactNode;
}

export function ResponsiveTable<T extends { id: string | number }>({
  data,
  columns,
  mobileCardRender,
}: ResponsiveTableProps<T>) {
  return (
    <>
      {/* Desktop: Standard table */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={String(col.key)}>{col.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                {columns.map((col) => (
                  <TableCell key={String(col.key)}>
                    {col.render
                      ? col.render(item[col.key], item)
                      : String(item[col.key])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Mobile: Card layout */}
      <div className="md:hidden space-y-3">
        {data.map((item) => (
          <Card key={item.id} className="p-4">
            {mobileCardRender ? (
              mobileCardRender(item)
            ) : (
              <div className="space-y-2">
                {columns.map((col) => (
                  <div key={String(col.key)} className="flex justify-between text-sm">
                    <span className="font-medium text-muted-foreground">
                      {col.label}:
                    </span>
                    <span className="font-medium">
                      {col.render
                        ? col.render(item[col.key], item)
                        : String(item[col.key])}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </>
  );
}
```

**Usage example:**

```typescript
// app/dashboard/transaksi/page.tsx
import { ResponsiveTable } from '@/components/ui/responsive-table';
import { Badge } from '@/components/ui/badge';

const transactions = [
  { id: 'TXN001', date: '2025-11-10', amount: 150000, status: 'PAID' },
  { id: 'TXN002', date: '2025-11-09', amount: 200000, status: 'PENDING' },
];

export default function TransactionsPage() {
  return (
    <ResponsiveTable
      data={transactions}
      columns={[
        { key: 'id', label: 'ID Transaksi' },
        { key: 'date', label: 'Tanggal' },
        {
          key: 'amount',
          label: 'Jumlah',
          render: (value) => `Rp ${Number(value).toLocaleString('id-ID')}`,
        },
        {
          key: 'status',
          label: 'Status',
          render: (value) => (
            <Badge variant={value === 'PAID' ? 'default' : 'secondary'}>
              {String(value)}
            </Badge>
          ),
        },
      ]}
      mobileCardRender={(item) => (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold">{item.id}</span>
            <Badge variant={item.status === 'PAID' ? 'default' : 'secondary'}>
              {item.status}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">{item.date}</div>
          <div className="text-lg font-bold text-primary">
            Rp {item.amount.toLocaleString('id-ID')}
          </div>
        </div>
      )}
    />
  );
}
```

---

## 8. Skeleton Loading (Performance UX)

### 8.1 Skeleton Pattern

```typescript
// components/ui/skeleton.tsx (from shadcn/ui)
import { cn } from '@/lib/utils';

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200 dark:bg-gray-800',
        className
      )}
      {...props}
    />
  );
}
```

### 8.2 Event Card Skeleton

```typescript
// components/event/event-card-skeleton.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function EventCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Image skeleton */}
      <Skeleton className="
        aspect-[16/10]
        md:aspect-[4/3]
        w-full
      " />
      
      {/* Content skeleton */}
      <CardContent className="p-3 md:p-4 space-y-3">
        {/* Title */}
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
        
        {/* Meta info */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-12" />
        </div>
      </CardContent>
    </Card>
  );
}
```

### 8.3 Loading State Implementation

```typescript
// app/events/page.tsx
import { Suspense } from 'react';
import { EventCard } from '@/components/event/event-card';
import { EventCardSkeleton } from '@/components/event/event-card-skeleton';

async function EventsList() {
  const events = await fetchEvents(); // Server-side fetch
  
  return (
    <div className="
      grid grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      gap-4 md:gap-6
    ">
      {events.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
}

function EventsListSkeleton() {
  return (
    <div className="
      grid grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      gap-4 md:gap-6
    ">
      {Array.from({ length: 6 }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default function EventsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Upcoming Events
      </h1>
      
      <Suspense fallback={<EventsListSkeleton />}>
        <EventsList />
      </Suspense>
    </div>
  );
}
```

---

## 9. Touch-Friendly Design

### 9.1 Minimum Touch Target Size

**WCAG 2.1 guidelines: 44×44px minimum**

```typescript
// ✅ CORRECT - Touch-friendly button
<button className="
  min-w-[44px] min-h-[44px]    // ✅ Minimum touch target
  px-4 py-2
  rounded-lg
  
  // Touch feedback
  active:scale-95
  transition-transform duration-100
">
  Button
</button>

// ❌ WRONG - Too small
<button className="
  px-2 py-1    // ❌ Only ~32px height
  text-xs
">
  Button
</button>
```

### 9.2 Touch Feedback

```typescript
// Button with proper touch feedback
<button className="
  px-6 py-3
  bg-primary text-white
  rounded-lg
  
  // Touch states
  active:scale-[0.97]
  active:brightness-90
  
  // Smooth transition
  transition-all duration-150
  
  // Remove tap highlight (custom feedback)
  tap-highlight-transparent
  [-webkit-tap-highlight-color:transparent]
">
  Book Now
</button>
```

---

## 10. Native App-Like Experience

### 10.1 PWA Configuration

```typescript
// next.config.ts
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  // Next.js config
});
```

```json
// public/manifest.json
{
  "name": "TI-Sports",
  "short_name": "TI-Sports",
  "description": "Platform booking event olahraga",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#00AEEF",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

### 10.2 Viewport Meta (Already in layout)

```typescript
// app/layout.tsx
export const metadata = {
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false, // ✅ Prevent zoom for app-like feel
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#13151A' },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'TI-Sports',
  },
};
```

### 10.3 Pull-to-Refresh Disable (Optional)

```css
/* globals.css */
/* Disable pull-to-refresh on mobile browsers */
body {
  overscroll-behavior-y: contain;
}
```

---

## 11. Performance Optimization

### 11.1 Image Optimization

```typescript
import Image from 'next/image';

// ✅ CORRECT - Optimized image
<Image
  src="/event.jpg"
  alt="Event"
  width={800}
  height={600}
  className="rounded-lg"
  
  // Responsive sizes
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  
  // Loading strategy
  priority={false}      // Lazy load by default
  loading="lazy"
  
  // Placeholder
  placeholder="blur"
  blurDataURL="data:image/..."
/>
```

### 11.2 Lazy Loading Components

```typescript
import dynamic from 'next/dynamic';

// ✅ Lazy load heavy components
const HeavyChart = dynamic(() => import('@/components/charts/heavy-chart'), {
  loading: () => <Skeleton className="h-80 w-full" />,
  ssr: false, // Client-side only
});

export function DashboardPage() {
  return (
    <div>
      {/* Above the fold content loads immediately */}
      <h1>Dashboard</h1>
      <StatCards />
      
      {/* Below the fold - lazy loaded */}
      <HeavyChart />
    </div>
  );
}
```

### 11.3 Infinite Scroll (Large Lists)

```typescript
'use client';

import { useEffect, useState, useRef } from 'react';
import { EventCard } from '@/components/event/event-card';
import { EventCardSkeleton } from '@/components/event/event-card-skeleton';

export function InfiniteEventList({ initialEvents }: { initialEvents: Event[] }) {
  const [events, setEvents] = useState(initialEvents);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  const loadMore = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/events?page=${page + 1}`);
      const newEvents = await response.json();
      
      if (newEvents.length === 0) {
        setHasMore(false);
      } else {
        setEvents((prev) => [...prev, ...newEvents]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Load more error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      )}
      
      {/* Intersection observer target */}
      <div ref={observerRef} className="h-10" />
      
      {/* End message */}
      {!hasMore && (
        <p className="text-center text-muted-foreground mt-8">
          Tidak ada event lagi
        </p>
      )}
    </div>
  );
}
```

---

## 12. Accessibility (A11y)

### 12.1 Keyboard Navigation

```typescript
// Modal with keyboard handling
'use client';

import { useEffect, useRef } from 'react';

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Trap focus inside modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      
      if (e.key === 'Tab') {
        // Focus trap logic
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (!focusableElements) return;
        
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        
        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="..."
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
```

### 12.2 Screen Reader Support

```typescript
// Accessible button with loading state
<button
  disabled={isLoading}
  aria-busy={isLoading}
  aria-label={isLoading ? 'Memproses booking...' : 'Book sekarang'}
>
  {isLoading ? (
    <>
      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
      <span className="sr-only">Memproses booking...</span>
      <span aria-hidden="true">Memproses...</span>
    </>
  ) : (
    'Book Now'
  )}
</button>
```

---

## 13. Testing Responsiveness

### 13.1 Device Testing Checklist

- [ ] **iPhone SE** (375×667) - Smallest modern mobile
- [ ] **iPhone 12/13/14** (390×844) - Standard iPhone
- [ ] **iPhone 14 Pro Max** (430×932) - Large iPhone
- [ ] **Samsung Galaxy S21** (360×800) - Standard Android
- [ ] **iPad Mini** (768×1024) - Small tablet
- [ ] **iPad Pro** (1024×1366) - Large tablet
- [ ] **Desktop** (1920×1080) - Standard desktop

### 13.2 Chrome DevTools Testing

```
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test different devices
4. Check:
   - Layout shifts (CLS)
   - Touch target sizes
   - Overflow issues
   - Font sizes
   - Image loading
```

### 13.3 Real Device Testing

**Tools:**
- **BrowserStack**: https://www.browserstack.com/
- **LambdaTest**: https://www.lambdatest.com/
- **Physical devices**: Test on actual phones/tablets

---

## 14. Common Responsive Patterns

### 14.1 Show/Hide Pattern

```typescript
// Show only on mobile
<div className="block md:hidden">
  Mobile only content
</div>

// Show only on desktop
<div className="hidden md:block">
  Desktop only content
</div>

// Different layout per breakpoint
<div className="
  flex-col        // Mobile: vertical stack
  md:flex-row     // Desktop: horizontal
">
  <div>Content 1</div>
  <div>Content 2</div>
</div>
```

### 14.2 Responsive Spacing

```typescript
// Responsive padding/margin
<section className="
  px-4 py-6           // Mobile: 16px, 24px
  md:px-6 md:py-8     // Tablet: 24px, 32px
  lg:px-8 lg:py-12    // Desktop: 32px, 48px
">
  Section content
</section>

// Responsive gap
<div className="
  flex gap-2          // Mobile: 8px
  md:gap-4            // Tablet: 16px
  lg:gap-6            // Desktop: 24px
">
  Items
</div>
```

### 14.3 Responsive Typography

```typescript
// Fluid typography with clamp
<h1 className="
  text-2xl          // Mobile: 24px
  sm:text-3xl       // Small: 30px
  md:text-4xl       // Medium: 36px
  lg:text-5xl       // Large: 48px
  xl:text-6xl       // XL: 60px
  
  font-bold
  leading-tight
  tracking-tight
">
  Heading
</h1>
```

---

## 15. Checklist Implementasi

### 15.1 Mobile-First Design

- [ ] Base styles untuk mobile (no prefix)
- [ ] Breakpoint modifiers untuk larger screens
- [ ] Touch-friendly targets (min 44×44px)
- [ ] Responsive typography scale
- [ ] Responsive spacing scale
- [ ] Test di real devices

### 15.2 Navigation

- [ ] Bottom nav di mobile (< 768px)
- [ ] Sidebar di desktop (≥ 768px)
- [ ] Active state indicators
- [ ] Keyboard navigation support
- [ ] ARIA labels proper

### 15.3 Components

- [ ] Cards responsive (grid layout)
- [ ] Tables transform ke cards di mobile
- [ ] Forms stack vertically di mobile
- [ ] Images dengan next/image
- [ ] Skeleton loading states

### 15.4 Performance

- [ ] Lazy loading components
- [ ] Image optimization
- [ ] Infinite scroll untuk large lists
- [ ] Code splitting
- [ ] Proper caching strategy

### 15.5 Accessibility

- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] Focus indicators
- [ ] ARIA attributes
- [ ] Color contrast (WCAG AA)

### 15.6 PWA

- [ ] manifest.json configured
- [ ] Service worker setup
- [ ] App icons (192×192, 512×512)
- [ ] Standalone display mode
- [ ] Theme color meta tags

---

## 16. Reference Links

### Official Documentation

1. **Tailwind CSS Responsive Design**
   - https://tailwindcss.com/docs/responsive-design
   - Breakpoints, mobile-first approach

2. **Next.js Image Optimization**
   - https://nextjs.org/docs/app/building-your-application/optimizing/images
   - Image component, sizes, priority

3. **Next.js PWA**
   - https://github.com/shadowwalker/next-pwa
   - PWA configuration untuk Next.js

4. **Web.dev Mobile UX**
   - https://web.dev/mobile/
   - Mobile best practices

5. **WCAG 2.1 Guidelines**
   - https://www.w3.org/WAI/WCAG21/quickref/
   - Accessibility standards

### Tools

6. **Chrome DevTools Device Mode**
   - Built-in responsive testing

7. **Lighthouse**
   - Performance, accessibility audit

8. **PageSpeed Insights**
   - https://pagespeed.web.dev/
   - Real-world performance metrics

---

**Document Version:** 1.0  
**Last Updated:** November 2025  
**Maintained By:** TI-Sports Frontend Team  
**Target:** Mobile-first, app-like web experience