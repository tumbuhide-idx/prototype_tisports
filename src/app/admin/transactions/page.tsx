
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  File,
  ListFilter,
  MoreHorizontal,
  Search,
} from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { DateRangePicker } from '@/components/admin/DateRangePicker';

const transactionsData = [
  {
    id: 'TRX001',
    user: 'Andi Pratama',
    event: 'Badminton Night',
    amount: 75000,
    status: 'PAID',
    date: '2024-07-28',
    method: 'QRIS'
  },
  {
    id: 'TRX002',
    user: 'Budi Santoso',
    event: 'Weekend Smash',
    amount: 75000,
    status: 'PAID',
    date: '2024-07-27',
    method: 'BCA VA'
  },
  {
    id: 'TRX003',
    user: 'Citra Lestari',
    event: 'Badminton Night',
    amount: 75000,
    status: 'REVIEW',
    date: '2024-07-29',
    method: 'Manual'
  },
  {
    id: 'TRX004',
    user: 'Dewi Anggraini',
    event: 'Morning Session',
    amount: 50000,
    status: 'REJECTED',
    date: '2024-07-26',
    method: 'Manual'
  },
  {
    id: 'TRX005',
    user: 'Eko Widodo',
    event: 'Badminton Night',
    amount: 75000,
    status: 'PAID',
    date: '2024-07-28',
    method: 'QRIS'
  },
];

export default function TransactionsPage() {
  return (
    <div className="space-y-8">
      <AnimatedSection as="header">
        <h1 className="font-headline text-3xl md:text-4xl font-bold">
          Transaksi
        </h1>
        <p className="text-text-muted mt-2">
          Lihat dan kelola semua transaksi pengguna dan data keuangan.
        </p>
      </AnimatedSection>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <Input placeholder="Cari user, event, atau ID transaksi..." className="pl-9" />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-1 w-full sm:w-auto">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>Lunas</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Review</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Ditolak</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" className="gap-1 w-full sm:w-auto">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Ekspor
                </span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
            <div className="w-full overflow-x-auto">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Pengguna</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead className="text-right">Jumlah</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {transactionsData.map((trx) => (
                        <TableRow key={trx.id}>
                        <TableCell>
                            <div className="font-medium">{trx.user}</div>
                            <div className="text-sm text-text-muted">
                            {trx.id}
                            </div>
                        </TableCell>
                        <TableCell>
                            {trx.event}
                        </TableCell>
                        <TableCell>
                            <StatusBadge status={trx.status as any} />
                        </TableCell>
                        <TableCell>
                            {trx.date}
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="font-medium">{formatCurrency(trx.amount)}</div>
                            <div className="text-sm text-text-muted">{trx.method}</div>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
