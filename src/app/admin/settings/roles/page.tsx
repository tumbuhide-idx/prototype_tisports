
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
import { Trash2, Edit } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function RolesSettingsPage() {
  return (
    <AnimatedSection>
      <Card>
        <CardHeader>
          <CardTitle>Peran & Hak Akses</CardTitle>
          <CardDescription>
            Kelola peran administrator dan hak akses mereka untuk setiap bagian dasbor.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Sheet>
                <SheetTrigger asChild>
                    <Button>Tambah Peran Baru</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Buat Peran Baru</SheetTitle>
                        <SheetDescription>Tentukan izin untuk peran admin baru.</SheetDescription>
                    </SheetHeader>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="role-name">Nama Peran</Label>
                            <Input id="role-name" placeholder="cth. Editor Konten" />
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Admin Event</h4>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-text-muted">
              Dapat membuat, mengedit, dan mengelola event dan booking.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Admin Keuangan</h4>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-text-muted">
              Dapat melihat transaksi, menghasilkan laporan keuangan, dan mengelola pembayaran.
            </p>
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}
