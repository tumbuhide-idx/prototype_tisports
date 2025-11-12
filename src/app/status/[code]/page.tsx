'use client';

import Link from 'next/link';
import { notFound, useSearchParams, useParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QRTicket } from '@/components/booking/QRTicket';
import { CheckCircle2, XCircle, Clock, AlertCircle, Home, Download, Printer, Users, Calendar, Award } from 'lucide-react';
import eventsData from '@/../public/data/events.json';
import type { Event } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { formatShortDate, formatCurrency } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

const events: Event[] = eventsData;

const statusInfo = {
  REVIEW: {
    icon: <Clock className="h-16 w-16 text-yellow-500" />,
    title: 'Menunggu Konfirmasi',
    description: "Pesananmu telah diterima dan sedang menunggu konfirmasi pembayaran manual oleh admin. Kamu akan diberi tahu setelah terkonfirmasi.",
    bgColor: 'bg-yellow-500/5',
  },
  PAID: {
    icon: <CheckCircle2 className="h-16 w-16 text-green-500" />,
    title: 'Pembayaran Berhasil!',
    description: "Kamu berhasil terdaftar! Tunjukkan e-tiket QR ini kepada petugas di lokasi.",
    bgColor: 'bg-green-500/5',
  },
  REJECTED: {
    icon: <XCircle className="h-16 w-16 text-red-500" />,
    title: 'Pembayaran Ditolak',
    description: 'Maaf, pembayaranmu ditolak. Silakan hubungi admin untuk informasi lebih lanjut atau lakukan pemesanan ulang.',
    bgColor: 'bg-red-500/5',
  },
  EXPIRED: {
    icon: <AlertCircle className="h-16 w-16 text-gray-500" />,
    title: 'Waktu Pembayaran Habis',
    description: 'Maaf, waktu pembayaran telah berakhir. Silakan lakukan pemesanan ulang.',
    bgColor: 'bg-gray-500/5',
  },
};

const PointsReward = ({ points }: { points: string | null }) => {
    const [isShown, setIsShown] = useState(false);
    
    useEffect(() => {
        const timer = setTimeout(() => setIsShown(true), 500);
        return () => clearTimeout(timer);
    }, []);

    if (!points || !isShown || parseInt(points) === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
            className="rounded-full bg-success text-success-foreground px-4 py-2 font-semibold text-sm shadow-lg"
        >
            <div className="flex items-center gap-1.5">
                <Award className="h-4 w-4" /> +{points} Poin didapat!
            </div>
        </motion.div>
    )
}

const TransactionReceipt = ({ code: initialCode }: { code: keyof typeof statusInfo }) => {
  const code = initialCode.toUpperCase() as keyof typeof statusInfo;
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');
  const participantsParam = searchParams.get('participants');
  const points = searchParams.get('points');
  const totalAmount = searchParams.get('totalAmount');
  
  const event = events.find(e => e.id === eventId);
  
  let participants: string[] = [];
  if (participantsParam) {
    try {
      participants = JSON.parse(participantsParam);
    } catch (e) {
      console.error("Failed to parse participants", e);
    }
  }
  
  if (!statusInfo[code]) {
    notFound();
  }

  const { icon, title, description, bgColor } = statusInfo[code];

  if (!event && (code === 'PAID' || code === 'REVIEW')) {
     return (
        <div className={`min-h-[calc(100vh-var(--header-height,4rem))] flex items-center justify-center ${bgColor} py-12 px-4`}>
             <Card className="w-full max-w-md rounded-2xl shadow-xl text-center border-surface bg-background/80 backdrop-blur-xl">
                 <CardHeader><Skeleton className="h-8 w-12 mx-auto" /></CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-48 w-48 mx-auto" />
                    <Skeleton className="h-6 w-3/4 mx-auto" />
                </CardContent>
            </Card>
        </div>
     )
  }

  return (
    <div className={`min-h-[calc(100vh-var(--header-height,4rem))] flex items-center justify-center ${bgColor} py-12 px-4`}>
      <Card className="w-full max-w-md rounded-2xl shadow-xl text-center border-surface bg-background/80 backdrop-blur-xl overflow-hidden">
        <CardHeader className="pt-10">
          <div className="w-fit mx-auto">{icon}</div>
        </CardHeader>
        <CardContent className="space-y-6 pb-10 px-4 sm:px-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-headline font-bold">{title}</h1>
            <p className="text-muted-foreground [text-wrap:balance]">{description}</p>
          </div>

          {(code === 'PAID') && (
            <div className='flex justify-center'>
                 <PointsReward points={points} />
            </div>
          )}

          {(code === 'PAID' || code === 'REVIEW') && event && (
            <Card className="text-left bg-surface/50">
              <CardHeader>
                <CardTitle className="font-headline text-lg">E-Ticket / Bukti Transaksi</CardTitle>
                <CardDescription>TXN-20240801-001</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {code === 'PAID' && <QRTicket />}
                {code === 'REVIEW' && (
                    <div className="aspect-square w-full bg-muted rounded-lg flex items-center justify-center text-center p-4">
                        <p className="text-muted-foreground">QR code akan tersedia setelah pembayaran dikonfirmasi.</p>
                    </div>
                )}
                 <Separator />
                <div className="space-y-3">
                    <p className="font-semibold">{event.title}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{formatShortDate(event.startsAt)}</span>
                    </div>
                     <div className="flex items-start gap-3 text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mt-0.5" />
                        <div>
                             <p className="font-medium text-foreground">{participants.length} Peserta</p>
                             <ul className="list-disc list-inside">
                                {participants.map((p, i) => <li key={i}>{p}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
                 <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="w-full"><Printer className="mr-2 h-4 w-4" /> Cetak</Button>
                    <Button variant="outline" className="w-full"><Download className="mr-2 h-4 w-4" /> Unduh</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Button asChild className="w-full min-h-[48px] uppercase font-bold tracking-wider">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};


export default function StatusPage() {
    const params = useParams<{ code: string }>();
    const code = params.code.toUpperCase();
    
    if (!(code in statusInfo)) {
        notFound();
    }

    const validCode = code as keyof typeof statusInfo;

    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><p>Loading...</p></div>}>
            <TransactionReceipt code={validCode} />
        </Suspense>
    )
}