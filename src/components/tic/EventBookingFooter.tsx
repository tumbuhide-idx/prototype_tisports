
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import type { Event } from '@/lib/types';
import Link from 'next/link';
import { Star } from 'lucide-react';

interface EventBookingFooterProps {
  event: Event;
  activeTab?: 'non-member' | 'membership';
}

export function EventBookingFooter({ event, activeTab = 'non-member' }: EventBookingFooterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const targetId = 'booking-card';
  
  const isMembershipView = activeTab === 'membership';
  const price = isMembershipView ? event.membershipDetails?.priceIDR : event.priceIDR;
  const priceLabel = isMembershipView ? '/bulan' : '/slot';


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show footer on mobile always, or on desktop when booking card is not visible
        if (window.innerWidth < 1024) {
          setIsVisible(true);
        } else {
          setIsVisible(!entry.isIntersecting);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      }
    );

    const handleResize = () => {
       if (window.innerWidth < 1024) {
          setIsVisible(true);
       } else {
          const target = document.getElementById(targetId);
          if(target) {
            const rect = target.getBoundingClientRect();
            setIsVisible(rect.top < 0 || rect.bottom > window.innerHeight);
          }
       }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    const target = document.getElementById(targetId);
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isBookingOpen = event.status === 'OPEN' && event.participantsMasked.length < event.capacity;
  
  const pointsToEarn = isMembershipView ? 0 : Math.floor((event.priceIDR || 0) / 25000) * 25;
  const buttonText = isMembershipView ? 'Daftar' : `Pesan`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.footer
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-surface bg-background/95 backdrop-blur-sm lg:hidden"
        >
          <div className="container flex items-center justify-between h-24">
            <div>
              <p className="text-sm text-muted-foreground">Harga</p>
              {price !== undefined && (
                <p className="text-2xl font-bold">{formatCurrency(price)}<span className="text-sm font-normal">{priceLabel}</span></p>
              )}
            </div>
            {isBookingOpen ? (
                 <Button asChild size="lg" className="min-h-[48px] font-bold">
                    <Link href={`/book/${event.id}`}>{buttonText}</Link>
                </Button>
            ) : (
                <Button size="lg" disabled className="min-h-[48px] font-bold">
                    {event.participantsMasked.length >= event.capacity ? 'Penuh' : 'Ditutup'}
                </Button>
            )}
          </div>
        </motion.footer>
      )}
    </AnimatePresence>
  );
}

    