

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Star, Gift, Ticket, History, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const rewards = [
    { title: 'Voucher Diskon Rp 25.000', points: 500, category: 'Voucher' },
    { title: 'T-Shirt Gratis TI Sport', points: 2000, category: 'Merchandise' },
    { title: '1 Tiket Event Gratis', points: 3000, category: 'Tiket' },
    { title: 'Jersey Eksklusif Member', points: 5000, category: 'Merchandise' },
];

const pointHistory = [
    { date: '05 Nov 2025', activity: 'Booking: Fun Match', points: '+50' },
    { date: '01 Nov 2025', activity: 'Registrasi Membership', points: '+250' },
    { date: '29 Okt 2025', activity: 'Booking: Weekend Smash', points: '+75' },
];

export default function RewardsPage() {
  const userPoints = 1250;
  const nextTierPoints = 2000;
  const currentTierName = "Silver";
  const nextTierName = "Gold";

  return (
    <AnimatedSection>
        <div className="space-y-8">
            <header>
                <h1 className="font-headline text-3xl md:text-4xl font-bold">Poin & Hadiah</h1>
                <p className="text-text-muted mt-1">Tukarkan poin Anda dengan hadiah eksklusif.</p>
            </header>

            <div className='grid lg:grid-cols-3 gap-8 items-start'>
                <div className='lg:col-span-1 space-y-4'>
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-lg">Tier Anda</CardTitle>
                        </CardHeader>
                         <CardContent>
                             <div className="flex items-center gap-3">
                                <Badge variant="secondary" className="text-base px-3 py-1">
                                    <Star className="mr-2 h-4 w-4" />
                                    {currentTierName}
                                </Badge>
                                <p className="text-sm text-muted-foreground">→ {nextTierName}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-tr from-yellow-400 to-amber-500 text-white dark:from-yellow-500 dark:to-amber-600">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl text-white/80">Saldo Poin Anda</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-5xl font-bold">{userPoints.toLocaleString()}</p>
                            <div className="mt-4 space-y-2">
                                <Progress value={(userPoints / nextTierPoints) * 100} className="h-2 bg-white/20 [&>div]:bg-white" />
                                <p className="text-sm text-white/80">
                                    {nextTierPoints - userPoints} poin lagi untuk mencapai {nextTierName}!
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Button variant="outline" className="w-full">
                        <History className="mr-2 h-4 w-4" /> Lihat Riwayat Poin
                    </Button>
                </div>
                 <div className='lg:col-span-2'>
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">Katalog Hadiah</CardTitle>
                            <CardDescription>Gunakan poin Anda untuk klaim hadiah ini.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid sm:grid-cols-2 gap-6">
                            {rewards.map(reward => (
                                <Card key={reward.title} className="flex flex-col">
                                    <CardHeader>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Gift className="h-5 w-5 text-text-muted" />
                                            <p className="text-sm text-text-muted">{reward.category}</p>
                                        </div>
                                        <CardTitle className="font-headline text-lg">{reward.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow flex items-end justify-between">
                                        <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400 flex items-center gap-1.5"><Star className="h-5 w-5" /> {reward.points}</p>
                                        <Button disabled={userPoints < reward.points}>Tukar</Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Riwayat Poin</CardTitle>
                    <CardDescription>Catatan perolehan poin Anda.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="w-full overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead>Aktivitas</TableHead>
                                    <TableHead className="text-right">Poin</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pointHistory.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.date}</TableCell>
                                        <TableCell className="font-medium">{item.activity}</TableCell>
                                        <TableCell className="text-right font-bold text-success">{item.points}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AnimatedSection>
  );
}
