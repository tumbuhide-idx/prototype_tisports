import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

export default function VenuePage() {
  return (
    <div className="bg-background-soft">
      <section className="w-full bg-surface">
        <div className="container py-16 md:py-24 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Partnership Venue</h1>
          <p className="mt-4 max-w-3xl mx-auto text-text-muted md:text-lg [text-wrap:balance]">
            Jadikan venue Anda pusat aktivitas komunitas olahraga yang dinamis dan dapatkan eksposur maksimal.
          </p>
        </div>
      </section>

       <section className="container py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Keuntungan untuk Venue</h2>
        </div>
        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center bg-surface-alt">
                <CardHeader>
                    <CardTitle className="font-headline">Eksposur Digital</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-text-muted">Logo dan nama venue Anda akan tampil di semua materi promosi digital kami, menjangkau ribuan audiens.</p>
                </CardContent>
            </Card>
            <Card className="text-center bg-surface-alt">
                <CardHeader>
                    <CardTitle className="font-headline">Traffic Reguler</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-text-muted">Dapatkan traffic pemain reguler dari komunitas kami setiap minggunya, mengisi slot-slot kosong Anda.</p>
                </CardContent>
            </Card>
            <Card className="text-center bg-surface-alt">
                <CardHeader>
                    <CardTitle className="font-headline">Konten Profesional</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-text-muted">Venue Anda akan menjadi latar untuk dokumentasi foto dan video sinematik yang bisa Anda gunakan kembali.</p>
                </CardContent>
            </Card>
        </div>
         <div className="text-center mt-16">
            <h3 className="font-headline text-2xl font-bold">Siap Berkolaborasi?</h3>
            <p className="mt-2 text-text-muted">Mari kita ciptakan hubungan strategis yang saling menguntungkan.</p>
            <Button asChild size="lg" className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/contact">Daftarkan Venue Anda</Link>
            </Button>
         </div>
      </section>
    </div>
  );
}
