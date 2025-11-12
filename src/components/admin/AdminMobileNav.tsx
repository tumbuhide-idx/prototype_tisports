
'use client';

import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  CalendarPlus,
  Ticket,
  Settings,
  BarChart3,
  Megaphone,
  LifeBuoy,
  LogOut,
  Home,
  DollarSign
} from 'lucide-react';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { SheetClose } from '../ui/sheet';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Card, CardContent } from '../ui/card';

const primaryMenuItems = [
    { href: '/admin', label: 'Overview', icon: <LayoutDashboard /> },
    { href: '/admin/events', label: 'Event', icon: <CalendarPlus /> },
    { href: '/admin/bookings', label: 'Booking', icon: <Ticket /> },
    { href: '/admin/transactions', label: 'Transaksi', icon: <DollarSign /> },
    { href: '/admin/users', label: 'Pengguna', icon: <Users /> },
];

const secondaryMenuItems = [
    { href: '/admin/reports', label: 'Laporan', icon: <BarChart3 /> },
    { href: '/admin/announcements', label: 'Pengumuman', icon: <Megaphone /> },
    { href: '/admin/support', label: 'Dukungan', icon: <LifeBuoy /> },
    { href: '/admin/settings', label: 'Pengaturan', icon: <Settings /> },
];


const AdminSummaryPanel = () => (
    <div className="p-4 bg-muted/50">
        <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-12 w-12 border-2 border-primary">
                <AvatarFallback className="bg-background text-lg font-bold">A</AvatarFallback>
            </Avatar>
            <div>
                <h3 className="font-bold">Admin</h3>
                <Badge variant="secondary">Super Admin</Badge>
            </div>
        </div>
        <Card className="bg-background">
            <CardContent className="p-3 grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-lg hover:bg-muted">
                    <p className="text-xs text-muted-foreground">Event Aktif</p>
                    <p className="font-bold text-lg text-primary">8</p>
                </div>
                 <div className="p-2 rounded-lg hover:bg-muted">
                    <p className="text-xs text-muted-foreground">Booking Tertunda</p>
                    <p className="font-bold text-lg text-primary">12</p>
                </div>
                 <div className="p-2 rounded-lg hover:bg-muted">
                    <p className="text-xs text-muted-foreground">Order Belum Dibayar</p>
                    <p className="font-bold text-lg text-primary">3</p>
                </div>
            </CardContent>
        </Card>
    </div>
)


export function AdminMobileNav() {
  const pathname = usePathname();

  return (
    <>
        <AdminSummaryPanel />
        <Separator />
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
            <nav className="flex flex-col gap-1">
                <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">Menu</p>
                {primaryMenuItems.map(item => (
                     <SheetClose asChild key={item.href}>
                        <Link href={item.href} className={cn("flex items-center gap-4 p-3 rounded-lg text-foreground hover:bg-muted text-base", pathname === item.href && "bg-muted text-primary font-bold")}>
                            <div className="text-primary">{item.icon}</div>
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    </SheetClose>
                ))}
            </nav>
            <Separator />
            <nav className="flex flex-col gap-1">
                <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">Alat</p>
                {secondaryMenuItems.map(item => (
                    <SheetClose asChild key={item.href}>
                        <Link href={item.href} className={cn("flex items-center gap-4 p-3 rounded-lg text-foreground hover:bg-muted text-base", pathname.startsWith(item.href) && "bg-muted text-primary font-bold")}>
                            <div className="text-primary">{item.icon}</div>
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    </SheetClose>
                ))}
            </nav>
             <Separator />
             <nav className="flex flex-col gap-1">
                <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">Ganti Tampilan</p>
                 <SheetClose asChild>
                    <Link href="/dashboard" className="flex items-center gap-4 p-3 rounded-lg text-foreground hover:bg-muted text-base">
                        <div className="text-primary"><Home /></div>
                        <span className="font-medium">Dasbor Pengguna</span>
                    </Link>
                </SheetClose>
            </nav>
        </div>
        <Separator />
        <div className="p-4">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                <LogOut className="mr-4 h-5 w-5" />
                Keluar
            </Button>
        </div>
    </>
  );
}
