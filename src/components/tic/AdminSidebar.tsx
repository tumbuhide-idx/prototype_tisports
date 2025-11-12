
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    LayoutDashboard,
    CalendarPlus,
    Users,
    Ticket,
    BarChart3,
    Megaphone,
    Settings,
    LifeBuoy,
    PanelLeftClose,
    PanelRightClose,
    DollarSign,
} from 'lucide-react';
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
    { href: '/admin', label: 'Overview', icon: <LayoutDashboard className="h-5 w-5" /> },
    { href: '/admin/events', label: 'Event', icon: <CalendarPlus className="h-5 w-5" /> },
    { href: '/admin/bookings', label: 'Booking', icon: <Ticket className="h-5 w-5" /> },
    { href: '/admin/transactions', label: 'Transaksi', icon: <DollarSign className="h-5 w-5" /> },
    { href: '/admin/users', label: 'Pengguna', icon: <Users className="h-5 w-5" /> },
    { href: '/admin/reports', label: 'Laporan', icon: <BarChart3 className="h-5 w-5" /> },
    { href: '/admin/announcements', label: 'Pengumuman', icon: <Megaphone className="h-5 w-5" /> },
];

const secondaryNavItems = [
    { href: '/admin/support', label: 'Dukungan', icon: <LifeBuoy className="h-5 w-5" /> },
    { href: '/admin/settings', label: 'Pengaturan', icon: <Settings className="h-5 w-5" /> },
]

export function AdminSidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const sidebarVariants = {
    collapsed: { width: '4.5rem', transition: { duration: 0.3 } },
    expanded: { width: '14rem', transition: { duration: 0.3 } },
  };

  const navItemVariants = {
    collapsed: { opacity: 0, x: -10, transition: { duration: 0.2 } },
    expanded: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.2 } },
  };
  
  const NavLink = ({ item }: { item: { href: string; label: string; icon: React.ReactNode }}) => {
    const isActive = (pathname === item.href) || (item.href !== '/admin' && pathname.startsWith(item.href));
    
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
        className="hidden sm:flex fixed left-0 top-16 h-[calc(100vh-4rem)] z-40"
    >
        <div className="flex h-full flex-col border-r bg-background">
            <div className="flex-grow overflow-y-auto overflow-x-hidden">
                <nav className="flex-1 py-4 px-3 space-y-1">
                    {navItems.map((item) => <NavLink key={item.href} item={item} />)}
                </nav>
            </div>
            <nav className="border-t py-4 px-3 space-y-1">
                 {secondaryNavItems.map((item) => <NavLink key={item.href} item={item} />)}
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
