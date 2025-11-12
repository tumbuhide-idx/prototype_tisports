'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // A more robust solution might involve listening to router events
    // but for a prototype, this effect on pathname change is sufficient.
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 750); // Increased duration
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[9999] pointer-events-none">
      <motion.div
        initial={{ width: '0%' }}
        animate={loading ? { width: '70%', transition: { duration: 2, ease: 'easeOut' } } : { width: '100%', transition: { duration: 0.3, ease: 'easeIn' } }}
        className="h-full bg-primary shadow-lg shadow-primary/50"
      />
    </div>
  );
}
