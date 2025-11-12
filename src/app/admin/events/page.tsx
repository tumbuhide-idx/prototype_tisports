
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
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  PlusCircle,
  MoreHorizontal,
  Search,
  Edit,
  Trash,
  File,
  Calendar, // Added Calendar import
  Users,    // Added Users import
} from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Input } from '@/components/ui/input';
import eventsData from '@/../public/data/events.json';
import type { Event } from '@/lib/types';
import { formatShortDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ResponsiveTable } from '@/components/ui/responsive-table'; // Import ResponsiveTable

const events: Event[] = eventsData;

export default function EventsPage() {
  const columns: {
    key: keyof Event;
    label: string;
    render?: (value: any, item: Event) => React.ReactNode;
  }[] = [
    {
      key: 'title',
      label: 'Event',
      render: (value, event) => (
        <div>
          <div className="font-medium">{event.title}</div>
          <div className="text-sm text-text-muted">
            {formatShortDate(event.startsAt)}
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value, event) => <StatusBadge status={event.status} />,
    },
    {
      key: 'category',
      label: 'Kategori',
      render: (value, event) => <Badge variant="secondary">{event.category}</Badge>,
    },
    {
      key: 'participantsMasked',
      label: 'Peserta',
      render: (value, event) => `${event.participantsMasked.length} / ${event.capacity}`,
    },
    {
      key: 'id', // Changed 'actions' to 'id'
      label: 'Aksi',
      render: (value, event) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Buka menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash className="mr-2 h-4 w-4" /> Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const mobileCardRender = (event: Event) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-semibold">{event.title}</span>
        <StatusBadge status={event.status} />
      </div>
      <div className="text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" /> {formatShortDate(event.startsAt)}
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3" /> {event.participantsMasked.length} / {event.capacity} Peserta
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
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash className="mr-2 h-4 w-4" /> Hapus
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
                    Manajemen Event
                </h1>
                <p className="text-text-muted mt-2">
                    Buat, lihat, dan kelola semua event olahraga.
                </p>
            </div>
            <div className='flex items-center gap-2 w-full sm:w-auto'>
                <Button variant="outline">
                    <File className="mr-2 h-4 w-4" />
                    Ekspor
                </Button>
                <Button className="w-full sm:w-auto">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Buat Event Baru
                </Button>
            </div>
        </div>
      </AnimatedSection>
      <Card>
        <CardHeader>
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <Input placeholder="Cari nama event..." className="pl-9" />
          </div>
        </CardHeader>
        <CardContent className="p-0"> {/* Remove padding from CardContent */}
          <ResponsiveTable
            data={events}
            columns={columns}
            mobileCardRender={mobileCardRender}
          />
        </CardContent>
      </Card>
    </div>
  );
}
