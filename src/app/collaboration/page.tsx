import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

export default function CollaborationPage() {
  return (
    <div className="bg-background-soft">
      <AnimatedSection as="div" className="w-full bg-surface">
        <div className="container py-16 md:py-24 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Kolaborasi Komunitas</h1>
          <p className="mt-4 max-w-3xl mx-auto text-text-muted md:text-lg [text-wrap:balance]">
            Perkuat ekosistem, perluas audiens, dan ciptakan nilai baru dengan berkolaborasi bersama TI Sport.
          </p>
        </div>
      </AnimatedSection>

      <section className="container py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Bentuk Kolaborasi</h2>
        </div>
        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-surface-alt">
                <CardHeader><CardTitle className="font-headline text-xl">Co-Event</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-text-muted">Adakan turnamen, fun games, atau workshop bersama.</p></CardContent>
            </Card>
             <Card className="bg-surface-alt">
                <CardHeader><CardTitle className="font-headline text-xl">Co-Content</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-text-muted">Produksi konten video, campaign, atau challenge bersama.</p></CardContent>
            </Card>
             <Card className="bg-surface-alt">
                <CardHeader><CardTitle className="font-headline text-xl">Community Exchange</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-text-muted">Saling undang anggota komunitas untuk cross-promotion.</p></CardContent>
            </Card>
             <Card className="bg-surface-alt">
                <CardHeader><CardTitle className="font-headline text-xl">CSR</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-text-muted">Gagas kegiatan sosial atau charity untuk dampak lebih luas.</p></CardContent>
            </Card>
        </div>
         <div className="text-center mt-16">
            <h3 className="font-headline text-2xl font-bold">Punya Ide Lain?</h3>
            <p className="mt-2 text-text-muted">Kami terbuka untuk segala bentuk kolaborasi kreatif.</p>
            <Button asChild size="lg" className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/contact">Mulai Diskusi</Link>
            </Button>
         </div>
      </section>
    </div>
  );
}
