
'use client';

import React, { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import eventsData from '@/../public/data/events.json';
import type { Event } from '@/lib/types';
import { ArrowLeft, X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { formatShortDate } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

const events: Event[] = eventsData;

export default function EventGalleryPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const event = events.find(e => e.slug === slug);

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === 'ArrowRight') {
          handleNext();
        } else if (e.key === 'ArrowLeft') {
          handlePrev();
        } else if (e.key === 'Escape') {
          setSelectedImage(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  if (!event || !event.galleryImages) {
    notFound();
  }

  const handleNext = () => {
    if (selectedImage !== null && event.galleryImages) {
      setSelectedImage((selectedImage + 1) % event.galleryImages.length);
    }
  };

  const handlePrev = () => {
    if (selectedImage !== null && event.galleryImages) {
      setSelectedImage((selectedImage - 1 + event.galleryImages.length) % event.galleryImages.length);
    }
  };

  return (
    <div className="bg-background">
      <AnimatedSection as="div" className="w-full bg-surface/50">
        <div className="container py-16 md:py-24 text-center">
          <Button asChild variant="ghost" className="mb-4">
             <Link href="/gallery">
              <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Semua Galeri
            </Link>
          </Button>
          <h1 className="font-headline text-3xl md:text-5xl font-bold [text-wrap:balance]">{event.title}</h1>
          <p className="mt-4 text-muted-foreground">{formatShortDate(event.startsAt)}</p>
        </div>
      </AnimatedSection>

      <AnimatedSection as="div" className="container py-16 md:py-24">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {event.galleryImages.map((image, index) => (
            <AnimatedSection key={index} delay={index * 0.05} className="break-inside-avoid">
              <Card
                className="overflow-hidden group rounded-2xl cursor-pointer"
                onClick={() => setSelectedImage(index)}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.caption || event.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>

      <AnimatePresence>
        {selectedImage !== null && event.galleryImages[selectedImage] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="relative w-full h-full flex items-center justify-center">
               <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh]"
              >
                 <Image
                    src={event.galleryImages[selectedImage].url}
                    alt={event.galleryImages[selectedImage].caption || event.title}
                    width={1600}
                    height={1200}
                    className="object-contain w-full h-full rounded-lg"
                 />
                 {event.galleryImages[selectedImage].caption && (
                     <p className="absolute bottom-4 left-4 right-4 text-center text-white bg-black/50 p-2 rounded-lg text-sm">
                         {event.galleryImages[selectedImage].caption}
                     </p>
                 )}
               </motion.div>
            </div>
            
            {/* Control Buttons */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-white hover:bg-white/20 rounded-full h-10 w-10"
                >
                    <Download className="h-5 w-5" />
                    <span className="sr-only">Download</span>
                </Button>
                <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-white hover:bg-white/20 rounded-full h-10 w-10"
                onClick={() => setSelectedImage(null)}
                >
                <X className="h-6 w-6" />
                <span className="sr-only">Tutup</span>
                </Button>
            </div>
            
            {/* Prev Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-white hover:bg-white/20 rounded-full h-10 w-10"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
             {/* Next Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-white hover:bg-white/20 rounded-full h-10 w-10"
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
