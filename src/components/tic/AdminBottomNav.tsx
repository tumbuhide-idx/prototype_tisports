
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, Ticket, MoreHorizontal, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { AdminMobileNav } from './AdminMobileNav';

export function AdminBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', icon: <LayoutDashboard size={24} />, label: 'Overview' },
    { href: '/admin/events', icon: <Calendar size={24} />, label: 'Event' },
    { href: '/admin/bookings', icon: <Ticket size={24} />, label: 'Booking' },
  ];

  if (!pathname.startsWith('/admin')) {
      return null;
  }

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-40 sm:hidden border-t bg-background/95 backdrop-blur-sm"
    >
      <div className="grid h-16 grid-cols-4 w-full max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = (item.href === '/admin' && pathname === '/admin') || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex flex-col items-center justify-center px-2 hover:bg-muted"
            >
              <div className={cn("mb-1 transition-colors", isActive ? "text-primary" : "text-muted-foreground")}>
                {item.icon}
              </div>
              <span className={cn("text-[10px] text-center transition-colors", isActive ? "text-primary font-semibold" : "text-muted-foreground")}>
                {item.label}
              </span>
            </Link>
          );
        })}
        <Sheet>
          <SheetTrigger asChild>
            <button className="inline-flex flex-col items-center justify-center px-2 hover:bg-muted">
              <div className="mb-1 text-muted-foreground">
                <MoreHorizontal size={24} />
              </div>
              <span className="text-[10px] text-center text-muted-foreground">Lainnya</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs flex flex-col p-0 w-[85vw]">
             <SheetHeader className='p-4 border-b'>
                <SheetTitle>Menu Admin</SheetTitle>
            </SheetHeader>
            <AdminMobileNav />
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  );
}
