
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
import { PlusCircle, MoreHorizontal, Search } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const usersData = [
  {
    id: 'USR001',
    name: 'Andi Pratama',
    email: 'andi.pratama@example.com',
    role: 'user',
    status: 'active',
  },
  {
    id: 'USR002',
    name: 'Budi Santoso',
    email: 'budi.santoso@example.com',
    role: 'user',
    status: 'active',
  },
  {
    id: 'USR003',
    name: 'Citra Lestari',
    email: 'citra.lestari@example.com',
    role: 'admin',
    status: 'active',
  },
  {
    id: 'USR004',
    name: 'Dewi Anggraini',
    email: 'dewi.anggraini@example.com',
    role: 'user',
    status: 'inactive',
  },
  {
    id: 'USR005',
    name: 'Eko Widodo',
    email: 'eko.widodo@example.com',
    role: 'user',
    status: 'active',
  },
];

export default function UsersPage() {
  return (
    <div className="space-y-8">
      <AnimatedSection as="header">
        <h1 className="font-headline text-3xl md:text-4xl font-bold">
          Manajemen Pengguna
        </h1>
        <p className="text-text-muted mt-2">
          Lihat, kelola, dan tambahkan pengguna ke platform.
        </p>
      </AnimatedSection>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <Input placeholder="Cari berdasarkan nama atau email..." className="pl-9" />
            </div>
            <Button className="w-full sm:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Tambah Pengguna
            </Button>
          </div>
        </CardHeader>
        <CardContent>
            <div className="w-full overflow-x-auto">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Pengguna</TableHead>
                        <TableHead>Peran</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {usersData.map((user) => (
                        <TableRow key={user.id}>
                        <TableCell>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-text-muted">
                            {user.email}
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge
                            variant={user.role === 'admin' ? 'default' : 'secondary'}
                            >
                            {user.role}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <Badge
                            variant={user.status === 'active' ? 'outline' : 'destructive'}
                            >
                            {user.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Buka menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                <DropdownMenuItem>Jadikan Admin</DropdownMenuItem>
                                <DropdownMenuItem>Nonaktifkan</DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>
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
