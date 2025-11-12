
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { EventCard } from '@/components/public/events/EventCard';
import { Search } from 'lucide-react';
import { getEvents } from '@/lib/events';
import type { Event } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

const EventCardSkeleton = () => (
  <div className="flex flex-col h-full bg-surface/50 overflow-hidden rounded-lg border">
    <Skeleton className="aspect-[16/10] w-full" />
    <div className="p-4 md:p-6 space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <Skeleton className="h-4 w-1/2" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-10 w-1/3" />
      </div>
    </div>
  </div>
);


export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="flex flex-col items-center">
      <section className="w-full bg-surface/50">
        <div className="container py-12 md:py-20 text-center">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">Community Events</h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
                Temukan dan ikuti jadwal main bareng mingguan. Slot real-time, e-ticket instan, dan keseruan menantimu.
            </p>
        </div>
      </section>

      <AnimatedSection id="events" className="container py-12">
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Cari nama event atau GOR..." className="pl-12 h-14 rounded-full text-base" />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            <Badge variant="default" className="text-sm shrink-0 cursor-pointer py-2 px-4 rounded-full">Semua</Badge>
            <Badge variant="secondary" className="text-sm shrink-0 cursor-pointer hover:bg-muted py-2 px-4 rounded-full">Badminton</Badge>
            <Badge variant="secondary" className="text-sm shrink-0 cursor-pointer hover:bg-muted py-2 px-4 rounded-full">Futsal</Badge>
            <Badge variant="secondary" className="text-sm shrink-0 cursor-pointer hover:bg-muted py-2 px-4 rounded-full">Basketball</Badge>
          </div>
        </div>
        
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 3 }).map((_, index) => <EventCardSkeleton key={index} />)}
          </div>
        }>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </Suspense>
        
        {events.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p>Tidak ada jadwal tersedia saat ini.</p>
          </div>
        )}
      </AnimatedSection>
    </div>
  );
}
