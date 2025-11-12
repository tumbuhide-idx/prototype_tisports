'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/tic/Header';
import { Footer } from '@/components/tic/Footer';
import { BottomNav } from '@/components/tic/BottomNav';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const excludedPaths = ['/dashboard', '/admin', '/login', '/signup', '/forgot-password', '/reset-password', '/status', '/onboarding'];
  const isExcluded = excludedPaths.some(path => pathname.startsWith(path));
  const isBookingFlow = /\/(book|pay|checkout)\//.test(pathname);
  const showNavigation = !isExcluded && !isBookingFlow;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {showNavigation ? (
          <div className="relative flex min-h-screen flex-col bg-background-soft">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        ) : (
          <main>{children}</main>
        )}
        {showNavigation && <BottomNav />}
      </motion.div>
    </AnimatePresence>
  );
}
