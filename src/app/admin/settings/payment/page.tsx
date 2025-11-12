
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
import { Banknote, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PaymentSettingsPage() {
    const { toast } = useToast();
    
    const handleSave = () => {
        toast({
            title: 'Pengaturan Disimpan',
            description: 'Metode pembayaran telah diperbarui.',
        })
    }

  return (
    <AnimatedSection>
      <Card>
        <CardHeader>
          <CardTitle>Metode Pembayaran</CardTitle>
          <CardDescription>
            Kelola metode pembayaran yang diterima untuk booking event.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Banknote className="w-5 h-5 text-text-muted" />
                <h4 className="font-medium">BCA Virtual Account</h4>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bca-va">Nomor Rekening</Label>
                <Input id="bca-va" defaultValue="1234567890" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bca-name">Nama Akun</Label>
                <Input id="bca-name" defaultValue="PT Tumbuh IDE" />
              </div>
            </div>
          </div>
          <div className="space-y-4 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <QrCode className="w-5 h-5 text-text-muted" />
                <h4 className="font-medium">QRIS</h4>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="qris-name">Nama Akun</Label>
                <Input id="qris-name" defaultValue="PT Tumbuh IDE" />
              </div>
              <div className="space-y-2">
                <Label>Gambar QRIS</Label>
                <Input type="file" />
                <p className="text-xs text-text-muted">
                  Unggah file gambar QRIS dari gateway pembayaran Anda.
                </p>
              </div>
            </div>
          </div>
          <Button onClick={handleSave}>Simpan Pengaturan</Button>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}
