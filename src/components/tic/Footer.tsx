'use client';

import Link from 'next/link';
import { AnimatedSection } from './AnimatedSection';
import { ShuttlecockIcon } from './ShuttlecockIcon';

export function Footer() {
    const navLinks = [
        { href: "/about", label: "Tentang Kami" },
        { href: "/events", label: "Events" },
        { href: "/gallery", label: "Galeri" },
        { href: "/leaderboard", label: "Papan Peringkat" },
        { href: "/collaboration", label: "Partnership" },
        { href: "/contact", label: "Kontak" },
    ];
    
    const legalLinks = [
        { href: "/privacy-policy", label: "Kebijakan Privasi" },
        { href: "/terms-of-service", label: "Syarat & Ketentuan" },
        { href: "/faq", label: "FAQ" },
    ]

  return (
    <footer className="border-t bg-surface">
       <AnimatedSection as="div" className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
                <Link href="/" className="flex items-center space-x-2 mb-4">
                    <ShuttlecockIcon className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline text-lg">
                    TI Sport
                    </span>
                </Link>
                <p className="max-w-md text-text-muted">
                    Ekosistem olahraga kreatif yang menyatukan komunitas, venue, dan brand melalui pengalaman digital yang sinematik.
                </p>
            </div>
            <div>
                <h4 className="font-headline font-semibold mb-4">Jelajahi</h4>
                <nav className="flex flex-col gap-2">
                    {navLinks.map(link => (
                         <Link key={link.href} href={link.href} className="text-text-muted hover:text-primary transition-colors text-sm">{link.label}</Link>
                    ))}
                </nav>
            </div>
            <div>
                 <h4 className="font-headline font-semibold mb-4">Legal & Bantuan</h4>
                <nav className="flex flex-col gap-2">
                    {legalLinks.map(link => (
                         <Link key={link.href} href={link.href} className="text-text-muted hover:text-primary transition-colors text-sm">{link.label}</Link>
                    ))}
                </nav>
            </div>
        </div>
        <div className="mt-8 pt-8 border-t">
            <p className="text-center text-sm text-text-muted">
            © {new Date().getFullYear()} TI Sport by Tumbuh IDE Creative Digital. All rights reserved.
            </p>
        </div>
      </AnimatedSection>
    </footer>
  );
}
