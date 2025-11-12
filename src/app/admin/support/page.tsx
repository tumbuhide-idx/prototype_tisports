
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const supportTickets = [
    {
        id: "SUP-001",
        subject: "Problem with QRIS Payment",
        user: "Budi Santoso",
        date: "2024-07-30",
        status: "Open"
    },
    {
        id: "SUP-002",
        subject: "Cannot cancel my booking",
        user: "Dewi Anggraini",
        date: "2024-07-29",
        status: "In Progress"
    },
    {
        id: "SUP-003",
        subject: "Question about membership",
        user: "Eko Widodo",
        date: "2024-07-28",
        status: "Resolved"
    },
]

export default function SupportPage() {
  return (
    <div className="space-y-8">
      <AnimatedSection as="header">
        <h1 className="font-headline text-3xl md:text-4xl font-bold">
          Dukungan & Bantuan
        </h1>
        <p className="text-text-muted mt-2">
          Kelola feedback, tiket dukungan, dan pertanyaan dari pengguna.
        </p>
      </AnimatedSection>

      <Card>
        <CardHeader>
          <CardTitle>Tiket Dukungan Pengguna</CardTitle>
          <CardDescription>
            Daftar tiket dukungan terbaru dari pengguna.
          </CardDescription>
        </CardHeader>
        <CardContent>
           {supportTickets.length > 0 ? (
            <div className="w-full overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Subjek</TableHead>
                            <TableHead className="hidden sm:table-cell">Pengguna</TableHead>
                            <TableHead className="hidden md:table-cell">Tanggal</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {supportTickets.map(ticket => (
                            <TableRow key={ticket.id}>
                                <TableCell className="font-medium">{ticket.subject}</TableCell>
                                <TableCell className="hidden sm:table-cell">{ticket.user}</TableCell>
                                <TableCell className="hidden md:table-cell">{ticket.date}</TableCell>
                                <TableCell>
                                    <Badge variant={
                                        ticket.status === 'Open' ? 'destructive' :
                                        ticket.status === 'In Progress' ? 'secondary' :
                                        'default'
                                    }>{ticket.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>Lihat Tiket</DropdownMenuItem>
                                        <DropdownMenuItem>Tandai Selesai</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
           ) : (
            <div className="text-center py-16 bg-muted rounded-lg">
                    <p className="text-text-muted mb-2">Tidak ada tiket dukungan aktif.</p>
                    <p className="text-sm text-text-muted">Semua pertanyaan pengguna telah diselesaikan.</p>
            </div>
           )}
        </CardContent>
      </Card>

    </div>
  );
}
