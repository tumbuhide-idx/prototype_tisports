'use client';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CapacityBar } from '@/components/public/events/CapacityBar';
import { ParticipantsList } from '@/components/public/events/ParticipantsList';
import { formatTimeRange, formatShortDate, formatCurrency } from '@/lib/utils';
import { Calendar, MapPin, Ticket, Share2, Sparkles, CheckSquare, Shirt, ExternalLink, Users, Clock, Star } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Event } from '@/lib/types';
import React, { useState } from 'react';
import { EventBookingFooter } from '@/components/public/events/EventBookingFooter';
import { EventBookingCard } from '@/components/public/events/EventBookingCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Metadata } from 'next';


interface EventPageClientProps {
  event: Event;
}

export function EventPageClient({ event }: EventPageClientProps) {
  const [activeTab, setActiveTab] = useState<'non-member' | 'membership'>('non-member');
  const eventHeroImage = PlaceHolderImages.find(p => p.id === 'event-hero');
  
  return (
    <div>
      <section className="relative w-full h-64 md:h-80 bg-muted">
        {eventHeroImage && (
            <Image
                src={eventHeroImage.imageUrl}
                alt={event.title}
                fill
                className="object-cover"
                data-ai-hint={eventHeroImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </section>

      <div className="container -mt-16 md:-mt-24 pb-40 md:pb-24">
        <div className="max-w-4xl mx-auto">
            <div className="relative z-10 p-6 mb-8 bg-background/80 backdrop-blur-sm rounded-2xl shadow-xl border border-surface">
                <div className="flex items-start justify-between gap-4">
                     <h1 className="font-headline text-3xl md:text-4xl font-bold">{event.title}</h1>
                     <Button variant="ghost" size="icon" className="shrink-0">
                        <Share2 />
                        <span className="sr-only">Bagikan</span>
                    </Button>
                </div>
                 <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm font-medium">{formatShortDate(event.startsAt)}</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm font-medium">{event.venue}</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <Ticket className="h-4 w-4" />
                        <span className="text-sm font-medium">{formatCurrency(event.priceIDR)}</span>
                    </div>
                </div>
            </div>
            
            {event.isMembership && (
                <Tabs 
                    defaultValue="non-member" 
                    onValueChange={(value) => {
                        if (value === 'non-member' || value === 'membership') {
                            setActiveTab(value);
                        }
                    }} 
                    className="w-full mb-8"
                >
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="non-member">Non-Member</TabsTrigger>
                        <TabsTrigger value="membership">Membership</TabsTrigger>
                    </TabsList>
                </Tabs>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader><CardTitle className="font-headline">Jadwal &amp; Lokasi</CardTitle></CardHeader>
                        <CardContent className="space-y-4 text-base">
                             <div className="flex items-start gap-3"><Calendar className="h-5 w-5 text-primary mt-1" /><p>{formatShortDate(event.startsAt)}</p></div>
                             <div className="flex items-start gap-3"><Clock className="h-5 w-5 text-primary mt-1" /><p>{formatTimeRange(event.startsAt, event.endsAt)}</p></div>
                             <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-primary mt-1" /><p className="font-semibold">{event.venue}</p></div>
                             <div className="flex items-start gap-3"><span className="w-5 h-5"/> <p className="text-muted-foreground text-sm">{event.venueAddress}</p></div>
                            <Button asChild variant="outline" className="ml-8">
                                <a href={event.venueMapUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-2 h-4 w-4" /> Buka di Google Maps
                                </a>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Content for Non-Member and general details */}
                    { (activeTab === 'non-member' || !event.isMembership) &&
                        <>
                            <Card>
                                <CardHeader><CardTitle className="font-headline">Deskripsi Event</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="prose dark:prose-invert max-w-none text-base" dangerouslySetInnerHTML={{ __html: event.description }} />
                                </CardContent>
                            </Card>

                             <Card>
                                <CardHeader><CardTitle className="font-headline">Peserta ({event.participantsMasked.length}/{event.capacity})</CardTitle></CardHeader>
                                <CardContent>
                                <CapacityBar current={event.participantsMasked.length} max={event.capacity} />
                                <ParticipantsList participants={event.participantsMasked} />
                                </CardContent>
                            </Card>
                        </>
                    }

                    {/* Content for Membership */}
                    { activeTab === 'membership' && event.isMembership && event.membershipDetails &&
                        <>
                             <Card>
                                <CardHeader><CardTitle className="font-headline">Detail Membership</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="prose dark:prose-invert max-w-none text-base">
                                        <p>{event.membershipDetails.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader><CardTitle className="font-headline">Jadwal 4 Sesi</CardTitle></CardHeader>
                                <CardContent className="space-y-3">
                                   {event.membershipDetails.sessionDates.map((date, index) => (
                                        <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                                            <Calendar className="h-5 w-5 text-primary" />
                                            <div>
                                                <p className="font-semibold">Sesi {index + 1}</p>
                                                <p className="text-muted-foreground text-sm">{formatShortDate(date)}</p>
                                            </div>
                                        </div>
                                   ))}
                                </CardContent>
                            </Card>
                        </>
                    }
                    
                     <Card>
                        <CardHeader><CardTitle className="font-headline">Detail Tambahan</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <div className="flex items-start gap-3">
                                <Sparkles className="h-5 w-5 text-primary mt-1" />
                                <div>
                                    <p className="font-semibold">Format Acara</p>
                                    <p className="text-muted-foreground text-sm">{event.details.format}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Users className="h-5 w-5 text-primary mt-1" />
                                <div>
                                    <p className="font-semibold">Tipe Permainan</p>
                                    <p className="text-muted-foreground text-sm">{event.details.gameType.join(', ')}</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-3">
                                <CheckSquare className="h-5 w-5 text-primary mt-1" />
                                <div>
                                    <p className="font-semibold">Termasuk</p>
                                    <p className="text-muted-foreground text-sm">{event.details.includes.join(', ')}</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-3">
                                <Shirt className="h-5 w-5 text-primary mt-1" />
                                <div>
                                    <p className="font-semibold">Bawa Sendiri</p>
                                    <p className="text-muted-foreground text-sm">{event.details.bring.join(', ')}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>
                <div className="lg:col-span-1 hidden lg:block">
                    <EventBookingCard event={event} id="booking-card" activeTab={activeTab} />
                </div>
            </div>
        </div>
      </div>
      <EventBookingFooter event={event} activeTab={activeTab} />
    </div>
  );
}
