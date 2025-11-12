
'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatCurrency } from '@/lib/utils';
import { Ticket, Star, Award } from 'lucide-react';
import type { Event } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface EventBookingCardProps {
  event: Event;
  id?: string;
  activeTab?: 'non-member' | 'membership';
}

export function EventBookingCard({ event, id, activeTab = 'non-member' }: EventBookingCardProps) {
  const isBookingOpen = event.status === 'OPEN' && event.participantsMasked.length < event.capacity;
  const isFull = event.participantsMasked.length >= event.capacity;

  const isMembershipView = activeTab === 'membership';
  const price = isMembershipView ? event.membershipDetails?.priceIDR : event.priceIDR;
  const priceLabel = isMembershipView ? '/bulan' : '/slot';

  const pointsToEarn = isMembershipView ? 0 : Math.floor((event.priceIDR || 0) / 25000) * 25;

  const BookingButton = () => {
    if (!isBookingOpen) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-full">
                <Button size="lg" disabled className="w-full min-h-[48px] font-bold" aria-disabled="true">
                  {isFull ? 'Penuh' : 'Ditutup'}
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isFull ? 'Maaf, event ini sudah penuh.' : 'Booking untuk event ini sudah ditutup.'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    
    return (
      <Button asChild size="lg" className="w-full min-h-[48px] font-bold">
        <Link href={`/book/${event.id}`}>
          {isMembershipView ? 'Daftar' : 'Pesan'}
        </Link>
      </Button>
    );
  };

  return (
    <Card id={id} className="sticky top-24 shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2 text-xl">
          <Ticket className="h-6 w-6" /> Harga
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className='space-y-2'>
            {price !== undefined && (
            <p className="text-3xl font-bold tracking-tight">{formatCurrency(price)}<span className="text-sm font-normal text-muted-foreground">{priceLabel}</span></p>
            )}
             {!isMembershipView && pointsToEarn > 0 && (
                <Badge variant="outline" className="border-yellow-500/50 text-yellow-600 dark:text-yellow-400 font-semibold gap-1">
                    <Award className="h-3 w-3" /> +{pointsToEarn} Poin
                </Badge>
            )}
        </div>
        <BookingButton />
      </CardContent>
    </Card>
  );
}
