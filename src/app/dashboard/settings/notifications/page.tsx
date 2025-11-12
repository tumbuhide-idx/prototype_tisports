
'use client';

import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';


const notificationSettings = [
    { id: "new-event", label: "Event & Jadwal Baru", description: "Saat event atau jadwal baru dipublikasikan.", defaultChecked: true },
    { id: "event-reminder", label: "Pengingat Event", description: "Satu hari sebelum event yang Anda ikuti.", defaultChecked: true },
    { id: "booking-update", label: "Update Pesanan", description: "Konfirmasi atau perubahan status pada pesanan Anda.", defaultChecked: true },
    { id: "points-update", label: "Poin & Hadiah", description: "Saat Anda mendapatkan poin atau hadiah baru tersedia.", defaultChecked: true },
    { id: "membership-update", label: "Update Membership", description: "Info tentang batch baru atau sisa sesi Anda.", defaultChecked: false },
]

export default function NotificationSettingsPage() {
    const { toast } = useToast();

    const handleSaveChanges = () => {
        toast({
            title: 'Berhasil!',
            description: 'Pengaturan notifikasi Anda telah disimpan.',
        })
    }

  return (
    <AnimatedSection>
      <Card>
        <CardHeader>
          <CardTitle>Notifikasi</CardTitle>
          <CardDescription>
            Pilih notifikasi yang ingin Anda terima melalui email atau push notification.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-4">
                {notificationSettings.map(setting => (
                    <div key={setting.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <Label htmlFor={setting.id} className="font-medium">
                            {setting.label}
                            </Label>
                            <p className="text-sm text-text-muted">
                            {setting.description}
                            </p>
                        </div>
                        <Switch id={setting.id} defaultChecked={setting.defaultChecked} />
                    </div>
                ))}
            </div>
            <Button onClick={handleSaveChanges}>Simpan Pengaturan</Button>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}
