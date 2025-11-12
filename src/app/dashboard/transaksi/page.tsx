
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

const transactionHistory = [
    { id: 'TXN001', name: 'Membership Batch 1', date: '2025-11-01', status: 'PAID', amount: 450000, method: 'Midtrans' },
    { id: 'TXN002', name: 'Fun Match Rabu Malam', date: '2025-11-05', status: 'PAID', amount: 95000, method: 'Midtrans' },
    { id: 'TXN003', name: 'Weekend Smash', date: '2025-11-08', status: 'REVIEW', amount: 95000, method: 'Transfer Manual' },
    { id: 'TXN004', name: 'Sesi Latihan', date: '2025-10-20', status: 'REJECTED', amount: 75000, method: 'Transfer Manual' },
];

const TransactionCard = ({ trx }: { trx: typeof transactionHistory[0] }) => (
    <Card className="bg-surface">
        <CardContent className="p-4 grid grid-cols-3 sm:grid-cols-5 items-center gap-4">
            <div className="col-span-2 sm:col-span-3 space-y-1">
                <p className="font-semibold">{trx.name}</p>
                <p className="text-sm text-text-muted">{trx.date} • ID: {trx.id}</p>
            </div>
            <div className="text-right space-y-1 sm:col-span-2">
                <p className="font-bold text-base sm:text-lg">{formatCurrency(trx.amount)}</p>
                <div className='flex justify-end gap-2 items-center'>
                    <p className="text-xs text-text-muted hidden sm:inline-block">{trx.method}</p>
                    <StatusBadge status={trx.status as any} />
                </div>
            </div>
        </CardContent>
         <CardFooter className="p-4 pt-0">
             <Button asChild variant="outline" size="sm" className="w-full sm:w-auto ml-auto">
                <Link href={`/dashboard/transaksi/${trx.id}`}>Detail</Link>
            </Button>
        </CardFooter>
    </Card>
);

export default function TransaksiPage() {
    const [filter, setFilter] = useState('semua');
    
    const filteredTransactions = transactionHistory.filter(trx => {
        if (filter === 'semua') return true;
        if (filter === 'lunas') return trx.status === 'PAID';
        if (filter === 'pending') return trx.status === 'REVIEW';
        if (filter === 'dibatalkan') return trx.status === 'REJECTED';
        return false;
    });

  return (
    <AnimatedSection>
        <div className="space-y-8">
            <header>
                <h1 className="font-headline text-3xl md:text-4xl font-bold">Riwayat Transaksi</h1>
                <p className="text-text-muted mt-1">Tinjau semua aktivitas pembayaran Anda.</p>
            </header>
            
            <Card>
                <CardHeader>
                     <Tabs defaultValue="semua" onValueChange={setFilter} className="w-full overflow-x-auto">
                        <TabsList>
                            <TabsTrigger value="semua">Semua</TabsTrigger>
                            <TabsTrigger value="lunas">Lunas</TabsTrigger>
                            <TabsTrigger value="pending">Pending</TabsTrigger>
                            <TabsTrigger value="dibatalkan">Dibatalkan</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </CardHeader>
                <CardContent className="space-y-4">
                    {filteredTransactions.length > 0 ? (
                        filteredTransactions.map(trx => <TransactionCard key={trx.id} trx={trx} />)
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-text-muted">Tidak ada transaksi yang cocok dengan filter ini.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    </AnimatedSection>
  );
}
