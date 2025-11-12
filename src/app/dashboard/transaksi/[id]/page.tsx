'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { ArrowLeft, FileText, Download, Upload } from 'lucide-react';
import Link from 'next/link';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { formatCurrency } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import React from 'react';

// This is a placeholder page.
// In a real app, you would fetch the specific transaction details based on the ID.

const transaction = {
    id: 'TXN003',
    name: 'Weekend Smash',
    date: '2025-11-08',
    status: 'REVIEW',
    amount: 95000,
    method: 'Transfer Manual',
    items: [
        { name: 'Tiket Event: Weekend Smash', qty: 1, price: 90000 },
        { name: 'Biaya Platform', qty: 1, price: 5000 },
    ]
};


export default function TransaksiDetailPage() {
  const params = useParams<{ id: string }>();
  
  return (
    <AnimatedSection>
      <div className="space-y-4">
        <Button asChild variant="ghost">
          <Link href="/dashboard/transaksi">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Semua Transaksi
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="font-headline text-2xl">
                    Detail Transaksi
                    </CardTitle>
                    <CardDescription>ID: {params.id}</CardDescription>
                </div>
                <StatusBadge status={transaction.status as any} />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                        <p className="text-text-muted">Tanggal</p>
                        <p className="font-semibold">{transaction.date}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-text-muted">Metode</p>
                        <p className="font-semibold">{transaction.method}</p>
                    </div>
                </div>

                <Card className="bg-surface-alt">
                    <CardHeader>
                        <CardTitle className="text-lg">Rincian Tagihan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {transaction.items.map(item => (
                            <div key={item.name} className="flex justify-between text-sm">
                                <p>{item.name}</p>
                                <p>{formatCurrency(item.price)}</p>
                            </div>
                        ))}
                        <Separator className="my-2" />
                        <div className="flex justify-between font-bold text-base">
                            <p>Total</p>
                            <p>{formatCurrency(transaction.amount)}</p>
                        </div>
                    </CardContent>
                </Card>

                 {transaction.status === 'REVIEW' && (
                     <Card className="bg-surface-alt">
                        <CardHeader>
                            <CardTitle className="text-lg">Bukti Pembayaran</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="p-4 border rounded-lg flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <FileText className="h-6 w-6 text-primary" />
                                    <div>
                                        <p className="font-semibold">bukti-transfer.jpg</p>
                                        <p className="text-sm text-text-muted">Uploaded on 8 Nov 2025</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon"><Download className="h-5 w-5" /></Button>
                           </div>
                           <Button variant="outline" className="w-full"><Upload className="mr-2 h-4 w-4"/> Upload Ulang Bukti</Button>
                        </CardContent>
                    </Card>
                 )}

          </CardContent>
        </Card>
      </div>
    </AnimatedSection>
  );
}