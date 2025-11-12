
'use client';
import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  Search,
  Calendar,
  Users,
  Ticket,
} from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Input } from '@/components/ui/input';
import { ResponsiveTable } from '@/components/ui/responsive-table'; // Import ResponsiveTable
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const bookingData = [
  {
    id: 'BK001',
    user: 'Andi Pratama',
    event: 'Badminton Night',
    status: 'PAID',
    date: '2024-07-28',
    paymentMethod: 'QRIS',
  },
  {
    id: 'BK002',
    user: 'Budi Santoso',
    event: 'Weekend Smash',
    status: 'PAID',
    date: '2024-07-27',
    paymentMethod: 'BCA VA',
  },
  {
    id: 'BK003',
    user: 'Citra Lestari',
    event: 'Badminton Night',
    status: 'REVIEW',
    date: '2024-07-29',
    paymentMethod: 'Manual',
  },
  {
    id: 'BK004',
    user: 'Dewi Anggraini',
    event: 'Morning Session',
    status: 'REJECTED',
    date: '2024-07-26',
    paymentMethod: 'Manual',
  },
  {
    id: 'BK005',
    user: 'Eko Widodo',
    event: 'Badminton Night',
    status: 'PAID',
    date: '2024-07-28',
    paymentMethod: 'QRIS',
  },
];

type Booking = typeof bookingData[0];

export default function BookingsPage() {
  const columns: {
    key: keyof Booking;
    label: string;
    render?: (value: any, item: Booking) => React.ReactNode;
  }[] = [
    {
      key: 'user',
      label: 'User',
      render: (value, booking) => (
        <div>
          <div className="font-medium">{booking.user}</div>
          <div className="text-sm text-text-muted">
            {booking.id}
          </div>
        </div>
      ),
    },
    {
      key: 'event',
      label: 'Event',
      render: (value, booking) => booking.event,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value, booking) => <StatusBadge status={booking.status} />,
    },
    {
      key: 'date',
      label: 'Tanggal',
      render: (value, booking) => booking.date,
    },
    {
      key: 'id', // Use a valid key like 'id' for the actions column
      label: 'Aksi',
      render: (value, booking) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Buka menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem>Konfirmasi Booking</DropdownMenuItem>
            <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Batalkan Booking
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const mobileCardRender = (booking: (typeof bookingData)[0]) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-semibold">{booking.user}</span>
        <StatusBadge status={booking.status} />
      </div>
      <div className="text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Ticket className="h-3 w-3" /> {booking.event}
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" /> {booking.date}
        </div>
      </div>
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Buka menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem>Konfirmasi Booking</DropdownMenuItem>
            <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Batalkan Booking
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <AnimatedSection as="header">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 className="font-headline text-3xl md:text-4xl font-bold">
                Manajemen Booking
                </h1>
                <p className="text-text-muted mt-2">
                Lihat dan kelola semua booking dan slot peserta.
                </p>
            </div>
            <div className="flex w-full sm:w-auto items-center gap-2">
                 <Button variant="outline">
                    <File className="mr-2 h-4 w-4" />
                    Ekspor
                </Button>
                <Button className="w-full sm:w-auto">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Tambah Booking
                </Button>
            </div>
        </div>
      </AnimatedSection>

      <Card>
        <CardHeader>
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                    <Input placeholder="Cari user, event, atau ID booking..." className="pl-9" />
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
                    <DropdownMenuCheckboxItem checked>
                        Lunas
                    </DropdownMenuCheckboxItem>
                     <DropdownMenuCheckboxItem>
                        Review
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                        Ditolak
                    </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
            </div>
        </CardHeader>
        <CardContent className="p-0"> {/* Remove padding from CardContent */}
          <ResponsiveTable
            data={bookingData}
            columns={columns}
            mobileCardRender={mobileCardRender}
          />
        </CardContent>
      </Card>
    </div>
  );
}
