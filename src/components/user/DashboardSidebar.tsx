
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Ticket, User, Settings, Gift, Star, HelpCircle, PanelLeftClose, PanelRightClose, LogOut, Shield, Receipt, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from '../ui/button';

type SidebarProps = {
    isCollapsed: boolean;
    onToggle: () => void;
};

const navItems = [
    { href: '/dashboard', label: 'Beranda', icon: <Home className="h-5 w-5" /> },
    { href: '/dashboard/pesanan', label: 'Pesanan', icon: <Ticket className="h-5 w-5" /> },
    { href: '/dashboard/transaksi', label: 'Transaksi', icon: <Receipt className="h-5 w-5" /> },
    { href: '/dashboard/membership', label: 'Membership', icon: <Gift className="h-5 w-5" /> },
    { href: '/dashboard/rewards', label: 'Poin & Hadiah', icon: <Star className="h-5 w-5" /> },
    { href: '/dashboard/referral', label: 'Referral', icon: <Share2 className="h-5 w-5" /> },
];

const secondaryNavItems = [
    { href: '/dashboard/profile', label: 'Profil Saya', icon: <User className="h-5 w-5" /> },
    { href: '/dashboard/settings', label: 'Pengaturan', icon: <Settings className="h-5 w-5" /> },
    { href: '/faq', label: 'Bantuan', icon: <HelpCircle className="h-5 w-5" /> },
]

export function DashboardSidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const sidebarWidth = isCollapsed ? '4.5rem' : '16rem';

  const sidebarVariants = {
    collapsed: { width: '4.5rem', transition: { duration: 0.3 } },
    expanded: { width: '16rem', transition: { duration: 0.3 } },
  };

  const navItemVariants = {
    collapsed: { opacity: 0, x: -10, transition: { duration: 0.2 } },
    expanded: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.2 } },
  };
  
  const NavLink = ({ item }: { item: { href: string; label: string; icon: React.ReactNode }}) => {
    const isActive = (pathname === item.href) || (item.href !== '/dashboard' && pathname.startsWith(item.href));
    
    const linkContent = (
         <Link
            href={item.href}
            className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-primary hover:bg-primary/10',
                isActive && 'bg-primary/10 text-primary font-medium'
            )}
        >
            {item.icon}
            <AnimatePresence>
                {!isCollapsed && (
                    <motion.span variants={navItemVariants} initial="collapsed" animate="expanded" exit="collapsed" className="whitespace-nowrap">
                        {item.label}
                    </motion.span>
                )}
            </AnimatePresence>
        </Link>
    )

    if (isCollapsed) {
        return (
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    }

    return linkContent;
  }

  return (
    <motion.aside
        variants={sidebarVariants}
        initial={false}
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        className="hidden md:flex fixed left-0 top-16 h-[calc(100vh-4rem)] z-30"
        style={{ '--sidebar-width': sidebarWidth } as React.CSSProperties}
    >
        <div className="flex h-full flex-col border-r bg-background">
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-3">
                <nav className="grid items-start gap-1">
                    {navItems.map((item) => <NavLink key={item.href} item={item} />)}
                </nav>
            </div>
            <nav className="mt-auto grid items-start gap-1 p-3">
                 {secondaryNavItems.map((item) => <NavLink key={item.href} item={item} />)}
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="/admin" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10">
                                <Shield className="h-5 w-5" />
                                <AnimatePresence>
                                {!isCollapsed && (
                                        <motion.span variants={navItemVariants} initial="collapsed" animate="expanded" exit="collapsed" className="whitespace-nowrap">
                                            Admin
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Link>
                        </TooltipTrigger>
                         {isCollapsed && <TooltipContent side="right">Admin Panel</TooltipContent>}
                    </Tooltip>
                </TooltipProvider>

                 <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-destructive hover:bg-destructive/10">
                                <LogOut className="h-5 w-5" />
                                <AnimatePresence>
                                {!isCollapsed && (
                                        <motion.span variants={navItemVariants} initial="collapsed" animate="expanded" exit="collapsed" className="whitespace-nowrap">
                                            Keluar
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        </TooltipTrigger>
                         {isCollapsed && <TooltipContent side="right">Keluar</TooltipContent>}
                    </Tooltip>
                </TooltipProvider>
                 <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                             <Button 
                                onClick={onToggle} 
                                variant="ghost" 
                                className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-primary hover:bg-primary/10 justify-start"
                            >
                                {isCollapsed ? <PanelRightClose className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
                                 <AnimatePresence>
                                    {!isCollapsed && (
                                        <motion.span variants={navItemVariants} initial="collapsed" animate="expanded" exit="collapsed" className="whitespace-nowrap">
                                            Tutup
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Button>
                        </TooltipTrigger>
                         {isCollapsed && <TooltipContent side="right">Buka</TooltipContent>}
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </div>
    </motion.aside>
  );
}
