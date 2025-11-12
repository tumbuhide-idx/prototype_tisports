'use client';

import React, { Suspense, useState, useMemo } from 'react';
import { notFound, useRouter, useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CreditCard, Ticket, Gift, Wallet, Users, Calendar, Tag, Percent, Award } from 'lucide-react';
import { formatCurrency, formatShortDate } from '@/lib/utils';
import eventsData from '@/../public/data/events.json';
import type { Event } from '@/lib/types';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Separator } from '@/components/ui/separator';
import CheckoutLoading from './loading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


const events: Event[] = eventsData;

type Voucher = {
  code: string;
  title: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
};

const availableVouchers: Voucher[] = [
    { code: 'NEWMEMBER90', title: 'Voucher Member Baru', description: 'Diskon 90% tiket', type: 'percentage', value: 0.9 },
    { code: 'WEEKENDSERU', title: 'Promo Weekend', description: 'Diskon 20% semua event', type: 'percentage', value: 0.2 },
    { code: 'MAINHEMAT15K', title: 'Main Lebih Hemat', description: 'Potongan langsung Rp 15.000', type: 'fixed', value: 15000 },
    { code: 'PLAYERBARU50', title: 'Diskon Pemain Baru', description: 'Diskon 50% untuk pendaftar pertama', type: 'percentage', value: 0.5 },
    { code: 'LOYALTY10', title: 'Bonus Loyalitas', description: 'Diskon 10% untuk member setia', type: 'percentage', value: 0.1 },
    { code: 'BOOKINGRAME', title: 'Booking Rombongan', description: 'Potongan Rp 25.000 min. 2 tiket', type: 'fixed', value: 25000 },
    { code: 'AFTERWORKSMASH', title: 'Promo After-Work', description: 'Potongan Rp 10.000', type: 'fixed', value: 10000 },
];

const featuredVouchers = availableVouchers.slice(0, 3);


function CheckoutFlow() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const event = events.find((e) => e.id === params.id);
  
  const [voucherCode, setVoucherCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedVoucher, setAppliedVoucher] = useState('');
  const [isVoucherSheetOpen, setVoucherSheetOpen] = useState(false);

  const PLATFORM_FEE = 1000;

  const quantity = parseInt(searchParams.get('quantity') || '1', 10);
  const donation = parseInt(searchParams.get('donation') || '0', 10);
  let participants: string[] = [];
  try {
    const participantsParam = searchParams.get('participants');
    if (participantsParam) {
      participants = JSON.parse(participantsParam);
    }
  } catch (e) {
    console.error("Failed to parse participants", e);
  }

  const ticketTotal = event ? event.priceIDR * quantity : 0;

  const pointsToEarn = useMemo(() => {
    if(!event) return 0;
    const POINT_PER_TICKET = 25_000;
    return Math.floor(ticketTotal / POINT_PER_TICKET) * 25;
  }, [ticketTotal, event]);
  
  const subtotal = useMemo(() => ticketTotal + donation + PLATFORM_FEE, [ticketTotal, donation]);
  
  const totalAmount = useMemo(() => {
      return Math.max(0, subtotal - discount);
  }, [subtotal, discount]);

  if (!event) {
    notFound();
  }
  
  const applyVoucher = (voucher: Voucher | string) => {
    let voucherToApply: Voucher | undefined;

    if (typeof voucher === 'string') {
        if (voucher.toUpperCase() === 'DISKON50K') {
            setDiscount(50000);
            setAppliedVoucher('DISKON50K');
            setVoucherSheetOpen(false);
            return;
        }
        voucherToApply = availableVouchers.find(v => v.code.toUpperCase() === voucher.toUpperCase());
    } else {
        voucherToApply = voucher;
    }
    
    if (!voucherToApply) {
        console.log("Invalid voucher code");
        return;
    }

    if (voucherToApply.type === 'fixed') {
        setDiscount(voucherToApply.value);
    } else if (voucherToApply.type === 'percentage') {
        setDiscount(ticketTotal * voucherToApply.value);
    }
    setAppliedVoucher(voucherToApply.title);
    setVoucherCode('');
    setVoucherSheetOpen(false);
  };


  const handlePayment = () => {
    const query = new URLSearchParams({
      quantity: String(quantity),
      donation: String(donation),
      participants: JSON.stringify(participants),
      discount: String(discount),
      appliedVoucher,
      points: String(pointsToEarn),
      fee: String(PLATFORM_FEE),
      totalAmount: String(totalAmount),
    });
    router.push(`/pay/${event.id}?${query.toString()}`);
  };

  return (
    <>
      <div className="container max-w-4xl py-8 md:py-16">
        <AnimatedSection>
          <div className="mb-8">
            <Button variant="ghost" asChild>
              <Link href={`/book/${event.id}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Form Booking
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
               <Card className="rounded-2xl shadow-lg border-surface">
                 <CardHeader>
                    <CardTitle className="font-headline text-2xl">Pesanan Anda</CardTitle>
                 </CardHeader>
                 <CardContent>
                    <div className="mb-4">
                        <p className="text-sm text-muted-foreground">Event</p>
                        <p className="text-lg font-semibold font-headline">{event.title}</p>
                    </div>
                     <div className="flex items-start gap-3 text-muted-foreground mb-4">
                        <Calendar className="h-5 w-5 mt-0.5" />
                        <span className='text-foreground'>{formatShortDate(event.startsAt)}</span>
                    </div>
                    <Separator className="my-4" />
                    <div>
                        <div className="flex items-start gap-3 text-muted-foreground mb-4">
                            <Users className="h-5 w-5 mt-0.5" />
                            <p className='text-foreground'>{participants.length} Peserta</p>
                        </div>
                        <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                            {participants.map((p: string, i: number) => (
                                <li key={i} className="text-foreground">{p}</li>
                            ))}
                        </ul>
                    </div>
                 </CardContent>
               </Card>
                <Card className="rounded-2xl shadow-lg border-surface">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Voucher &amp; Diskon</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                         {featuredVouchers.map(voucher => (
                            <Card key={voucher.code} className="bg-primary/5 border-primary/20 p-3 flex flex-col items-start justify-between">
                                <div className="flex items-start gap-3">
                                    <Percent className="h-5 w-5 text-primary mt-1" />
                                    <div>
                                        <p className="font-semibold text-sm">{voucher.title}</p>
                                        <p className="text-xs text-muted-foreground">{voucher.description}</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" onClick={() => applyVoucher(voucher)} className="mt-3 h-8 text-xs text-primary border-primary/50 hover:bg-primary/10">Pakai</Button>
                            </Card>
                        ))}
                       </div>

                       <Sheet open={isVoucherSheetOpen} onOpenChange={setVoucherSheetOpen}>
                          <SheetTrigger asChild>
                             <Button variant="link" className="p-0 h-auto">Lihat semua voucher</Button>
                          </SheetTrigger>
                          <SheetContent side="bottom" className="rounded-t-2xl max-h-[80vh]">
                            <SheetHeader>
                                <SheetTitle className="font-headline text-center">Pilih Voucher</SheetTitle>
                            </SheetHeader>
                             <ScrollArea className="h-[60vh] sm:h-auto">
                                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {availableVouchers.map(voucher => (
                                    <Card key={voucher.code} className="bg-primary/5 border-primary/20 p-3 flex flex-col items-start justify-between">
                                        <div className="flex items-start gap-3">
                                            <Percent className="h-5 w-5 text-primary mt-1" />
                                            <div>
                                                <p className="font-semibold">{voucher.title}</p>
                                                <p className="text-sm text-muted-foreground whitespace-normal">{voucher.description}</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm" onClick={() => applyVoucher(voucher)} className="mt-3 text-primary border-primary/50 hover:bg-primary/10">Pakai</Button>
                                    </Card>
                                ))}
                                </div>
                            </ScrollArea>
                          </SheetContent>
                        </Sheet>
                        
                        <Separator />
                        <div className="flex items-end gap-2 pt-2">
                            <div className="w-full space-y-1.5">
                                <Label htmlFor="voucher-code">Punya kode voucher lain?</Label>
                                <Input 
                                    id="voucher-code" 
                                    placeholder="e.g. DISKON50K" 
                                    value={voucherCode}
                                    onChange={e => setVoucherCode(e.target.value)}
                                />
                            </div>
                            <Button onClick={() => applyVoucher(voucherCode)}>Terapkan</Button>
                        </div>
                    </CardContent>
               </Card>
            </div>
            <div className='lg:col-span-1'>
                 <Card className="rounded-2xl shadow-lg border-surface lg:sticky top-24">
                    <CardHeader>
                    <CardTitle className="font-headline text-2xl">Rincian Biaya</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-muted-foreground">
                                <Ticket className="h-5 w-5" />
                                <span>Tiket ({quantity}x)</span>
                                </div>
                                <span className="font-medium">{formatCurrency(ticketTotal)}</span>
                            </div>
                            {donation > 0 && (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-muted-foreground">
                                        <Gift className="h-5 w-5" />
                                        <span>Donasi</span>
                                    </div>
                                    <span className="font-medium">{formatCurrency(donation)}</span>
                                </div>
                            )}
                             <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <span className='w-5' />
                                    <span>Biaya Platform</span>
                                </div>
                                <span className="font-medium">{formatCurrency(PLATFORM_FEE)}</span>
                            </div>
                             {discount > 0 && (
                                <div className="flex items-center justify-between text-primary">
                                    <div className="flex items-center gap-3">
                                        <Tag className="h-5 w-5" />
                                        <span>Diskon ({appliedVoucher})</span>
                                    </div>
                                    <span className="font-medium">-{formatCurrency(discount)}</span>
                                </div>
                            )}
                            <Separator className="my-2" />
                            <div className="flex items-center justify-between text-yellow-600 dark:text-secondary font-semibold">
                                <div className="flex items-center gap-3">
                                  <Award className="h-5 w-5" />
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <span className="underline decoration-dotted cursor-help">Poin didapat</span>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Poin dihitung dari harga tiket saja.</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                                <span>{pointsToEarn} poin 🎉</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-3 text-foreground font-bold text-lg">
                                    <Wallet className="h-5 w-5" />
                                    <span>Total</span>
                                </div>
                                <span className="font-bold text-lg">{formatCurrency(totalAmount)}</span>
                            </div>
                        </div>
                        <Button onClick={handlePayment} size="lg" className="w-full min-h-[48px] font-bold">
                                Lanjut
                        </Button>
                    </CardContent>
                </Card>
            </div>
          </div>
        </AnimatedSection>
      </div>
      <div className="h-16 md:hidden" />
    </>
  );
}


export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutFlow />
    </Suspense>
  )
}