'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { ArrowLeft, Calendar, Clock, MapPin, Users, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

// This is a placeholder page.
// In a real app, you would fetch the specific order details based on the ID.

export default function PesananDetailPage() {
  const params = useParams<{ id: string }>();
  const isMembership = params.id.startsWith('MEM');

  return (
    <AnimatedSection>
      <div className="space-y-4">
        <Button asChild variant="ghost">
          <Link href="/dashboard/pesanan">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Semua Pesanan
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">
              {isMembership ? 'Detail Membership' : 'Detail Pesanan Event'}
            </CardTitle>
            <CardDescription>ID Pesanan: {params.id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className="space-y-3">
                <div className="flex items-center gap-3"><Calendar className="h-5 w-5 text-primary" /><p>5 November 2025</p></div>
                <div className="flex items-center gap-3"><Clock className="h-5 w-5 text-primary" /><p>19:00 - 21:00 WIB</p></div>
                <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-primary" /><p>GOR Cendekia</p></div>
            </div>

            {isMembership && (
                 <Card className="bg-surface-alt">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Progres Sesi Membership</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="font-bold text-xl">2 / 4 Sesi Terpakai</p>
                        <ul className="list-disc list-inside text-text-muted pl-1">
                            <li>Sesi 1 (5 Nov): Selesai</li>
                            <li>Sesi 2 (12 Nov): Selesai</li>
                            <li>Sesi 3 (19 Nov): Akan Datang</li>
                            <li>Sesi 4 (26 Nov): Akan Datang</li>
                        </ul>
                    </CardContent>
                </Card>
            )}

            <Card className="bg-surface-alt">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Peserta Terdaftar</CardTitle>
                </CardHeader>
                <CardContent>
                     <div className="flex items-start gap-3"><Users className="h-5 w-5 text-primary mt-1" />
                        <div>
                             <p className="font-medium">Andi Pratama</p>
                             <p className="text-sm text-text-muted">andi.pratama@example.com</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

             <Card className="bg-destructive/10 border-destructive/50">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center gap-2"><HelpCircle /> Butuh Bantuan?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                     <p className="text-sm text-text-muted">Jika Anda memiliki pertanyaan atau masalah dengan pesanan ini, jangan ragu untuk menghubungi admin.</p>
                     <Button variant="destructive">Hubungi Admin</Button>
                </CardContent>
            </Card>
            
          </CardContent>
        </Card>
      </div>
    </AnimatedSection>
  );
}