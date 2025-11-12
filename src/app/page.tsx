
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowRight, Users, Sparkles, Film, Handshake, ChevronRight, Trophy, Star } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { PartnersCarousel } from '@/components/public/PartnersCarousel';
import eventsData from '@/../public/data/events.json';
import type { Event } from '@/lib/types';
import { EventCard } from '@/components/public/events/EventCard';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';

const leaderboardData = [
  { rank: 1, name: 'Andi "The Wall" S.', points: 1250, avatar: 'AS' },
  { rank: 2, name: 'Budi "Smash" K.', points: 1180, avatar: 'BK' },
  { rank: 3, name: 'Citra "Deceiver" A.', points: 1150, avatar: 'CA' },
];


export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-landing');
  const featuredEvents = (eventsData as Event[]).filter(e => e.status === 'OPEN').slice(0, 4);
  const galleryImages = PlaceHolderImages.filter(p => p.id.startsWith('gallery-')).slice(0, 4);

  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const whyCards = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Temukan Komunitasmu',
      description: 'Dari fun games hingga turnamen, temukan teman main yang sefrekuensi dan jadi bagian dari keluarga.',
      link: '/community',
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: 'Tingkatkan Skill-mu',
      description: 'Ikuti sesi latihan terstruktur, dapatkan poin di setiap permainan, dan naiki papan peringkat komunitas.',
      link: '/leaderboard',
    },
    {
      icon: <Film className="h-8 w-8 text-primary" />,
      title: 'Abadikan Momenmu',
      description: 'Setiap event didokumentasikan secara sinematik. Rasakan sensasi menjadi atlet profesional.',
      link: '/gallery',
    },
  ];
  
  const partners = [
    { name: "Brand A", logoUrl: "https://picsum.photos/seed/brandA/150/60" },
    { name: "Brand B", logoUrl: "https://picsum.photos/seed/brandB/150/60" },
    { name: "Brand C", logoUrl: "https://picsum.photos/seed/brandC/150/60" },
    { name: "Brand D", logoUrl: "https://picsum.photos/seed/brandD/150/60" },
    { name: "Brand E", logoUrl: "https://picsum.photos/seed/brandE/150/60" },
    { name: "Brand F", logoUrl: "https://picsum.photos/seed/brandF/150/60" },
  ];

  return (
    <div className="flex flex-col items-center bg-background">
      {/* Hero Section */}
      <section className="w-full h-[90vh] min-h-[700px] max-h-[900px] relative text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="Pemain bulu tangkis beraksi"
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="absolute inset-0 z-10 p-4 flex flex-col items-center justify-center text-center container">
          <AnimatedSection className="flex flex-col items-center">
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight [text-wrap:balance]">
              Main Bareng, Tumbuh Bareng.
            </h1>
            <p className="mt-6 max-w-3xl text-base md:text-xl text-neutral-200 [text-wrap:balance]">
              Kami adalah ekosistem olahraga kreatif yang menyatukan komunitas, venue, dan brand melalui pengalaman digital yang sinematik.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="min-h-[52px] text-base font-semibold px-8 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20">
                  <Link href="/events">Temukan Jadwal</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="min-h-[52px] text-base font-semibold border-white/30 text-white backdrop-blur-sm bg-white/10 hover:bg-white/20 hover:text-white px-8">
                  <Link href="/about">Pelajari Konsepnya</Link>
                </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Events Section */}
      <AnimatedSection id="featured-events" className="w-full py-20 md:py-28 text-center container">
        <h2 className="font-headline text-3xl md:text-4xl font-bold">Jadwal Terdekat</h2>
        <p className="mt-4 max-w-2xl mx-auto text-text-muted md:text-lg">
          Jangan sampai kehabisan slot. Amankan posisimu di permainan berikutnya.
        </p>
        <div className="mt-12">
            {featuredEvents.length > 1 ? (
                 <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[autoplayPlugin.current]}
                    onMouseEnter={() => autoplayPlugin.current.stop()}
                    onMouseLeave={() => autoplayPlugin.current.reset()}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {featuredEvents.map((event, index) => (
                            <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                                <EventCard event={event} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden sm:inline-flex" />
                    <CarouselNext className="hidden sm:inline-flex" />
                </Carousel>
            ) : featuredEvents.length === 1 ? (
                <div className="max-w-sm mx-auto">
                    <EventCard event={featuredEvents[0]} />
                </div>
            ) : (
                <Card className="text-center py-12 border-dashed">
                  <CardContent className="space-y-4">
                      <Sparkles className="h-12 w-12 mx-auto text-text-muted" />
                      <p className="text-text-muted">Belum ada jadwal terdekat. Cek kembali nanti!</p>
                  </CardContent>
                </Card>
            )}
            <Button asChild variant="outline" size="lg" className="mt-12">
              <Link href="/events">
                Lihat Semua Jadwal <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
        </div>
      </AnimatedSection>

      {/* Why TI Sport Section */}
      <AnimatedSection id="why-us" className="w-full py-20 md:py-28 text-center bg-surface">
         <div className="container">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Bukan Sekadar Main Bareng</h2>
            <p className="mt-4 max-w-2xl mx-auto text-text-muted md:text-lg">
            TI Sport adalah panggungmu. Tempat di mana setiap permainan berarti.
            </p>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyCards.map((card, index) => (
                <AnimatedSection
                    key={card.title}
                    className="text-left flex flex-col"
                    delay={index * 0.1}
                >
                    <Card className="flex flex-col h-full bg-background hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <CardHeader className="items-start">
                        <div className="p-3 bg-primary-soft rounded-lg border border-primary/20 mb-4">
                            {card.icon}
                        </div>
                        <CardTitle className="font-headline text-xl">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-text-muted">{card.description}</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="link" asChild className="p-0 h-auto font-semibold text-primary">
                            <Link href={card.link}>
                                Pelajari Lebih Lanjut <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardFooter>
                    </Card>
                </AnimatedSection>
            ))}
            </div>
         </div>
      </AnimatedSection>

      {/* Gallery Showcase */}
       <AnimatedSection id="gallery-showcase" className="w-full py-20 md:py-28 container">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">Momen Terbaik, Tertangkap Sempurna</h2>
                <p className="mt-4 max-w-xl mx-auto lg:mx-0 text-text-muted md:text-lg">
                    Setiap smash, setiap tawa, setiap tetes keringat. Galeri kami adalah bukti bahwa setiap pemain adalah bintang.
                </p>
                <Button asChild size="lg" className="mt-8" variant="outline">
                    <Link href="/gallery">Lihat Semua Galeri <ChevronRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
             <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[450px]">
                {galleryImages.map((image, index) => (
                    <Link key={image.id} href="/gallery" className="block relative overflow-hidden rounded-2xl group">
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                            data-ai-hint={image.imageHint}
                        />
                    </Link>
                ))}
            </div>
         </div>
       </AnimatedSection>
       
        {/* Leaderboard Spotlight */}
        <AnimatedSection id="leaderboard-spotlight" className="w-full py-20 md:py-28 bg-surface">
            <div className="container text-center">
                 <h2 className="font-headline text-3xl md:text-4xl font-bold">Naiki Papan Peringkat</h2>
                <p className="mt-4 max-w-2xl mx-auto text-text-muted md:text-lg">
                    Tunjukkan skill-mu, kumpulkan poin, dan raih posisi puncak di komunitas.
                </p>
                <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
                    {leaderboardData.map((player, index) => (
                        <AnimatedSection key={player.rank} delay={index * 0.1}
                            className={`rounded-xl p-6 relative ${
                                player.rank === 1 ? 'bg-gradient-to-br from-yellow-300/80 to-amber-500/80 -translate-y-4 shadow-2xl shadow-amber-500/20' : 
                                player.rank === 2 ? 'bg-slate-300/80' : 
                                'bg-orange-300/50'
                            }`}>
                            <div className="flex flex-col items-center">
                                <Badge className={`absolute -top-3 ${
                                    player.rank === 1 ? 'bg-amber-600 text-white' : 'bg-slate-600 text-white'
                                }`}>#{player.rank}</Badge>
                                <Avatar className="h-20 w-20 mb-3 border-4 border-background">
                                    <AvatarFallback className="text-2xl">{player.avatar}</AvatarFallback>
                                </Avatar>
                                <p className="font-bold text-lg text-foreground">{player.name}</p>
                                <p className={`font-black text-2xl ${player.rank === 1 ? 'text-amber-900' : 'text-primary'}`}>{player.points} <span className="text-base font-bold">PTS</span></p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
                 <Button asChild variant="default" size="lg" className="mt-16">
                    <Link href="/leaderboard">Lihat Papan Peringkat Lengkap</Link>
                </Button>
            </div>
        </AnimatedSection>

      {/* Partners Section */}
      <AnimatedSection className="w-full py-20 md:py-28 text-center container">
        <h2 className="font-headline text-3xl md:text-4xl font-bold">Didukung Oleh Partner Terpercaya</h2>
        <p className="mt-4 max-w-2xl mx-auto text-text-muted md:text-lg">
          Kami bangga berkolaborasi dengan brand dan partner yang memiliki visi yang sama untuk memajukan ekosistem olahraga.
        </p>
        <div className="mt-12">
          <PartnersCarousel partners={partners} />
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="w-full bg-surface">
        <div className="container py-20 md:py-32 grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
                <h2 className="font-headline text-3xl md:text-4xl font-bold [text-wrap:balance]">Lapangan Sudah Menanti. Kamu Kapan?</h2>
                <p className="mt-4 text-text-muted md:text-lg">Baik Anda seorang pemain, pemilik venue, atau perwakilan brand, ada tempat untuk Anda di TI Sport. Mari berkolaborasi dan tumbuh bersama.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-self-center md:justify-self-end">
                <Button asChild size="lg" className="min-h-[52px] font-semibold bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/sponsorship">
                        <Handshake className="mr-2 h-5 w-5"/>
                        Jadi Partner
                    </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="min-h-[52px] font-semibold">
                    <Link href="/contact">
                        Hubungi Kami
                    </Link>
                </Button>
            </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
