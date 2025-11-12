
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Zap, Award } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Komunitas TI Sport',
  description: 'Gabung dengan komunitas olahraga kami yang aktif, positif, dan inklusif. Lebih dari sekadar main bareng, kami adalah keluarga.',
};

export default function CommunityPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-landing');

  const values = [
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: 'Energi & Semangat',
      description: 'Kami adalah komunitas yang aktif, positif, dan selalu bersemangat di dalam maupun di luar lapangan.'
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: 'Inklusif & Terbuka',
      description: 'Semua level keahlian diterima. Kami percaya olahraga adalah untuk semua orang.'
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: 'Profesional & Kreatif',
      description: 'Dikelola oleh agensi kreatif, setiap event dikemas secara profesional dengan sentuhan konten sinematik.'
    }
  ];

  return (
    <div className="bg-background-soft">
      <AnimatedSection as="div" className="relative w-full h-80 flex items-center justify-center text-center text-white overflow-hidden bg-slate-900">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="Komunitas TI Sport"
            fill
            className="object-cover object-center opacity-30"
            priority
            data-ai-hint="badminton community"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 p-4 flex flex-col items-center container">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter [text-wrap:balance]">
            Gabung Komunitas Kami
          </h1>
          <p className="mt-4 max-w-2xl text-base md:text-xl text-neutral-200 [text-wrap:balance]">
            Lebih dari sekadar main bareng. Kami adalah keluarga yang tumbuh bersama melalui olahraga.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection as="div" className="container py-16 md:py-24 text-center">
         <h2 className="font-headline text-3xl md:text-4xl font-bold">Nilai-Nilai Komunitas Kami</h2>
        <p className="mt-4 max-w-2xl mx-auto text-text-muted md:text-lg">
          Tiga pilar yang membuat komunitas TI Sport unik dan menyenangkan.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
               <AnimatedSection key={value.title} delay={index * 0.1}>
                <Card className="text-left bg-surface h-full">
                    <CardHeader>
                        <div className="p-3 bg-primary-soft rounded-lg border border-primary/20 w-fit mb-4">
                            {value.icon}
                        </div>
                        <CardTitle className="font-headline text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-text-muted">{value.description}</p>
                    </CardContent>
                </Card>
               </AnimatedSection>
            ))}
        </div>
      </AnimatedSection>
      
      <AnimatedSection as="div" className="w-full bg-surface">
        <div className="container py-16 md:py-24 text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Siap Bergabung?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-text-muted md:text-lg">
                Temukan jadwal main bareng terbaru, lihat galeri keseruan kami, dan jadilah bagian dari TI Sport hari ini!
            </p>
            <div className="mt-8">
                <Button asChild size="lg" className="min-h-[48px] bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/events">
                        Lihat Jadwal Event
                    </Link>
                </Button>
            </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
