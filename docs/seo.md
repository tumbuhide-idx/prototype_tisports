# TI-Sports Advanced SEO Guide (Next.js 16 - 2025)

## 1. Overview

Dokumen ini mengcover **advanced SEO optimization** untuk Next.js 16 dengan fokus pada:
- **Technical SEO**: Metadata, structured data, crawlability
- **Google Indexing**: How to get indexed fast & stay indexed
- **Core Web Vitals**: Performance optimization
- **AI & Voice Search**: GEO (Generative Engine Optimization)
- **Google Search Console**: Monitoring & troubleshooting

**Target:**
- Production-ready SEO implementation
- Google first-page rankings
- Featured snippets & rich results
- AI-generated summary (Google SGE, ChatGPT)

**Tech stack:**
- Next.js 16 (App Router)
- React 19
- Metadata API (native Next.js)
- Google Search Console
- Schema.org structured data

---

## 2. Next.js 16 Metadata API

### 2.1 Static Metadata

**Basic page metadata:**

```typescript
// app/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TI-Sports | Book Sports Events & Venues',
  description: 'Discover and book the best sports events and venues. Join basketball, football, badminton tournaments. Easy booking, secure payment.',
  keywords: [
    'sports booking',
    'sports events',
    'venue rental',
    'basketball tournaments',
    'football matches',
    'badminton courts',
  ],
  authors: [{ name: 'TI-Sports Team' }],
  creator: 'TI-Sports',
  publisher: 'TI-Sports',
  
  // ✅ Open Graph for social media
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ti-sports.com',
    siteName: 'TI-Sports',
    title: 'TI-Sports | Book Sports Events & Venues',
    description: 'Discover and book the best sports events and venues.',
    images: [
      {
        url: 'https://ti-sports.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TI-Sports - Sports Booking Platform',
      },
    ],
  },
  
  // ✅ Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'TI-Sports | Book Sports Events & Venues',
    description: 'Discover and book the best sports events and venues.',
    creator: '@tisports',
    images: ['https://ti-sports.com/twitter-image.jpg'],
  },
  
  // ✅ Verification & other meta
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification',
  },
  
  // ✅ Canonical URL
  alternates: {
    canonical: 'https://ti-sports.com',
  },
  
  // ✅ Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function HomePage() {
  return (
    <main>
      <h1>Book Your Next Sports Event</h1>
      {/* Content */}
    </main>
  );
}
```

### 2.2 Dynamic Metadata

**For dynamic pages (events, blog posts):**

```typescript
// app/events/[id]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

interface Props {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

// ✅ generateMetadata untuk SEO dynamic pages
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient();
  
  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !event) {
    return {
      title: 'Event Not Found | TI-Sports',
    };
  }

  const eventDate = new Date(event.start_time).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return {
    title: `${event.title} - ${eventDate} | TI-Sports`,
    description: event.description || `Join ${event.title} at ${event.venue}. Book your spot now!`,
    keywords: [
      event.title,
      event.venue,
      'sports event',
      'book now',
    ],
    
    openGraph: {
      type: 'article',
      url: `https://ti-sports.com/events/${params.id}`,
      title: event.title,
      description: event.description,
      images: [
        {
          url: event.image_url || 'https://ti-sports.com/default-event.jpg',
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
      publishedTime: event.created_at,
      modifiedTime: event.updated_at,
    },
    
    twitter: {
      card: 'summary_large_image',
      title: event.title,
      description: event.description,
      images: [event.image_url || 'https://ti-sports.com/default-event.jpg'],
    },
    
    alternates: {
      canonical: `https://ti-sports.com/events/${params.id}`,
    },
  };
}

export default async function EventPage({ params }: Props) {
  const supabase = createClient();
  
  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !event) {
    notFound();
  }

  return (
    <article className="container mx-auto p-6">
      {/* ✅ Semantic HTML untuk SEO */}
      <header>
        <h1 className="text-4xl font-bold">{event.title}</h1>
        <time dateTime={event.start_time}>
          {new Date(event.start_time).toLocaleDateString()}
        </time>
      </header>
      
      <section>
        <h2>About This Event</h2>
        <p>{event.description}</p>
      </section>
      
      <section>
        <h2>Venue</h2>
        <address>{event.venue}</address>
      </section>
    </article>
  );
}
```

### 2.3 Template Metadata (Shared)

**Root layout metadata (global):**

```typescript
// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  // ✅ Template untuk child pages
  title: {
    template: '%s | TI-Sports',
    default: 'TI-Sports | Book Sports Events & Venues',
  },
  description: 'Discover and book the best sports events and venues.',
  
  // ✅ App identity
  applicationName: 'TI-Sports',
  referrer: 'origin-when-cross-origin',
  
  // ✅ Icons & manifest
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  
  // ✅ Viewport (for mobile)
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  
  // ✅ Theme color
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  
  // ✅ Robots di root level
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

**Child page uses template:**

```typescript
// app/about/page.tsx
export const metadata = {
  title: 'About Us', // ✅ Result: "About Us | TI-Sports"
  description: 'Learn about TI-Sports mission and team.',
};
```

---

## 3. Structured Data (Schema.org)

### 3.1 Why Structured Data Matters

**Benefits:**
- **Rich snippets** di Google search results
- **Featured snippets** & knowledge panels
- **Voice search** optimization
- **AI engine** understanding (ChatGPT, Bard)

**Common schema types:**
- **Organization**: Company info
- **WebSite**: Site-wide info + sitelinks search
- **BreadcrumbList**: Breadcrumb navigation
- **Event**: Sports events
- **LocalBusiness**: Physical venue
- **FAQPage**: FAQ sections

### 3.2 Organization Schema

```typescript
// app/layout.tsx - Add to RootLayout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TI-Sports',
    url: 'https://ti-sports.com',
    logo: 'https://ti-sports.com/logo.png',
    description: 'Sports booking platform for events and venues',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+62-812-3456-7890',
      contactType: 'Customer Service',
      email: 'support@ti-sports.com',
      areaServed: 'ID',
      availableLanguage: ['English', 'Indonesian'],
    },
    sameAs: [
      'https://facebook.com/tisports',
      'https://twitter.com/tisports',
      'https://instagram.com/tisports',
      'https://linkedin.com/company/tisports',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Sudirman No. 123',
      addressLocality: 'Jakarta',
      addressRegion: 'DKI Jakarta',
      postalCode: '12190',
      addressCountry: 'ID',
    },
  };

  return (
    <html lang="en">
      <head>
        {/* ✅ Inject JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 3.3 Event Schema

```typescript
// app/events/[id]/page.tsx
export default async function EventPage({ params }: Props) {
  const supabase = createClient();
  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!event) return notFound();

  // ✅ Event schema
  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: event.title,
    description: event.description,
    startDate: event.start_time,
    endDate: event.end_time,
    image: event.image_url || 'https://ti-sports.com/default-event.jpg',
    url: `https://ti-sports.com/events/${params.id}`,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    
    location: {
      '@type': 'Place',
      name: event.venue,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.venue,
        addressLocality: 'Jakarta',
        addressCountry: 'ID',
      },
    },
    
    offers: {
      '@type': 'Offer',
      url: `https://ti-sports.com/events/${params.id}`,
      price: event.price,
      priceCurrency: 'IDR',
      availability: 'https://schema.org/InStock',
      validFrom: event.created_at,
    },
    
    organizer: {
      '@type': 'Organization',
      name: 'TI-Sports',
      url: 'https://ti-sports.com',
    },
  };

  return (
    <>
      {/* ✅ Inject event schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      
      <article>
        <h1>{event.title}</h1>
        {/* Event content */}
      </article>
    </>
  );
}
```

### 3.4 BreadcrumbList Schema

```typescript
// components/breadcrumb-schema.tsx
'use client';

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}
```

**Usage:**

```typescript
// app/events/[id]/page.tsx
import { BreadcrumbSchema } from '@/components/breadcrumb-schema';

export default function EventPage({ params }: Props) {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://ti-sports.com' },
    { name: 'Events', url: 'https://ti-sports.com/events' },
    { name: event.title, url: `https://ti-sports.com/events/${params.id}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      {/* Page content */}
    </>
  );
}
```

### 3.5 FAQPage Schema

```typescript
// app/faq/page.tsx
export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I book a sports event?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To book a sports event, browse our events page, select an event, and click "Book Now". You can pay securely using various payment methods.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I cancel my booking?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you can cancel your booking up to 24 hours before the event starts. Cancellations made within 24 hours are non-refundable.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer group discounts?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer discounts for groups of 5 or more participants. Contact our support team for more details.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="container mx-auto p-6">
        <h1>Frequently Asked Questions</h1>
        {/* FAQ content */}
      </div>
    </>
  );
}
```

---

## 4. Sitemap & Robots.txt

### 4.1 Dynamic Sitemap

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';
import { createClient } from '@/utils/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient();
  
  // ✅ Static pages
  const staticPages = [
    {
      url: 'https://ti-sports.com',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: 'https://ti-sports.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://ti-sports.com/events',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: 'https://ti-sports.com/faq',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // ✅ Dynamic event pages
  const { data: events } = await supabase
    .from('events')
    .select('id, updated_at')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(10000); // Max sitemap URLs

  const eventPages = (events || []).map((event) => ({
    url: `https://ti-sports.com/events/${event.id}`,
    lastModified: new Date(event.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...eventPages];
}
```

**Sitemap akan generate di: `https://ti-sports.com/sitemap.xml`**

### 4.2 Robots.txt

```typescript
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',        // Block API routes
          '/admin/',      // Block admin pages
          '/_next/',      // Block Next.js internals
          '/private/',    // Block private pages
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
      },
    ],
    sitemap: 'https://ti-sports.com/sitemap.xml',
    host: 'https://ti-sports.com',
  };
}
```

**Robots.txt akan generate di: `https://ti-sports.com/robots.txt`**

---

## 5. Google Indexing Strategy

### 5.1 Submit to Google Search Console

**Step-by-step:**

1. **Verify ownership:**
   - Go to: https://search.google.com/search-console
   - Add property: `ti-sports.com`
   - Verify via:
     - DNS record (recommended)
     - HTML file upload
     - Meta tag di `<head>`

2. **Submit sitemap:**
   - Navigate: **Sitemaps** → **Add new sitemap**
   - Enter: `https://ti-sports.com/sitemap.xml`
   - Click **Submit**

3. **Request indexing untuk key pages:**
   - Navigate: **URL Inspection**
   - Enter URL: `https://ti-sports.com/events/123`
   - Click **Request Indexing**

### 5.2 Speed Up Indexing

**Tactics:**

1. **Internal linking:**
   ```typescript
   // ✅ Link dari homepage ke important pages
   <Link href="/events">Browse Events</Link>
   <Link href="/about">About Us</Link>
   ```

2. **Submit to IndexNow:**
   ```bash
   # Instant indexing notification ke Bing & Yandex
   curl -X POST "https://api.indexnow.org/indexnow" \
     -H "Content-Type: application/json" \
     -d '{
       "host": "ti-sports.com",
       "key": "your-indexnow-key",
       "keyLocation": "https://ti-sports.com/your-key.txt",
       "urlList": [
         "https://ti-sports.com/events/new-event"
       ]
     }'
   ```

3. **Social signals:**
   - Share new pages di social media
   - Encourage social sharing

4. **Backlinks:**
   - Guest posts di sports blogs
   - Local business directories
   - Press releases

### 5.3 Monitor Indexing Status

**Google Search Console checks:**

1. **Coverage report:**
   - Navigate: **Indexing** → **Pages**
   - Check:
     - **Indexed**: ✅ Good
     - **Discovered - currently not indexed**: ⚠️ Low priority
     - **Excluded**: ❌ Need fixing

2. **Common exclusion reasons:**
   - **Duplicate content**: Set canonical URLs
   - **Noindex tag**: Remove `robots: { index: false }`
   - **Low quality**: Improve content
   - **Crawl budget**: Reduce unnecessary pages

---

## 6. Core Web Vitals Optimization

### 6.1 Metrics to Monitor

**2025 Core Web Vitals:**

| Metric | Target | Impact |
|--------|--------|--------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Page loading speed |
| **INP** (Interaction to Next Paint) | < 200ms | Responsiveness |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Visual stability |

### 6.2 Optimize LCP (Loading)

**Use Next.js Image optimization:**

```typescript
// ✅ BENAR - Gunakan next/image
import Image from 'next/image';

export function EventCard({ event }: { event: Event }) {
  return (
    <div>
      <Image
        src={event.image_url}
        alt={event.title}
        width={400}
        height={300}
        priority // ✅ Priority untuk above-the-fold images
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <h3>{event.title}</h3>
    </div>
  );
}
```

**Font optimization:**

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

// ✅ Subset & preload font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // ✅ FOIT prevention
  preload: true,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

**Lazy loading:**

```typescript
// ✅ Lazy load below-the-fold components
import dynamic from 'next/dynamic';

const Reviews = dynamic(() => import('@/components/reviews'), {
  loading: () => <p>Loading reviews...</p>,
  ssr: false, // Client-side only
});

export default function EventPage() {
  return (
    <div>
      {/* Above the fold content */}
      <h1>Event Title</h1>
      
      {/* ✅ Below the fold - lazy loaded */}
      <Reviews />
    </div>
  );
}
```

### 6.3 Optimize INP (Interactivity)

**Defer non-critical JS:**

```typescript
// next.config.ts
const nextConfig = {
  reactCompiler: true, // ✅ React Compiler for auto-optimization
  
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-*'],
  },
};

export default nextConfig;
```

**Code splitting:**

```typescript
// ✅ Split large components
const BookingModal = dynamic(() => import('@/components/booking-modal'));

export function EventPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Book Now</button>
      
      {/* ✅ Modal only loaded when needed */}
      {showModal && <BookingModal />}
    </div>
  );
}
```

### 6.4 Optimize CLS (Layout Stability)

**Reserve space untuk images:**

```typescript
// ✅ BENAR - Set width & height
<Image
  src="/event.jpg"
  alt="Event"
  width={800}
  height={600} // ✅ Prevents layout shift
/>

// ❌ SALAH - No dimensions
<img src="/event.jpg" alt="Event" />
```

**Avoid dynamic content above-the-fold:**

```typescript
// ❌ SALAH - Shifts content
export default function Page() {
  const [banner, setBanner] = useState<string>();

  useEffect(() => {
    fetch('/api/banner').then(res => res.json()).then(setBanner);
  }, []);

  return (
    <>
      {banner && <div>{banner}</div>} {/* ❌ Causes layout shift */}
      <h1>Main Content</h1>
    </>
  );
}

// ✅ BENAR - Reserve space
export default function Page() {
  const [banner, setBanner] = useState<string>();

  useEffect(() => {
    fetch('/api/banner').then(res => res.json()).then(setBanner);
  }, []);

  return (
    <>
      <div className="h-20"> {/* ✅ Fixed height */}
        {banner || <div className="animate-pulse bg-gray-200 h-full" />}
      </div>
      <h1>Main Content</h1>
    </>
  );
}
```

---

## 7. Generative Engine Optimization (GEO)

### 7.1 What is GEO?

**GEO** adalah optimisasi untuk **AI-generated summaries**:
- Google SGE (Search Generative Experience)
- ChatGPT web browsing
- Bing Copilot
- Claude, Perplexity, dll.

**Goal:** Content Anda muncul di **AI-generated answers**.

### 7.2 GEO Best Practices

**1. Lead with the answer:**

```markdown
<!-- ✅ BENAR -->
# How to Book a Sports Event

To book a sports event on TI-Sports, follow these steps:
1. Browse available events
2. Select an event
3. Click "Book Now"
4. Complete payment

[Detailed explanation follows...]

<!-- ❌ SALAH -->
# How to Book a Sports Event

Sports are important for health and wellness. Many people 
enjoy participating in sports events...
[Answer buried at bottom]
```

**2. Use clear headings:**

```typescript
export default function GuideПодробнее() {
  return (
    <article>
      {/* ✅ Clear H2 questions */}
      <h2>What is TI-Sports?</h2>
      <p>TI-Sports is a sports booking platform...</p>

      <h2>How do I create an account?</h2>
      <p>To create an account, click "Sign Up"...</p>

      <h2>Is booking free?</h2>
      <p>Creating an account is free. Event booking fees vary...</p>
    </article>
  );
}
```

**3. Add citation-worthy data:**

```markdown
<!-- ✅ Specific, quotable facts -->
- Over 10,000 events booked monthly
- Average booking time: 2 minutes
- 98% customer satisfaction rate
- Available in 25 Indonesian cities

<!-- ❌ Vague claims -->
- Many events available
- Fast booking process
- High customer satisfaction
```

**4. Structured Q&A format:**

```typescript
// components/faq-section.tsx
const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit cards (Visa, Mastercard), bank transfers, and e-wallets (GoPay, OVO, Dana).",
  },
  {
    question: "Can I get a refund?",
    answer: "Yes, full refunds are available for cancellations made 24+ hours before the event.",
  },
];

export function FAQSection() {
  return (
    <section>
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, i) => (
        <div key={i}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </section>
  );
}
```

**5. Include author expertise:**

```typescript
export const metadata = {
  title: 'Complete Guide to Sports Booking',
  description: 'Learn how to book sports events effectively.',
  authors: [
    {
      name: 'John Doe',
      url: 'https://ti-sports.com/authors/john-doe',
    },
  ],
  // ✅ Author expertise for E-E-A-T
};

export default function GuidePage() {
  return (
    <article>
      <header>
        <h1>Complete Guide to Sports Booking</h1>
        <div className="author-bio">
          <p>
            <strong>Written by John Doe</strong> — Sports industry expert with 
            10+ years experience. Certified Sports Event Planner.
          </p>
        </div>
      </header>
      {/* Content */}
    </article>
  );
}
```

---

## 8. URL Structure & Routing

### 8.1 SEO-Friendly URLs

**✅ BENAR:**
```
https://ti-sports.com/events/basketball-tournament-2025
https://ti-sports.com/blog/how-to-book-sports-events
https://ti-sports.com/venues/jakarta/stadium-a
```

**❌ SALAH:**
```
https://ti-sports.com/events?id=12345
https://ti-sports.com/blog?post=abc&category=123
https://ti-sports.com/v?id=stadium-a&city=jkt
```

### 8.2 Implementation dengan Dynamic Routes

```
app/
├── events/
│   ├── [slug]/
│   │   └── page.tsx         # /events/basketball-tournament
│   └── page.tsx             # /events
├── blog/
│   ├── [slug]/
│   │   └── page.tsx         # /blog/booking-guide
│   └── page.tsx             # /blog
└── venues/
    └── [city]/
        └── [venue]/
            └── page.tsx     # /venues/jakarta/stadium-a
```

**Generate slug dari title:**

```typescript
// lib/utils.ts
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')  // Remove special chars
    .replace(/\s+/g, '-')      // Replace spaces with -
    .replace(/--+/g, '-');     // Replace multiple - with single
}

// Example:
// "Basketball Tournament 2025!" → "basketball-tournament-2025"
```

**Use slug di database:**

```sql
-- events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,  -- ✅ Slug untuk SEO URL
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index untuk query by slug
CREATE INDEX idx_events_slug ON events(slug);
```

**Query by slug:**

```typescript
// app/events/[slug]/page.tsx
export default async function EventPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  
  // ✅ Query by slug instead of UUID
  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!event) notFound();

  return <div>{event.title}</div>;
}
```

---

## 9. Mobile-First & Performance

### 9.1 Responsive Design

**Viewport meta (already in layout):**

```typescript
export const metadata = {
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};
```

**Test mobile-friendliness:**
- Google Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
- PageSpeed Insights: https://pagespeed.web.dev/

### 9.2 Caching Strategy

```typescript
// app/events/page.tsx

// ✅ Cache static data
export const revalidate = 60; // Revalidate every 60 seconds

export default async function EventsPage() {
  // Data fetching...
}
```

**For frequently changing data:**

```typescript
// ✅ Dynamic with no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;
```

---

## 10. Monitoring & Analytics

### 10.1 Google Search Console

**Key reports to monitor:**

1. **Performance:**
   - Total clicks
   - Total impressions
   - Average CTR
   - Average position

2. **Coverage:**
   - Valid pages
   - Excluded pages
   - Errors

3. **Core Web Vitals:**
   - LCP, INP, CLS metrics
   - Poor, Needs Improvement, Good URLs

4. **Mobile Usability:**
   - Mobile-friendly errors

### 10.2 Google Analytics 4 (GA4)

**Install GA4:**

```typescript
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        {/* ✅ Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 10.3 Track Events

```typescript
// lib/analytics.ts
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

// Usage
trackEvent('booking_completed', {
  event_id: '123',
  event_name: 'Basketball Tournament',
  value: 50000,
  currency: 'IDR',
});
```

---

## 11. SEO Checklist (Production)

### 11.1 Technical SEO

- [ ] **Metadata** complete pada semua pages
- [ ] **Structured data** (schema.org) implemented
- [ ] **Sitemap.xml** submitted ke Google Search Console
- [ ] **Robots.txt** configured correctly
- [ ] **Canonical URLs** set pada semua pages
- [ ] **404 page** dengan helpful navigation
- [ ] **HTTPS** enabled (SSL certificate)
- [ ] **www vs non-www** redirect configured
- [ ] **Trailing slash** consistency

### 11.2 On-Page SEO

- [ ] **Unique titles** pada setiap page (< 60 chars)
- [ ] **Meta descriptions** compelling (150-160 chars)
- [ ] **H1 tag** one per page, matches title
- [ ] **H2-H6 tags** proper hierarchy
- [ ] **Image alt text** descriptive untuk semua images
- [ ] **Internal linking** strategic
- [ ] **External links** open in new tab
- [ ] **Breadcrumbs** implemented
- [ ] **Mobile-responsive** design

### 11.3 Content Quality

- [ ] **Original content** (not duplicate/copied)
- [ ] **Keyword research** completed
- [ ] **Target keywords** naturally included
- [ ] **Content length** sufficient (>500 words untuk key pages)
- [ ] **Readability** score good (Flesch Reading Ease)
- [ ] **Multimedia** (images, videos) included
- [ ] **Fresh content** regularly updated
- [ ] **Author bio** untuk expertise (E-E-A-T)

### 11.4 Performance

- [ ] **Core Web Vitals** pass thresholds
- [ ] **Page speed** < 3s load time
- [ ] **Image optimization** (WebP, lazy loading)
- [ ] **Font optimization** (subset, swap)
- [ ] **JS/CSS minification** enabled
- [ ] **CDN** configured untuk static assets
- [ ] **Caching** strategy implemented

### 11.5 Indexing & Crawling

- [ ] **Google Search Console** verified
- [ ] **Sitemap** submitted & no errors
- [ ] **Important pages** manually submitted
- [ ] **No orphan pages** (all linked internally)
- [ ] **Crawl budget** optimized (no unnecessary pages)
- [ ] **Pagination** handled correctly
- [ ] **Duplicate content** resolved (canonicals)

---

## 12. Advanced Tips & Tools

### 12.1 Voice Search Optimization

**Optimize untuk natural language:**

```markdown
<!-- ✅ Question-based content -->
# Where can I book basketball courts in Jakarta?

You can book basketball courts in Jakarta through TI-Sports.
We offer 50+ venues across the city with instant booking.

[Detailed list of venues...]
```

**Featured snippet optimization:**

- Use **lists**, **tables**, **steps**
- Answer common questions **concisely**
- Include **"What is"**, **"How to"**, **"Best"** content

### 12.2 Local SEO (if applicable)

**LocalBusiness schema:**

```typescript
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'TI-Sports HQ',
  image: 'https://ti-sports.com/hq.jpg',
  '@id': 'https://ti-sports.com',
  url: 'https://ti-sports.com',
  telephone: '+62-812-3456-7890',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jl. Sudirman No. 123',
    addressLocality: 'Jakarta',
    postalCode: '12190',
    addressCountry: 'ID',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -6.2088,
    longitude: 106.8456,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
};
```

### 12.3 Useful SEO Tools

**Free tools:**
- Google Search Console: https://search.google.com/search-console
- Google PageSpeed Insights: https://pagespeed.web.dev/
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema Markup Validator: https://validator.schema.org/

**Chrome Extensions:**
- Meta SEO Inspector
- Lighthouse (built-in DevTools)
- Detailed SEO Extension
- SEO Minion

**Paid tools (Optional):**
- Ahrefs
- SEMrush
- Moz Pro
- Screaming Frog SEO Spider

---

## 13. Reference Links

### Official Documentation

1. **Next.js SEO**
   - https://nextjs.org/docs/app/building-your-application/optimizing/metadata
   - Metadata API, Open Graph, SEO best practices

2. **Google Search Central**
   - https://developers.google.com/search
   - SEO starter guide, search essentials

3. **Schema.org**
   - https://schema.org/
   - Structured data vocabulary

4. **Core Web Vitals**
   - https://web.dev/vitals/
   - Performance metrics guide

5. **Google Search Console**
   - https://search.google.com/search-console/about
   - Help documentation

### Articles & Guides

6. **Next.js 16 SEO Guide**
   - Latest SEO practices untuk Next.js 16

7. **GEO Guide**
   - Generative Engine Optimization untuk AI summaries

8. **Indexing Guide 2025**
   - How to get indexed fast di 2025

---

**Document Version:** 1.0  
**Last Updated:** November 2025  
**Maintained By:** TI-Sports SEO Team  
**Target Stack:** Next.js 16, Google Search, Schema.org