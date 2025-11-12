
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
import { Switch } from '@/components/ui/switch';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { useToast } from '@/hooks/use-toast';

export default function GeneralAdminSettingsPage() {
  const { toast } = useToast();

  const handleSaveChanges = () => {
    toast({
      title: 'Pengaturan Disimpan',
      description: 'Pengaturan umum telah berhasil diperbarui.',
    });
  };

  return (
    <AnimatedSection>
        <Card>
            <CardHeader>
            <CardTitle>Pengaturan Umum</CardTitle>
            <CardDescription>
                Konfigurasi pengaturan umum untuk seluruh aplikasi.
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="siteName">Nama Situs</Label>
                <Input id="siteName" defaultValue="TI Sport" />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                <Label htmlFor="maintenance-mode" className="font-medium">
                    Mode Perawatan
                </Label>
                <p className="text-sm text-text-muted">
                    Nonaktifkan sementara akses publik ke situs.
                </p>
                </div>
                <Switch id="maintenance-mode" />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                <Label htmlFor="new-registrations" className="font-medium">
                    Izinkan Pendaftaran Baru
                </Label>
                <p className="text-sm text-text-muted">
                    Aktifkan atau nonaktifkan fungsi pendaftaran pengguna.
                </p>
                </div>
                <Switch id="new-registrations" defaultChecked />
            </div>
            <Button onClick={handleSaveChanges}>Simpan Pengaturan</Button>
            </CardContent>
        </Card>
    </AnimatedSection>
  );
}
