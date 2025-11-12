
'use client';

import * as React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

type Partner = {
    name: string;
    logoUrl: string;
};

type PartnersCarouselProps = {
    partners: Partner[];
};

export function PartnersCarousel({ partners }: PartnersCarouselProps) {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [
      Autoplay({ delay: 3000, stopOnInteraction: false }),
    ]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {partners.map((partner, index) => (
          <div className="relative flex-[0_0_50%] sm:flex-[0_0_33.33%] md:flex-[0_0_25%] lg:flex-[0_0_20%] mx-4" key={index}>
            <div className="flex items-center justify-center h-20 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Image
                    src={partner.logoUrl}
                    alt={partner.name}
                    width={150}
                    height={60}
                    className="object-contain"
                />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
