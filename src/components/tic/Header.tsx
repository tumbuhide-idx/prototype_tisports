'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Menu, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import { ShuttlecockIcon } from './ShuttlecockIcon';
import { ThemeToggle } from './ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from '../ui/avatar';
import { cn } from '@/lib/utils';

const navLinks = [
    { href: "/events", label: "Events" },
    { href: "/community", label: "Community" },
    { href: "/gallery", label: "Gallery" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/collaboration", label: "Partnership" },
];

const IS_AUTHENTICATED_PROTOTYPE = true; 

const AuthNav = () => (
  <div className="flex items-center gap-2">
    <Button variant="ghost" asChild>
      <Link href="/login">Masuk</Link>
    </Button>
    <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
      <Link href="/signup">Daftar</Link>
    </Button>
  </div>
);

const UserNav = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
        <Avatar className="h-10 w-10">
          <AvatarFallback>AP</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56" align="end" forceMount>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">Andi Pratama</p>
          <p className="text-xs leading-none text-text-muted">
            andi.pratama@example.com
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link>
      </DropdownMenuItem>
       <DropdownMenuItem asChild>
        <Link href="/dashboard/settings"><Settings className="mr-2 h-4 w-4" />Pengaturan</Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
       <DropdownMenuItem>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Keluar</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);


export function Header() {
  const pathname = usePathname();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-soft bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center" style={{'--header-height': '4rem'} as React.CSSProperties}>
        <div className="mr-auto flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <ShuttlecockIcon className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block font-headline text-lg">
              TI Sport
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map(link => (
              <Button key={link.href} variant="ghost" asChild 
                className={cn(pathname.startsWith(link.href) ? 'text-primary' : 'text-text-muted', 'font-medium')}>
                <Link href={link.href}>
                  {link.label}
                </Link>
              </Button>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2 pl-6">
          <ThemeToggle />
          {IS_AUTHENTICATED_PROTOTYPE ? <UserNav /> : <AuthNav />}
        </div>

        <div className="flex items-center md:hidden">
           <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu />
                    <span className="sr-only">Buka menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw]">
                <SheetHeader className="mb-4 text-left">
                   <SheetTitle className="sr-only">Menu Mobile</SheetTitle>
                   <Link href="/" className="flex items-center space-x-2">
                        <ShuttlecockIcon className="h-6 w-6 text-primary" />
                        <span className="font-bold sm:inline-block font-headline text-lg">
                        TI Sport
                        </span>
                    </Link>
                </SheetHeader>
                <nav className="grid gap-6 text-lg font-medium mt-8">
                {navLinks.map(link => (
                    <SheetClose asChild key={link.href}>
                      <Link
                          href={link.href}
                          className="text-text-muted transition-colors hover:text-primary"
                      >
                          {link.label}
                      </Link>
                    </SheetClose>
                ))}
                </nav>
                <div className="mt-8 pt-6 border-t">
                  {IS_AUTHENTICATED_PROTOTYPE ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center w-full">
                           <Avatar className="h-10 w-10">
                              <AvatarFallback>AP</AvatarFallback>
                            </Avatar>
                           <div className="ml-3 text-left">
                              <p className="text-sm font-medium leading-none">Andi Pratama</p>
                              <p className="text-xs leading-none text-text-muted">
                                  Lihat profil
                              </p>
                           </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" forceMount>
                            <DropdownMenuItem asChild>
                              <Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                               <Link href="/dashboard/settings"><Settings className="mr-2 h-4 w-4" />Pengaturan</Link>
                            </DropdownMenuItem>
                             <DropdownMenuSeparator />
                             <DropdownMenuItem>
                               <LogOut className="mr-2 h-4 w-4" />
                               <span>Keluar</span>
                             </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                  ) : (
                    <div className="space-y-4">
                      <SheetClose asChild>
                        <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                          <Link href="/login">Masuk</Link>
                        </Button>
                      </SheetClose>
                       <SheetClose asChild>
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/signup">Daftar</Link>
                        </Button>
                      </SheetClose>
                    </div>
                  )}
                </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}
