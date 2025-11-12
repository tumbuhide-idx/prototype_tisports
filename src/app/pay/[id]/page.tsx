'use client';

import React, { Suspense, useState, useMemo, useEffect } from 'react';
import { notFound, useRouter, useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ShieldCheck, QrCode, Landmark, Copy, Check, UploadCloud, FileCheck2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import eventsData from '@/../public/data/events.json';
import paymentMethodsData from '@/../public/data/payment-methods.json';
import type { Event, PaymentMethod } from '@/lib/types';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Label } from '@/components/ui/label';

const events: Event[] = eventsData;
const paymentMethods: PaymentMethod[] = paymentMethodsData;

function Countdown({ onExpire }: { onExpire: () => void }) {
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <p className="text-2xl font-bold font-mono text-foreground">
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </p>
  );
}

function PaymentFlow() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const event = events.find((e) => e.id === params.id);
  
  const [step, setStep] = useState<'method' | 'instruction'>('method');
  const [paymentType, setPaymentType] = useState<'manual' | 'auto' | null>(null);
  const [manualMethod, setManualMethod] = useState<PaymentMethod | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [uploadProof, setUploadProof] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  if (!event) {
    notFound();
  }

  const quantity = parseInt(searchParams.get('quantity') || '1', 10);
  const donation = parseInt(searchParams.get('donation') || '0', 10);
  const discount = parseInt(searchParams.get('discount') || '0', 10);
  const fee = parseInt(searchParams.get('fee') || '0', 10);
  const ticketTotal = event.priceIDR * quantity;
  const totalAmount = ticketTotal + donation + fee - discount;

  const backLinkQuery = searchParams.toString();

  const handlePay = () => {
    if (!manualMethod) return;
    setStep('instruction');
  };

  const handleFinishPayment = () => {
    const finalStatus = uploadProof ? 'PAID' : 'REVIEW';
    const finalParams = new URLSearchParams(searchParams.toString());
    finalParams.set('eventId', event.id);
    router.push(`/status/${finalStatus}?${finalParams.toString()}`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadProof(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    });
  }
  
  const handleExpire = () => {
     const finalParams = new URLSearchParams(searchParams.toString());
     finalParams.set('eventId', event.id);
     router.push(`/status/EXPIRED?${finalParams.toString()}`);
  }

  return (
    <div className="container max-w-lg py-8 md:py-16">
      <AnimatedSection>
        <div className="mb-8">
            <Button variant="ghost" asChild>
                <Link href={step === 'instruction' ? '#' : `/checkout/${event.id}?${backLinkQuery}`} onClick={() => { if(step === 'instruction') setStep('method')}}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali
                </Link>
            </Button>
        </div>
      </AnimatedSection>
       <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 'method' && (
             <Card className="rounded-2xl shadow-lg border-surface">
              <CardHeader>
                <CardTitle className="font-headline text-2xl md:text-3xl">Pilih Metode Pembayaran</CardTitle>
                <div className="flex items-center justify-between pt-2">
                    <CardDescription className="text-base">Total Pembayaran</CardDescription>
                    <p className="text-xl font-bold">{formatCurrency(totalAmount)}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Button variant={paymentType === 'manual' ? 'secondary' : 'outline'} onClick={() => setPaymentType('manual')} className="w-full h-auto text-left justify-start p-4">
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-base">Pembayaran Manual</p>
                            <p className={cn("font-normal text-sm whitespace-normal", paymentType === 'manual' ? 'text-secondary-foreground/80' : 'text-muted-foreground')}>Konfirmasi pembayaran manual dengan upload bukti transfer.</p>
                        </div>
                    </Button>
                    <Button variant="outline" disabled className="w-full h-auto text-left justify-start p-4">
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-base text-muted-foreground">Otomatis <span className="text-xs font-normal">(Segera Hadir)</span></p>
                            <p className="font-normal text-sm text-muted-foreground whitespace-normal">Pembayaran terkonfirmasi otomatis via Midtrans.</p>
                        </div>
                    </Button>
                 </div>
                 {paymentType === 'manual' && (
                    <motion.div initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: 'auto'}} className="space-y-4 pt-4">
                        <p className="text-sm font-medium text-foreground/80">Konfirmasi pembayaran manual dengan transfer ke rekening berikut:</p>
                        <div className="space-y-2">
                            <Button variant={manualMethod?.id === 'bca' ? 'default' : 'outline'} onClick={() => setManualMethod(paymentMethods.find(p => p.id === 'bca') ?? null)} className="w-full h-auto text-left justify-start p-4 gap-4">
                                <Landmark className="h-5 w-5" />
                                <span className="font-semibold">Transfer Bank BCA</span>
                            </Button>
                            <Button variant="outline" disabled className="w-full h-auto text-left justify-start p-4 gap-4">
                                <QrCode className="h-5 w-5" />
                                <span className="font-semibold">QRIS <span className="text-xs font-normal">(Segera Hadir)</span></span>
                            </Button>
                        </div>
                        <Button size="lg" className="w-full min-h-[48px]" disabled={!manualMethod} onClick={handlePay}>Bayar</Button>
                    </motion.div>
                 )}
              </CardContent>
            </Card>
          )}

          {step === 'instruction' && manualMethod && (
            <Card className="rounded-2xl shadow-lg border-surface">
                 <CardHeader className="text-center">
                    <CardTitle className="font-headline text-2xl md:text-3xl">Selesaikan Pembayaran</CardTitle>
                    <CardDescription>{event.title}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Pembayaran</p>
                      <p className="text-3xl font-bold">{formatCurrency(totalAmount)}</p>
                    </div>
                     <div className="p-3 bg-destructive/10 rounded-lg">
                      <p className="text-sm font-medium text-destructive">Selesaikan pembayaran dalam</p>
                      <Countdown onExpire={handleExpire} />
                    </div>
                    {manualMethod.type === 'BANK' && (
                       <div className="text-center space-y-4 pt-4">
                            <p className="text-sm text-muted-foreground">Transfer ke {manualMethod.displayName}</p>
                            <div className="p-4 bg-muted rounded-lg inline-flex items-center gap-4">
                                <p className="text-xl font-bold font-mono tracking-wider">{manualMethod.accountNumber}</p>
                                <Button variant="ghost" size="icon" onClick={() => handleCopy(manualMethod.accountNumber!)}>
                                    {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                            <p className="font-semibold">a/n {manualMethod.accountName}</p>
                        </div>
                    )}
                     <div className="space-y-2 pt-4">
                        <Label htmlFor="upload-proof" className="cursor-pointer w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                           {uploadProof ? <FileCheck2 className="mr-2 h-4 w-4"/> : <UploadCloud className="mr-2 h-4 w-4"/>}
                           {uploadProof ? 'Ganti File' : 'Upload Bukti Bayar'}
                        </Label>
                        <input id="upload-proof" type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                        {uploadPreview && (
                            <div className="relative w-32 h-32 mx-auto border rounded-lg overflow-hidden">
                                <Image src={uploadPreview} alt="Preview Bukti Bayar" layout="fill" objectFit="cover" />
                            </div>
                        )}
                        <Button size="lg" className="w-full min-h-[48px] uppercase font-bold tracking-wider" onClick={handleFinishPayment}>
                            <ShieldCheck className="mr-2 h-5 w-5" />
                            Saya Sudah Bayar
                        </Button>
                    </div>
                </CardContent>
            </Card>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function PaymentPage() {
    return (
        <Suspense>
            <PaymentFlow />
        </Suspense>
    )
}