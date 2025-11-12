
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface SettingsNavProps {
  items: {
    href: string;
    title: string;
  }[];
}

export function SettingsNav({ items }: SettingsNavProps) {
  const pathname = usePathname();

  return (
    <ScrollArea className="w-full lg:w-auto">
      <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 pb-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted',
              pathname === item.href
                ? 'bg-muted font-semibold text-primary'
                : 'text-text-muted hover:text-foreground'
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <ScrollBar orientation="horizontal" className="lg:hidden" />
    </ScrollArea>
  );
}
