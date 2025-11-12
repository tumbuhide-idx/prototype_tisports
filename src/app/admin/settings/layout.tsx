
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { SettingsNav } from '@/app/dashboard/settings/_components/SettingsNav';

const adminSidebarNavItems = [
  {
    title: 'Umum',
    href: '/admin/settings',
  },
  {
    title: 'Pembayaran',
    href: '/admin/settings/payment',
  },
  {
    title: 'Peran & Tim',
    href: '/admin/settings/roles',
  },
  {
    title: 'Template Notifikasi',
    href: '/admin/settings/templates',
  },
];


export default function AdminSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnimatedSection>
      <div className="space-y-8">
        <header>
          <h1 className="font-headline text-3xl md:text-4xl font-bold">
            Pengaturan Admin
          </h1>
          <p className="text-text-muted mt-2">
            Kelola pengaturan umum situs, pembayaran, dan tim.
          </p>
        </header>

        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SettingsNav items={adminSidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-4xl">{children}</div>
        </div>
      </div>
    </AnimatedSection>
  );
}
