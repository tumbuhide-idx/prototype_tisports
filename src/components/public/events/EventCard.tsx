import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatShortDate, formatTimeRange } from '@/lib/utils';
import type { Event } from '@/lib/types';
import { Calendar, Clock, MapPin, Star, Users, Award } from 'lucide-react';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { CapacityBar } from '@/components/public/events/CapacityBar';
import { Badge } from '@/components/ui/badge';

type EventCardProps = {
  event: Event;
};

const getEventStatus = (event: Event): 'Penuh' | 'Hampir Penuh' | 'Tersedia' | 'Ditutup' => {
    if (event.status === 'CLOSED') return 'Ditutup';
    const percentage = (event.participantsMasked.length / event.capacity) * 100;
    if (percentage >= 100) return 'Penuh';
    if (percentage >= 80) return 'Hampir Penuh';
    return 'Tersedia';
};

export function EventCard({ event }: EventCardProps) {
  const status = getEventStatus(event);
  const pointsToEarn = Math.floor((event.priceIDR || 0) / 25000) * 25;
  
  return (
    <Card className="flex flex-col h-full shadow-sm hover:shadow-xl transition-shadow duration-300 bg-surface overflow-hidden group">
        <Link href={`/e/${event.slug}`} className="relative block">
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                <StatusBadge status={status} />
                {event.isMembership && (
                     <Badge variant="secondary" className="w-fit border-0">
                        <Star className="mr-1 h-3 w-3 text-accentYellow"/>
                        Membership
                     </Badge>
                )}
            </div>
            <Badge variant="outline" className="absolute top-3 right-3 z-10 bg-black/30 text-white border-white/30 backdrop-blur-sm">{event.category}</Badge>
            <div className="aspect-[16/10] w-full overflow-hidden">
                <Image 
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint={event.imageHint}
                />
            </div>
        </Link>
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="font-headline text-xl mb-2">
            <Link href={`/e/${event.slug}`} className="hover:text-primary transition-colors">{event.title}</Link>
        </CardTitle>
        <div className="text-sm text-text-muted space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary/80" />
            <span>{formatShortDate(event.startsAt)}</span>
          </div>
           <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary/80" />
            <span>{formatTimeRange(event.startsAt, event.endsAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary/80" />
            <span>{event.venue}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 md:p-6 pt-0">
        <CapacityBar current={event.participantsMasked.length} max={event.capacity} />
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 md:p-6 pt-0">
        <div>
            <p className="font-bold text-lg">{formatCurrency(event.priceIDR)}</p>
            {!event.isMembership && pointsToEarn > 0 && (
                <Badge variant="outline" className="border-yellow-500/50 text-yellow-600 font-semibold gap-1 mt-1 dark:text-yellow-400">
                    <Award className="h-3 w-3" /> +{pointsToEarn} Poin
                </Badge>
            )}
        </div>
        <Button asChild>
          <Link href={`/e/${event.slug}`}>Detail</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
