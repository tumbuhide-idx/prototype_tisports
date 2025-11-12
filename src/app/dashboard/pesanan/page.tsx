
'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, CheckCircle, Hourglass, Star, Sparkles } from 'lucide-react';
import { StatusBadge } from '@/components/shared/StatusBadge';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const eventBookings = [
    { id: 'EVT001', name: 'Fun Match Rabu Malam', date: '5 Nov 2025', time: '19:00 - 21:00', venue: 'GOR Cendekia', status: 'Sudah dikonfirmasi' },
    { id: 'EVT002', name: 'Weekend Smash', date: '9 Nov 2025', time: '09:00 - 11:00', venue: 'Arena Pro', status: 'Menunggu konfirmasi' },
];

const membershipBookings = [
    { 
        id: 'MEM001', 
        name: 'Membership Batch 1',
        period: '1 Nov – 30 Nov 2025',
        progress: { used: 2, total: 4 },
        sessions: [
            { date: '5 Nov', status: 'Selesai' },
            { date: '12 Nov', status: 'Selesai' },
            { date: '19 Nov', status: 'Terjadwal' },
            { date: '26 Nov', status: 'Belum digunakan' },
        ]
    }
];

const EventCard = ({ booking }: { booking: typeof eventBookings[0] }) => (
    <Card className="bg-surface">
        <CardHeader>
            <CardTitle className="font-headline text-lg">{booking.name}</CardTitle>
            <StatusBadge status={booking.status === 'Sudah dikonfirmasi' ? 'PAID' : 'REVIEW'} className="w-fit mt-2" />
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-text-muted">
            <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {booking.date}</div>
            <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> {booking.time}</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {booking.venue}</div>
        </CardContent>
        <CardFooter>
            <Button asChild variant="secondary" size="sm">
                <Link href={`/dashboard/pesanan/${booking.id}`}>Detail</Link>
            </Button>
        </CardFooter>
    </Card>
);

const MembershipCard = ({ membership }: { membership: typeof membershipBookings[0] }) => (
     <Card className="bg-gradient-to-tr from-secondary/10 to-accent/10 border-secondary">
        <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="font-headline text-lg">{membership.name}</CardTitle>
                    <CardDescription>{membership.period}</CardDescription>
                </div>
                <Badge variant="secondary" className="gap-1.5"><Star className="h-3 w-3" /> Member</Badge>
            </div>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <p className="text-sm font-semibold mb-2">Progres Sesi</p>
                <Progress value={(membership.progress.used / membership.progress.total) * 100} className="h-2" />
                <div className="flex items-baseline gap-2 mt-1">
                    <p className="text-xl font-bold">{membership.progress.used} / {membership.progress.total} Sesi</p>
                    <p className="text-sm text-text-muted">({membership.progress.total - membership.progress.used} sesi tersisa)</p>
                </div>
            </div>
            <div className="space-y-2">
                 {membership.sessions.map((session, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm p-2 bg-background/50 rounded-md">
                        {session.status === 'Selesai' ? <CheckCircle className="h-4 w-4 text-success" /> : <Hourglass className="h-4 w-4 text-text-muted" />}
                        <span className="font-medium">Sesi {index + 1} - {session.date}</span>
                        <span className="ml-auto text-text-muted">{session.status}</span>
                    </div>
                 ))}
            </div>
        </CardContent>
        <CardFooter>
            <Button asChild variant="secondary" size="sm">
                <Link href={`/dashboard/pesanan/${membership.id}`}>Detail</Link>
            </Button>
        </CardFooter>
    </Card>
)

export default function PesananPage() {
  return (
    <AnimatedSection>
        <div className="space-y-8">
            <header>
                <h1 className="font-headline text-3xl md:text-4xl font-bold">Pesanan Saya</h1>
                <p className="text-text-muted mt-1">Lacak semua pesanan event dan membership Anda.</p>
            </header>
            
            <Tabs defaultValue="event" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-md">
                    <TabsTrigger value="event">Event</TabsTrigger>
                    <TabsTrigger value="membership">Membership</TabsTrigger>
                </TabsList>
                
                <TabsContent value="event" className="mt-6">
                    {eventBookings.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {eventBookings.map(booking => <EventCard key={booking.id} booking={booking} />)}
                        </div>
                    ) : (
                        <Card className="text-center py-12">
                            <CardContent className="space-y-4">
                                <Sparkles className="h-12 w-12 mx-auto text-text-muted" />
                                <p className="text-text-muted">Anda belum memiliki pesanan event.</p>
                                <Button asChild><Link href="/events">Cari Event</Link></Button>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>
                
                <TabsContent value="membership" className="mt-6">
                     {membershipBookings.length > 0 ? (
                        <div className="grid lg:grid-cols-2 gap-6">
                            {membershipBookings.map(mem => <MembershipCard key={mem.id} membership={mem} />)}
                        </div>
                    ) : (
                         <Card className="text-center py-12">
                            <CardContent className="space-y-4">
                                <Star className="h-12 w-12 mx-auto text-text-muted" />
                                <p className="text-text-muted">Anda belum menjadi member.</p>
                                <Button asChild><Link href="/dashboard/membership">Lihat Opsi Membership</Link></Button>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    </AnimatedSection>
  );
}
