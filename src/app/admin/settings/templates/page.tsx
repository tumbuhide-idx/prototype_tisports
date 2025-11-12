
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function TemplatesSettingsPage() {
    const { toast } = useToast();

    const handleSave = () => {
        toast({
            title: "Template Disimpan",
            description: "Template notifikasi telah diperbarui.",
        });
    };

  return (
    <AnimatedSection>
      <Card>
        <CardHeader>
          <CardTitle>Template Notifikasi</CardTitle>
          <CardDescription>
            Edit konten untuk notifikasi email atau WhatsApp yang dikirim ke pengguna.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="template-select">Pilih Template</Label>
            <Select>
              <SelectTrigger id="template-select">
                <SelectValue placeholder="Pilih template notifikasi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="event-reminder">Pengingat Event</SelectItem>
                <SelectItem value="payment-success">Pembayaran Berhasil</SelectItem>
                <SelectItem value="points-earned">Poin Diperoleh</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="template-content">Konten Template</Label>
            <Textarea
              id="template-content"
              placeholder="Konten template akan ditampilkan di sini..."
              rows={8}
            />
            <p className="text-xs text-text-muted">
              Gunakan variabel seperti {'`{{userName}}`'} atau {'`{{eventName}}`'}.
            </p>
          </div>
          <Button onClick={handleSave}>Simpan Template</Button>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}
