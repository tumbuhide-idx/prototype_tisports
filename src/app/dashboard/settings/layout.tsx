
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { SettingsNav } from './_components/SettingsNav';

const sidebarNavItems = [
  {
    title: 'Profil',
    href: '/dashboard/settings',
  },
  {
    title: 'Keamanan',
    href: '/dashboard/settings/security',
  },
  {
    title: 'Notifikasi',
    href: '/dashboard/settings/notifications',
  },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnimatedSection>
      <div className="space-y-8">
        <header>
          <h1 className="font-headline text-3xl md:text-4xl font-bold">
            Pengaturan
          </h1>
          <p className="text-text-muted mt-1">
            Kelola akun, preferensi, dan keamanan Anda.
          </p>
        </header>

        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SettingsNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </AnimatedSection>
  );
}
