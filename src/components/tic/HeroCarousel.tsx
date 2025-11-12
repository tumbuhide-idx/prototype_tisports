'use client';

import * as React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type HeroCarouselProps = {
    images: typeof PlaceHolderImages;
};

export function HeroCarousel({ images }: HeroCarouselProps) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  return (
    <div className="overflow-hidden h-full w-full" ref={emblaRef}>
      <div className="flex h-full">
        {images.map((img, index) => (
          <div className="relative flex-[0_0_100%] h-full" key={index}>
            <Image
              src={img.imageUrl}
              alt={img.description}
              fill
              className="object-cover object-center"
              priority={index === 0}
              data-ai-hint={img.imageHint}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
