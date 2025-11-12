
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Calendar, ArrowUpRight, DollarSign, Ticket, Activity } from 'lucide-react';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartConfig 
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { formatCurrency } from '@/lib/utils';
import { useEffect } from 'react';

const chartData = [
  { month: "Januari", desktop: 186, mobile: 80 },
  { month: "Februari", desktop: 305, mobile: 200 },
  { month: "Maret", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "Mei", desktop: 209, mobile: 130 },
  { month: "Juni", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--primary))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--secondary))",
  },
} satisfies ChartConfig

const recentTransactions = [
  {
    id: 'TRX001',
    user: 'Andi Pratama',
    event: 'Badminton Night',
    amount: 75000,
    status: 'PAID',
    date: '2024-07-28',
  },
  {
    id: 'TRX003',
    user: 'Citra Lestari',
    event: 'Badminton Night',
    amount: 75000,
    status: 'REVIEW',
    date: '2024-07-29',
  },
   {
    id: 'TRX005',
    user: 'Eko Widodo',
    event: 'Badminton Night',
    amount: 75000,
    status: 'PAID',
    date: '2024-07-28',
  },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
        <AnimatedSection as="header" className="">
            <h1 className="font-headline text-3xl md:text-4xl font-bold">Overview</h1>
            <p className="text-text-muted mt-2">Selamat datang kembali, Admin! Berikut ringkasan dasbor Anda.</p>
        </AnimatedSection>
        
        <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">Rp 45,2jt</div>
                    <p className="text-xs text-muted-foreground">+20.1% dari bulan lalu</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Booking</CardTitle>
                    <Ticket className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-xs text-muted-foreground">+180.1% dari bulan lalu</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Member Baru</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">+128</div>
                    <p className="text-xs text-muted-foreground">+32 dari bulan lalu</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Event Aktif</CardTitle>
                     <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                       <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">2 event baru minggu ini</p>
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Transaksi Terbaru</CardTitle>
                        <CardDescription>Ringkasan pembayaran terakhir.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead>Pengguna</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Jumlah</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentTransactions.map((trx) => (
                                    <TableRow key={trx.id}>
                                        <TableCell>
                                            <div className="font-medium">{trx.user}</div>
                                            <div className="text-sm text-text-muted">
                                                {trx.event}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge status={trx.status as any} />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {formatCurrency(trx.amount)}
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                         <Button asChild variant="outline" size="sm" className="w-full mt-4">
                            <Link href="/admin/transactions">
                                Lihat Semua Transaksi
                                <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
                {/* Chart */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Overview Booking</CardTitle>
                        <CardDescription>Januari - Juni 2024</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[240px] sm:h-[320px]">
                        <ChartContainer config={chartConfig} className="w-full h-full">
                            <BarChart accessibilityLayer data={chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <YAxis />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
       </div>
    </div>
  );
}
