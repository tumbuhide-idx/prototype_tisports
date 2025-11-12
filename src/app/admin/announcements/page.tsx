
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Megaphone, PlusCircle, BellRing, Info } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const pastAnnouncements = [
    {
        id: "ANN001",
        title: "Mini Tournament Kemerdekaan",
        date: "2024-08-01",
        status: "Sent"
    },
    {
        id: "ANN002",
        title: "Jadwal Agustus Telah Rilis",
        date: "2024-07-25",
        status: "Sent"
    }
]

export default function AnnouncementsPage() {
  return (
    <div className="space-y-8">
      <AnimatedSection as="header">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 className="font-headline text-3xl md:text-4xl font-bold">
                    Pengumuman
                </h1>
                <p className="text-text-muted mt-2">
                    Buat dan siarkan pesan ke semua pengguna.
                </p>
            </div>
            <Button className="w-full sm:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                Buat Pengumuman
            </Button>
        </div>
      </AnimatedSection>

      <Card>
        <CardHeader>
          <CardTitle>Pengumuman Baru</CardTitle>
          <CardDescription>
            Pesan ini akan ditampilkan kepada pengguna di dalam aplikasi.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="announcement-title">Judul</Label>
                <Input id="announcement-title" placeholder="cth. Pemberitahuan Maintenance" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="announcement-message">Pesan</Label>
                <Textarea id="announcement-message" placeholder="Jelaskan isi pengumuman..." />
            </div>
            <Button>
                <Megaphone className="mr-2 h-4 w-4" />
                Siarkan Sekarang
            </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Riwayat</CardTitle>
           <CardDescription>Pengumuman yang telah dikirim ke pengguna.</CardDescription>
        </CardHeader>
        <CardContent>
          {pastAnnouncements.length > 0 ? (
            <div className="w-full overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Judul</TableHead>
                            <TableHead>Tanggal Kirim</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pastAnnouncements.map(ann => (
                            <TableRow key={ann.id}>
                                <TableCell className="font-medium">{ann.title}</TableCell>
                                <TableCell>{ann.date}</TableCell>
                                <TableCell><span className="text-green-600 font-semibold flex items-center gap-2"><BellRing className="h-4 w-4" /> Terkirim</span></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
          ) : (
             <div className="text-center py-12 bg-muted rounded-lg flex flex-col items-center gap-4">
                <Info className="h-10 w-10 text-text-muted" />
                <div>
                    <p className="font-semibold">Belum Ada Pengumuman</p>
                    <p className="text-text-muted text-sm">Buat pengumuman pertama Anda untuk melihat riwayat di sini.</p>
                </div>
           </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}

    