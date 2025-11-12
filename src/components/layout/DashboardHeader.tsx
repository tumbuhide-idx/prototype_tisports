
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu, LogOut, LayoutDashboard, Settings, User, Home, Shield, PanelLeftClose, PanelRightClose, Bell, PlusCircle, Star, Ticket, Receipt } from 'lucide-react';
import { ShuttlecockIcon } from '@/components/shared/ShuttlecockIcon';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from '../ui/avatar';
import { DashboardMobileNav } from '@/components/user/DashboardMobileNav';
import { AdminMobileNav } from '@/components/admin/AdminMobileNav';
import React from 'react';


type DashboardHeaderProps = {
    onToggleSidebar?: () => void;
    isSidebarCollapsed?: boolean;
    isAdmin?: boolean;
}


export function DashboardHeader({ onToggleSidebar, isSidebarCollapsed, isAdmin = false }: DashboardHeaderProps) {
  const pathname = usePathname();

  const NotificationItem = ({ icon, text, link }: { icon: React.ReactNode, text: string, link: string }) => (
    <DropdownMenuItem asChild>
        <Link href={link} className='gap-3'>
            <div className='p-2 bg-primary-soft rounded-full text-primary'>{icon}</div>
            <p className='text-sm text-wrap flex-1'>{text}</p>
        </Link>
    </DropdownMenuItem>
  )

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 shadow-sm">
        
        <div className="flex items-center gap-4">
             <Link href={isAdmin ? "/admin" : "/dashboard"} className="flex items-center gap-2 font-semibold">
                <ShuttlecockIcon className="h-6 w-6 text-primary" />
                <span className="font-bold sm:inline-block font-headline text-lg">TI Sport</span>
            </Link>
        </div>

        <div className='ml-auto' />


      <div className="relative flex items-center gap-2 md:gap-4">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifikasi</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-screen max-w-sm sm:w-80">
                <DropdownMenuLabel>Notifikasi Terbaru</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <NotificationItem icon={<Ticket className="h-4 w-4"/>} text="Pesanan Fun Match Rabu Malam telah dikonfirmasi." link="/dashboard/pesanan/EVT001" />
                <NotificationItem icon={<Shield className="h-4 w-4"/>} text="Pembayaran Membership Batch 1 diterima." link="/dashboard/transaksi/TXN001" />
                <NotificationItem icon={<Star className="h-4 w-4"/>} text="Anda mendapatkan 75 poin baru." link="/dashboard/rewards" />
                 <DropdownMenuSeparator />
                 <DropdownMenuItem asChild>
                    <Link href="/dashboard/notifications" className='justify-center'>Lihat Semua Notifikasi</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggle />
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="overflow-hidden rounded-full">
                <Avatar className="h-9 w-9">
                    <AvatarFallback>{isAdmin ? 'A' : 'AP'}</AvatarFallback>
                </Avatar>
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{isAdmin ? 'Akun Admin' : 'Andi Pratama'}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {isAdmin ? (
                <DropdownMenuItem asChild>
                    <Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Tampilan Pengguna</Link>
                </DropdownMenuItem>
            ) : (
                <DropdownMenuItem asChild>
                    <Link href="/admin"><Shield className="mr-2 h-4 w-4" />Panel Admin</Link>
                </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
                <Link href="/"><Home className="mr-2 h-4 w-4" />Situs Publik</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href={isAdmin ? '/admin/settings' : '/dashboard/settings'}><Settings className="mr-2 h-4 w-4" />Pengaturan</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Keluar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
