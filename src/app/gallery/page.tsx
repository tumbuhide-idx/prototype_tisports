'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Camera } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { formatShortDate } from '@/lib/utils';
import eventsData from '@/../public/data/events.json';
import type { Event } from '@/lib/types';
import { cn } from '@/lib/utils';

const eventsWithGalleries: Event[] = eventsData.filter(event => event.galleryImages && event.galleryImages.length > 0);

export default function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredEvents = useMemo(() => {
    return eventsWithGalleries
      .filter(event => {
        const eventDate = new Date(event.startsAt);
        const now = new Date();
        const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

        if (filter === 'week') return eventDate >= oneWeekAgo;
        if (filter === 'month') return eventDate >= oneMonthAgo;
        return true;
      })
      .filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, filter]);

  return (
    <div className="bg-background">
      <AnimatedSection as="div" className="w-full bg-surface/50">
        <div className="container py-16 md:py-24 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Event Gallery</h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-lg [text-wrap:balance]">
            Momen-momen terbaik dari setiap permainan, ditangkap secara sinematik. Pilih event untuk melihat galeri lengkapnya.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection as="div" className="container py-16 md:py-24">
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Cari event berdasarkan nama..."
              className="pl-12 h-14 rounded-full text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            <Badge
              variant={filter === 'all' ? 'default' : 'secondary'}
              onClick={() => setFilter('all')}
              className="text-sm shrink-0 cursor-pointer py-2 px-4 rounded-full"
            >
              Semua
            </Badge>
            <Badge
              variant={filter === 'week' ? 'default' : 'secondary'}
              onClick={() => setFilter('week')}
              className="text-sm shrink-0 cursor-pointer hover:bg-muted py-2 px-4 rounded-full"
            >
              Minggu Ini
            </Badge>
            <Badge
              variant={filter === 'month' ? 'default' : 'secondary'}
              onClick={() => setFilter('month')}
              className="text-sm shrink-0 cursor-pointer hover:bg-muted py-2 px-4 rounded-full"
            >
              Bulan Ini
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <AnimatedSection key={event.id} delay={index * 0.1}>
              <Card className="flex flex-col h-full shadow-sm hover:shadow-xl transition-shadow duration-300 bg-card overflow-hidden group">
                <Link href={`/gallery/${event.slug}`} className="block">
                  <CardHeader className="p-0">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        data-ai-hint={event.imageHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-headline text-xl font-bold">{event.title}</h3>
                        <p className="text-sm">{formatShortDate(event.startsAt)}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 flex justify-between items-center bg-card">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Camera className="h-4 w-4" />
                      <span>{event.galleryImages?.length || 0} Photos</span>
                    </div>
                    <Button variant="link" className="p-0 h-auto">
                      Lihat Galeri
                    </Button>
                  </CardContent>
                </Link>
              </Card>
            </AnimatedSection>
          ))}
        </div>
        
        {filteredEvents.length === 0 && (
          <div className="text-center py-20 bg-muted rounded-lg">
            <Camera className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Galeri Tidak Ditemukan</h3>
            <p className="mt-1 text-muted-foreground">Tidak ada galeri yang cocok dengan pencarian Anda.</p>
          </div>
        )}
      </AnimatedSection>
    </div>
  );
}
