import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import { ClientLayout } from '@/components/layout/ClientLayout';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { PageLoader } from '@/components/layout/PageLoader';
import './globals.css';

export const metadata: Metadata = {
  title: 'TI Sport - Main Bareng, Tumbuh Bareng',
  description: 'Booking bulu tangkis jadi gampang. Pilih, bayar, main.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <PageLoader />
          <ClientLayout>
            {children}
          </ClientLayout>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
