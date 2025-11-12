
'use client';

import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

export default function ProfileSettingsPage() {
  const { toast } = useToast();

  const handleSaveChanges = () => {
    toast({
      title: 'Berhasil!',
      description: 'Perubahan profil Anda telah disimpan.',
    });
  };

  return (
    <AnimatedSection>
      <Card>
        <CardHeader>
          <CardTitle>Profil Akun</CardTitle>
          <CardDescription>
            Perbarui foto dan detail personal Anda.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-3xl">AP</AvatarFallback>
            </Avatar>
            <div className="flex gap-2">
              <Button variant="outline">Ubah</Button>
              <Button variant="ghost" className="text-destructive hover:text-destructive">Hapus</Button>
            </div>
          </div>
          <form className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" defaultValue="Andi Pratama" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nickname">Nama Panggilan</Label>
                <Input id="nickname" defaultValue="Andi" />
              </div>
            </div>
             <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="andi.pratama@example.com"
                    disabled
                  />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="whatsapp">Nomor WhatsApp</Label>
                  <Input id="whatsapp" defaultValue="081234567890" />
                </div>
            </div>
            <Button onClick={handleSaveChanges}>Simpan Perubahan</Button>
          </form>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}
