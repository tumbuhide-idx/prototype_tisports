
'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminBottomNav } from '@/components/admin/AdminBottomNav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <DashboardHeader isAdmin onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} isSidebarCollapsed={isSidebarCollapsed} />
        <div className="flex flex-1">
          <AdminSidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
           <motion.main
              initial={false}
              animate={{
                paddingLeft: isSidebarCollapsed ? 'calc(4.5rem + 1rem)' : '14rem',
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="flex-1 flex-col gap-4 p-4 sm:p-6 bg-muted/30 pb-20 hidden sm:flex"
            >
            <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </motion.main>
          <main className="flex-1 flex flex-col gap-4 p-4 sm:p-6 bg-muted/30 pb-20 sm:hidden">
              <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
                    <motion.div
                    key={pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
          </main>
        </div>
      </div>
      <AdminBottomNav />
    </>
  );
}
