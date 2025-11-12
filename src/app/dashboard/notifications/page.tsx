
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Bell, Ticket, Shield, Star, Calendar } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const notifications = [
    { 
        icon: <Ticket className="h-5 w-5"/>, 
        text: "Pesanan Fun Match Rabu Malam telah dikonfirmasi.", 
        link: "/dashboard/pesanan/EVT001",
        date: "2 jam lalu",
        read: false,
    },
    { 
        icon: <Shield className="h-5 w-5"/>, 
        text: "Pembayaran Membership Batch 1 berhasil diterima.", 
        link: "/dashboard/transaksi/TXN001",
        date: "1 hari lalu",
        read: false,
    },
    { 
        icon: <Star className="h-5 w-5"/>, 
        text: "Anda mendapatkan 75 poin baru dari booking terakhir.", 
        link: "/dashboard/rewards",
        date: "1 hari lalu",
        read: true,
    },
    { 
        icon: <Calendar className="h-5 w-5"/>, 
        text: "Jadwal event baru untuk bulan Desember telah dirilis.", 
        link: "/events",
        date: "3 hari lalu",
        read: true,
    },
];

export default function NotificationsPage() {
  return (
    <AnimatedSection>
        <div className="space-y-8">
            <header>
                <h1 className="font-headline text-3xl md:text-4xl font-bold">Notifikasi</h1>
                <p className="text-text-muted mt-1">Semua pembaruan penting untuk akun Anda.</p>
            </header>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Terbaru</CardTitle>
                        <Button variant="link" className="p-0 h-auto">Tandai semua sudah dibaca</Button>
                    </div>
                </CardHeader>
                <CardContent className="divide-y">
                    {notifications.map((notif, index) => (
                        <Link key={index} href={notif.link} className={cn(
                            "block p-4 -mx-4 hover:bg-muted/50",
                            !notif.read && "bg-primary/5"
                        )}>
                            <div className="flex items-start gap-4">
                                <div className={cn("p-2 rounded-full mt-1", !notif.read ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground")}>
                                    {notif.icon}
                                </div>
                                <div className="flex-1">
                                    <p className="text-foreground">{notif.text}</p>
                                    <p className="text-sm text-muted-foreground mt-1">{notif.date}</p>
                                </div>
                                {!notif.read && (
                                    <div className="h-2.5 w-2.5 rounded-full bg-primary mt-2"></div>
                                )}
                            </div>
                        </Link>
                    ))}
                </CardContent>
            </Card>

             {notifications.length === 0 && (
                <Card className="text-center py-16">
                     <CardContent className="space-y-4">
                        <Bell className="h-12 w-12 mx-auto text-muted-foreground" />
                        <div>
                            <p className="font-semibold">Tidak Ada Notifikasi</p>
                            <p className="text-text-muted text-sm mt-1">Semua notifikasi Anda akan muncul di sini.</p>
                        </div>
                   </CardContent>
                </Card>
             )}
        </div>
    </AnimatedSection>
  );
}
