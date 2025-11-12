
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CalendarDays, Newspaper, GalleryVertical, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function BottomNav() {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/', icon: <Home size={24} />, label: 'Beranda' },
    { href: '/events', icon: <CalendarDays size={24} />, label: 'Event' },
    { href: '/gallery', icon: <GalleryVertical size={24} />, label: 'Galeri' },
    { href: '/news', icon: <Newspaper size={24} />, label: 'Berita' },
  ];

  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t bg-background/95 backdrop-blur-sm"
    >
      <div className="grid h-16 grid-cols-4 w-full max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = (item.href === '/' && pathname === '/') || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted"
            >
              <div className={cn("mb-1 transition-colors", isActive ? "text-primary" : "text-muted-foreground")}>
                {item.icon}
              </div>
              <span className={cn("text-xs transition-colors", isActive ? "text-primary font-semibold" : "text-muted-foreground")}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </motion.nav>
  );
}
