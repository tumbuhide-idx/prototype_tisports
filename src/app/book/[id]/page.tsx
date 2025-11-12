'use client';

import React, { useState, useMemo } from 'react';
import { useRouter, notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookingForm } from '@/components/booking/BookingForm';
import { DonationInput } from '@/components/booking/DonationInput';
import { ArrowLeft, CreditCard, User, LogIn, ChevronUp, ChevronDown, Award } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import eventsData from '@/../public/data/events.json';
import type { Event } from '@/lib/types';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { AuthModal } from '@/components/auth/AuthModal';
import { AnimatePresence, motion } from 'framer-motion';

const events: Event[] = eventsData;

export default function BookingPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const event = events.find((e) => e.id === params.id);
  
  const [step, setStep] = useState<'choice' | 'form'>('choice');
  const [quantity, setQuantity] = useState(1);
  const [participants, setParticipants] = useState<string[]>(['']);
  const [donation, setDonation] = useState(0);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSummaryExpanded, setSummaryExpanded] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    const newParticipants = Array.from({ length: newQuantity });
    participants.forEach((p, i) => {
        if (i < newQuantity) newParticipants[i] = p as string;
    });
    setParticipants(newParticipants as string[]);
  };

  const handleParticipantChange = (index: number, name: string) => {
    const newParticipants = [...participants];
    newParticipants[index] = name;
    setParticipants(newParticipants);
  };
  
  const ticketTotal = useMemo(() => {
    if (!event) return 0;
    return event.priceIDR * quantity;
  }, [event, quantity]);

  const pointsToEarn = useMemo(() => {
    if(!event) return 0;
    const POINT_PER_TICKET = 25_000;
    return Math.floor(ticketTotal / POINT_PER_TICKET) * 25;
  }, [ticketTotal, event]);


  const totalAmount = useMemo(() => {
    return ticketTotal + donation;
  }, [ticketTotal, donation]);

  const handleContinue = () => {
    if (!event) return;

    const query = new URLSearchParams({
      quantity: String(quantity),
      participants: JSON.stringify(participants.filter(p => p)),
      donation: String(donation)
    });
    
    router.push(`/checkout/${event.id}?${query.toString()}`);
  }


  if (!event) {
    notFound();
  }

  const BookingChoice = () => (
    <AnimatedSection>
        <div className="mb-8">
            <Button variant="ghost" asChild>
                <Link href={`/e/${event.slug}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali ke Event
                </Link>
            </Button>
        </div>
        <Card className="rounded-2xl shadow-lg border-surface text-center">
            <CardHeader>
                <CardTitle className="font-headline text-2xl md:text-3xl">Selesaikan Booking</CardTitle>
                <CardDescription>
                Masuk untuk pengalaman booking yang lebih cepat, atau lanjut sebagai tamu.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
                <AuthModal open={isLoginModalOpen} onOpenChange={setLoginModalOpen}>
                    <Button variant="outline" size="lg" className="h-auto py-4">
                        <div className="flex flex-col items-center gap-2">
                           <LogIn />
                            <span className="font-semibold">Masuk & Lanjut</span>
                            <span className="text-xs font-normal text-muted-foreground">Untuk member terdaftar</span>
                        </div>
                    </Button>
                </AuthModal>
                 <Button variant="outline" size="lg" className="h-auto py-4" onClick={() => setStep('form')}>
                     <div className="flex flex-col items-center gap-2">
                       <User />
                        <span className="font-semibold">Lanjut sebagai Tamu</span>
                        <span className="text-xs font-normal text-muted-foreground">Tanpa perlu akun</span>
                    </div>
                </Button>
            </CardContent>
        </Card>
    </AnimatedSection>
  );

  const BookingFormView = () => (
    <>
       <AnimatedSection>
            <div className="mb-8">
              <Button variant="ghost" onClick={() => setStep('choice')}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Kembali
              </Button>
            </div>
            
            <Card className="rounded-2xl shadow-lg border-surface">
              <CardHeader>
                <CardTitle className="font-headline text-2xl md:text-3xl">Formulir Booking</CardTitle>
                <CardDescription>
                  Masukkan data untuk: <span className="font-semibold text-foreground">{event.title}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BookingForm 
                    quantity={quantity}
                    onQuantityChange={handleQuantityChange}
                    participants={participants}
                    onParticipantChange={handleParticipantChange}
                />
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-surface mt-8">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Tambahkan Donasi</CardTitle>
              </CardHeader>
              <CardContent>
                <DonationInput donation={donation} onDonationChange={setDonation} />
              </CardContent>
            </Card>

        </AnimatedSection>
        {/* Spacer for the sticky footer */}
        <div className="h-40" />
    </>
  );

  return (
    <>
      <div className="container max-w-3xl py-8 md:py-16">
        {step === 'choice' ? <BookingChoice /> : <BookingFormView />}
      </div>

      {step === 'form' && (
        <>
            <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-surface bg-background/95 backdrop-blur-sm">
                <div className="container max-w-3xl mx-auto px-4">
                 <div className="py-2 text-center text-sm text-secondary-foreground bg-secondary/20 rounded-t-lg">
                    Kamu akan dapat <span className="font-bold">{pointsToEarn} poin</span> dari booking ini! 🎉
                  </div>
                <AnimatePresence>
                    {isSummaryExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="py-4 border-b">
                        <h4 className="font-headline mb-2">Ringkasan Biaya</h4>
                        <div className="space-y-1 text-sm text-muted-foreground">
                            <div className="flex justify-between">
                            <span>{quantity} Tiket</span>
                            <span>{formatCurrency(ticketTotal)}</span>
                            </div>
                             <div className="flex justify-between text-yellow-600 dark:text-secondary">
                                <div className="flex items-center gap-1.5">
                                  <Award className="h-4 w-4" />
                                  <span>Poin didapat</span>
                                </div>
                                <span>{pointsToEarn} pts</span>
                            </div>
                            {donation > 0 && (
                            <div className="flex justify-between">
                                <span>Donasi</span>
                                <span>{formatCurrency(donation)}</span>
                            </div>
                            )}
                        </div>
                        </div>
                    </motion.div>
                    )}
                </AnimatePresence>
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center gap-2">
                        <div>
                            <p className="text-sm text-muted-foreground">Total Bayar</p>
                            <p className="text-2xl font-bold">{formatCurrency(totalAmount)}</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSummaryExpanded(!isSummaryExpanded)}
                        >
                            {isSummaryExpanded ? <ChevronDown /> : <ChevronUp />}
                            <span className="sr-only">Toggle Summary</span>
                        </Button>
                    </div>
                    <Button size="lg" className="min-h-[48px] uppercase font-bold tracking-wider" onClick={handleContinue}>
                        <CreditCard className="mr-2 h-5 w-5" />
                        Lanjutkan
                    </Button>
                </div>
                </div>
            </footer>
             {/* Spacer for bottom nav on mobile */}
            <div className="h-16 md:hidden" />
        </>
      )}
    </>
  );
}