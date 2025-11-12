
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Download, Calendar, Users, Ticket, DollarSign } from 'lucide-react';
import { DateRangePicker } from '@/components/admin/DateRangePicker';

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <AnimatedSection as="header">
        <h1 className="font-headline text-3xl md:text-4xl font-bold">
          Laporan & Analitik
        </h1>
        <p className="text-text-muted mt-2">
          Hasilkan dan unduh laporan untuk event, transaksi, dan pengguna.
        </p>
      </AnimatedSection>

      <Card>
        <CardHeader>
          <CardTitle>Buat Laporan</CardTitle>
          <CardDescription>
            Pilih rentang tanggal dan jenis laporan untuk menghasilkan file CSV yang dapat diunduh.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="grid gap-2 flex-1">
                    <DateRangePicker />
                </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-4 text-left justify-start">
                    <div className="flex flex-col items-start w-full">
                         <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-5 w-5 text-primary" />
                            <p className="font-semibold">Laporan Transaksi</p>
                        </div>
                        <p className="font-normal text-text-muted text-sm mb-4">CSV dari semua transaksi finansial dalam rentang tanggal yang dipilih.</p>
                        <Download className="h-4 w-4" />
                    </div>
                </Button>
                <Button variant="outline" className="h-auto py-4 text-left justify-start">
                    <div className="flex flex-col items-start w-full">
                        <div className="flex items-center gap-2 mb-2">
                            <Ticket className="h-5 w-5 text-primary" />
                            <p className="font-semibold">Laporan Booking</p>
                        </div>
                        <p className="font-normal text-text-muted text-sm mb-4">CSV dari semua booking event dalam rentang tanggal yang dipilih.</p>
                        <Download className="h-4 w-4" />
                    </div>
                </Button>
                 <Button variant="outline" className="h-auto py-4 text-left justify-start">
                    <div className="flex flex-col items-start w-full">
                        <div className="flex items-center gap-2 mb-2">
                            <Users className="h-5 w-5 text-primary" />
                            <p className="font-semibold">Laporan Pengguna</p>
                        </div>
                        <p className="font-normal text-text-muted text-sm mb-4">CSV dari semua pengguna terdaftar dan aktivitas mereka.</p>
                        <Download className="h-4 w-4" />
                    </div>
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
