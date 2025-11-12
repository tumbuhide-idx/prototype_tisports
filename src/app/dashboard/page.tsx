
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { ArrowRight, Ticket, CalendarCheck, Award, Users, Trophy } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const user = {
  name: "Andi Pratama",
};

const overviewStats = [
    { title: "Total Event Bulan Ini", value: "2" },
    { title: "Total Poin", value: "1.250" },
    { title: "Status Tier", value: "Silver", subvalue: "2 / 4 sesi terpakai" },
];

const nextEvent = {
    title: "Fun Match Rabu Malam",
    date: "5 Nov 2025, 19:00 WIB",
    countdown: "2 hari lagi"
}

const miniLeaderboard = [
  { rank: 1, name: 'Andi "The Wall" S.', points: 1250, avatar: 'AS' },
  { rank: 2, name: 'Budi "Smash" K.', points: 1180, avatar: 'BK' },
  { rank: 3, name: 'Citra "Deceiver" A.', points: 1150, avatar: 'CA' },
];

export default function UserDashboardPage() {
  return (
    <AnimatedSection>
      <div className="space-y-8">
        <header>
            <h1 className="font-headline text-3xl md:text-4xl font-bold">Halo, {user.name.split(' ')[0]}! 👋</h1>
            <p className="text-text-muted mt-1">Selamat datang kembali. Ini ringkasan akun Anda.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {overviewStats.map(stat => (
                <Card key={stat.title}>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-text-muted">{stat.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        {stat.subvalue && <p className="text-xs text-text-muted">{stat.subvalue}</p>}
                    </CardContent>
                </Card>
            ))}
        </div>

        <div className='grid lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2 space-y-8'>
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Event Berikutnya</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className='text-lg font-semibold'>{nextEvent.title}</p>
                        <p className='text-text-muted'>{nextEvent.date}</p>
                    </CardContent>
                    <CardFooter className='flex justify-between items-center'>
                        <Badge variant="outline">{nextEvent.countdown}</Badge>
                        <Button asChild variant="ghost" size="sm">
                            <Link href="/dashboard/pesanan/EVT001">Lihat Detail <ArrowRight className='ml-2 h-4 w-4' /></Link>
                        </Button>
                    </CardFooter>
                </Card>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card className='hover:bg-muted/50 transition-colors'>
                        <CardHeader>
                            <CardTitle className='font-headline text-lg flex items-center gap-2'><Ticket /> Pesanan Saya</CardTitle>
                        </CardHeader>
                        <CardContent><p className="text-sm text-muted-foreground">Lihat dan kelola semua pesanan event dan membership Anda.</p></CardContent>
                        <CardFooter>
                            <Button asChild variant='link' className='p-0'>
                                <Link href='/dashboard/pesanan'>Lihat Pesanan</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                     <Card className='hover:bg-muted/50 transition-colors'>
                        <CardHeader>
                            <CardTitle className='font-headline text-lg flex items-center gap-2'><Award /> Poin & Hadiah</CardTitle>
                        </CardHeader>
                        <CardContent><p className="text-sm text-muted-foreground">Tukarkan poin Anda dengan hadiah eksklusif dari katalog.</p></CardContent>
                        <CardFooter>
                            <Button asChild variant='link' className='p-0'>
                                <Link href='/dashboard/rewards'>Lihat Hadiah</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            <div className='lg:col-span-1'>
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Papan Peringkat Mini</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableBody>
                                {miniLeaderboard.map((player) => (
                                    <TableRow key={player.rank}>
                                        <TableCell className='p-2 font-bold'>{player.rank}</TableCell>
                                        <TableCell className='p-2'>
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback>{player.avatar}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium text-sm">{player.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="p-2 text-right font-bold text-primary text-sm">{player.points} PTS</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>

      </div>
    </AnimatedSection>
  );
}
