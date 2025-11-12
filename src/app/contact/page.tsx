import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

export default function ContactPage() {
  return (
    <div className="bg-background-soft">
      <AnimatedSection as="div" className="w-full bg-surface">
        <div className="container py-16 md:py-24 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Hubungi Kami</h1>
          <p className="mt-4 max-w-3xl mx-auto text-text-muted md:text-lg [text-wrap:balance]">
            Punya pertanyaan, ide kolaborasi, atau ingin bergabung? Kami siap mendengarkan.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection as="div" className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
                <div>
                    <h2 className="font-headline text-2xl font-bold">Informasi Kontak</h2>
                    <p className="text-text-muted mt-2">Anda juga bisa menghubungi kami melalui channel berikut:</p>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Mail className="h-6 w-6 text-primary"/>
                        <a href="mailto:hello@tumbuhide.id" className="hover:text-primary">hello@tumbuhide.id</a>
                    </div>
                     <div className="flex items-center gap-4">
                        <Phone className="h-6 w-6 text-primary"/>
                        <a href="tel:+628123456789" className="hover:text-primary">+62 812-3456-7890</a>
                    </div>
                </div>
            </div>
            <Card className="shadow-lg bg-surface">
                <CardHeader>
                    <CardTitle className="font-headline">Kirim Pesan</CardTitle>
                    <CardDescription>Isi form di bawah dan tim kami akan segera merespon.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama</Label>
                            <Input id="name" placeholder="Nama Anda" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="email@anda.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Pesan</Label>
                            <Textarea id="message" placeholder="Tulis pesan Anda di sini..." />
                        </div>
                        <Button type="submit" className="w-full">Kirim Pesan</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
      </AnimatedSection>
    </div>
  );
}
