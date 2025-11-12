

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Check, Star, Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const activeMembership = {
  batchName: 'Membership Aktif: Batch 1 (Nov 2025)',
  progressUsed: 2,
  progressTotal: 4,
  period: '1–30 Nov 2025',
  nextSession: '12 Nov, GOR Cendekia',
};

const upcomingBatches = [
  {
    name: 'Batch 2 - Desember 2025',
    slotsFilled: 24,
    slotsTotal: 36,
    status: 'Dibuka',
  },
  {
    name: 'Batch 3 - Januari 2026',
    slotsFilled: 0,
    slotsTotal: 36,
    status: 'Segera Hadir',
  },
];

export default function MembershipPage() {
  return (
    <AnimatedSection>
      <div className="space-y-8">
        <header>
          <h1 className="font-headline text-3xl md:text-4xl font-bold">Membership TI Sport</h1>
          <p className="text-text-muted mt-2 max-w-2xl">
            Tingkatkan permainanmu. Dapatkan keuntungan eksklusif, kumpulkan poin lebih cepat, dan dapatkan akses prioritas.
          </p>
        </header>
        
        <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
                <Card className="bg-gradient-to-tr from-secondary/10 to-accent/10 border-secondary">
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">{activeMembership.batchName}</CardTitle>
                        <CardDescription>{activeMembership.period}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-2'>
                            <p className='text-sm font-medium'>Progres Sesi</p>
                            <Progress value={(activeMembership.progressUsed / activeMembership.progressTotal) * 100} className='h-3' />
                            <p className='text-lg font-bold'>{activeMembership.progressUsed} / {activeMembership.progressTotal} <span className='text-sm text-muted-foreground font-normal'>sesi digunakan</span></p>
                        </div>
                        <div className="flex items-center gap-3 mt-4 text-sm bg-background/50 p-3 rounded-lg">
                            <Calendar className="h-5 w-5 text-primary" />
                            <div>
                                <p className="text-muted-foreground">Sesi Berikutnya</p>
                                <p className="font-semibold">{activeMembership.nextSession}</p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="secondary">Lihat Detail Batch</Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="lg:col-span-1 space-y-4">
                 <h2 className="font-headline text-2xl font-bold">Batch Berikutnya</h2>
                 {upcomingBatches.map(batch => (
                    <Card key={batch.name}>
                        <CardHeader>
                            <CardTitle className="font-headline text-lg">{batch.name}</CardTitle>
                             <div className='flex items-center justify-between'>
                                <CardDescription>{batch.slotsFilled} / {batch.slotsTotal} terisi</CardDescription>
                                <Badge variant={batch.status === 'Dibuka' ? 'default' : 'outline'}>{batch.status}</Badge>
                            </div>
                        </CardHeader>
                        <CardFooter>
                            <Button className='w-full' disabled={batch.status !== 'Dibuka'}>Daftar</Button>
                        </CardFooter>
                    </Card>
                 ))}
            </div>
        </div>

      </div>
    </AnimatedSection>
  );
}
