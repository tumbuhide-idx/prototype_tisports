
'use client';

import Link from 'next/link';
import { Settings, LogOut, Gift, HelpCircle, Users, GalleryVertical, Bell, Award, History, Share2, User } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { SheetClose } from '../ui/sheet';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const quickActionItems = [
    { href: '/dashboard/membership', label: 'Membership', icon: <Gift /> },
    { href: '/dashboard/rewards', label: 'Poin & Hadiah', icon: <Award /> },
    { href: '/dashboard/referral', label: 'Referral', icon: <Share2 /> },
];

const utilityItems = [
    { href: '/dashboard/profile', label: 'Profil Saya', icon: <User /> },
    { href: '/dashboard/notifications', label: 'Notifikasi', icon: <Bell /> },
    { href: '/dashboard/settings', label: 'Pengaturan', icon: <Settings /> },
    { href: '/faq', label: 'Bantuan & FAQ', icon: <HelpCircle /> },
];

export function DashboardMobileNav() {
  const pathname = usePathname();

  return (
    <>
        <div className="flex flex-col h-[220px] justify-end bg-gradient-to-b from-secondary to-primary text-primary-foreground p-6">
            <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 border-2 border-primary-foreground/50">
                    <AvatarFallback className="bg-transparent text-xl font-bold">AP</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="text-xl font-bold">Andi Pratama</h3>
                    <p className="text-sm text-primary-foreground/80">andi.pratama@example.com</p>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                    <p className="text-xs text-primary-foreground/80 uppercase tracking-wider">Tier</p>
                    <p className="font-bold">Silver</p>
                </div>
                <div>
                    <p className="text-xs text-primary-foreground/80 uppercase tracking-wider">Poin</p>
                    <p className="font-bold">1,250</p>
                </div>
            </div>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-4">
            <nav className="flex flex-col gap-1">
                 <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">Menu</p>
                {quickActionItems.map(item => (
                    <SheetClose asChild key={item.href}>
                        <Link href={item.href} className={cn("flex items-center gap-4 p-3 rounded-lg text-foreground hover:bg-muted text-base", pathname.startsWith(item.href) && "bg-muted text-primary")}>
                            <div className="text-primary">{item.icon}</div>
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    </SheetClose>
                ))}
            </nav>
            <Separator />
            <nav className="flex flex-col gap-1">
                 <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">Lainnya</p>
                {utilityItems.map(item => (
                     <SheetClose asChild key={item.href}>
                        <Link href={item.href} className={cn("flex items-center gap-4 p-3 rounded-lg text-foreground hover:bg-muted text-base", pathname.startsWith(item.href) && "bg-muted text-primary")}>
                            <div className="text-primary">{item.icon}</div>
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    </SheetClose>
                ))}
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
