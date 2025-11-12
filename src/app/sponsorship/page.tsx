import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Check } from 'lucide-react';

export default function SponsorshipPage() {
  const tiers = [
    {
      name: 'Community Partner',
      price: 'Mulai dari 3jt',
      features: [
        'Logo placement di materi event',
        'Social media mention',
        'Product sampling/display di event',
        'Akses ke data audiens (anonim)',
      ]
    },
    {
      name: 'Strategic Partner',
      price: 'Mulai dari 10jt',
      features: [
        'Semua benefit Community Partner',
        'Co-branded content (video/artikel)',
        'Logo placement di jersey/apparel',
        'Sesi eksklusif dengan komunitas',
      ],
      isPopular: true,
    },
    {
      name: 'Title Sponsor',
      price: 'Custom',
      features: [
        'Semua benefit Strategic Partner',
        'Hak penamaan event (e.g., "Brand X Badminton Cup")',
        'Integrasi brand di seluruh platform digital',
        'Akses eksklusif untuk aktivasi brand',
      ]
    }
  ];

  return (
    <div className="bg-background-soft">
      <AnimatedSection as="div" className="w-full bg-surface">
        <div className="container py-16 md:py-24 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Partnership & Sponsorship</h1>
          <p className="mt-4 max-w-3xl mx-auto text-text-muted md:text-lg [text-wrap:balance]">
            Bangun engagement dengan segmen Millennial & Gen-Z urban melalui olahraga, gaya hidup sehat, dan konten kreatif kami.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection as="div" className="container py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Kenapa Bermitra dengan TI Sport?</h2>
            <p className="mt-4 text-text-muted md:text-lg">
                Kami bukan sekadar penyelenggara event. Kami adalah platform yang menghubungkan brand Anda dengan komunitas yang aktif, loyal, dan relevan.
            </p>
        </div>
        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
           <Card className="text-center bg-surface-alt">
                <CardHeader>
                    <CardTitle className="font-headline">Audiens Tertarget</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-text-muted">Jangkau langsung profesional muda (18-35 tahun) yang peduli dengan kesehatan, gaya hidup, dan teknologi.</p>
                </CardContent>
            </Card>
            <Card className="text-center bg-surface-alt">
                <CardHeader>
                    <CardTitle className="font-headline">Konten Berkualitas</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-text-muted">Setiap event didokumentasikan secara sinematik, memberikan aset marketing berkualitas tinggi untuk brand Anda.</p>
                </CardContent>
            </Card>
            <Card className="text-center bg-surface-alt">
                <CardHeader>
                    <CardTitle className="font-headline">Aktivasi Otentik</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-text-muted">Integrasikan produk dan pesan brand Anda secara alami dalam kegiatan yang disukai audiens.</p>
                </CardContent>
            </Card>
        </div>
      </AnimatedSection>
      
      <AnimatedSection as="div" className="py-16 md:py-24 bg-surface">
        <div className="container">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">Paket Sponsorship</h2>
                <p className="mt-4 text-text-muted md:text-lg">
                    Kami menawarkan berbagai paket fleksibel yang dirancang untuk memenuhi tujuan branding dan marketing Anda.
                </p>
            </div>
            <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {tiers.map((tier) => (
                    <Card key={tier.name} className={`flex flex-col h-full ${tier.isPopular ? 'border-secondary shadow-2xl shadow-secondary/20' : 'bg-surface-alt'}`}>
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">{tier.name}</CardTitle>
                            <p className="text-3xl font-bold pt-2">{tier.price}</p>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                           <ul className="space-y-3">
                              {tier.features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                  <Check className="h-5 w-5 text-success mt-0.5 shrink-0" />
                                  <span className="text-sm text-text-muted">{feature}</span>
                                </li>
                              ))}
                            </ul>
                        </CardContent>
                        <div className="p-6">
                             <Button asChild className="w-full" variant={tier.isPopular ? 'secondary' : 'outline'}>
                                <Link href="/contact">Hubungi Kami</Link>
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
             <div className="text-center mt-12">
                <p className="text-text-muted">Punya ide kolaborasi lain? Kami siap berdiskusi.</p>
                <Button asChild variant="link" className="text-lg text-primary">
                    <Link href="/contact">Jadwalkan Panggilan</Link>
                </Button>
             </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
