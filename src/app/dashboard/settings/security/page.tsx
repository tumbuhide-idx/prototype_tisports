
'use client';

import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function SecuritySettingsPage() {
  const { toast } = useToast();

  const handleUpdatePassword = () => {
    toast({
      title: 'Berhasil!',
      description: 'Password Anda telah diperbarui.',
    });
  };

  const handleLogoutAll = () => {
    toast({
        title: 'Berhasil',
        description: 'Anda telah keluar dari semua perangkat lain.',
    })
  }

  return (
    <AnimatedSection>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Keamanan & Login</CardTitle>
            <CardDescription>Kelola password dan sesi login Anda.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="max-w-md space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Password Saat Ini</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Password Baru</Label>
                <Input id="new-password" type="password" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button onClick={handleUpdatePassword} type="button">Perbarui Password</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Sesi Aktif</CardTitle>
                <CardDescription>Ini adalah daftar perangkat yang telah login ke akun Anda.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <p className='font-semibold'>Chrome di MacOS</p>
                        <p className='text-sm text-text-muted'>Perangkat ini</p>
                    </div>
                     <Button variant="link" disabled>Aktif sekarang</Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <p className='font-semibold'>Aplikasi Mobile di iPhone 15 Pro</p>
                        <p className='text-sm text-text-muted'>Aktif 2 jam lalu</p>
                    </div>
                     <Button variant="link" className="text-destructive">Keluar</Button>
                </div>
                 <Button variant="outline" onClick={handleLogoutAll}>Keluar dari Semua Perangkat Lain</Button>
            </CardContent>
        </Card>
      </div>
    </AnimatedSection>
  );
}
