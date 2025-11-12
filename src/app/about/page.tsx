
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tentang TI Sport',
  description: 'Misi, visi, dan peta jalan TI Sport dalam membangun ekosistem olahraga modern, dimulai dari bulu tangkis.',
};

export default function AboutPage() {
  const values = [
    'Komunitas Aktif & Terlibat',
    'Pengalaman Digital & Sinematik',
    'Ekosistem yang Terintegrasi',
    'Kolaborasi & Kemitraan Strategis'
  ];

  const roadmaps = [
    { phase: 'Q3 2024', title: 'Peluncuran Platform & Komunitas Awal', desc: 'Merilis platform v1, membangun komunitas inti melalui event mingguan di 1-2 venue partner.' },
    { phase: 'Q4 2024', title: 'Pengembangan Fitur & Ekspansi Komunitas', desc: 'Meluncurkan sistem membership, program poin & reward, dan memperluas jangkauan ke 5 venue partner.' },
    { phase: 'Q1 2025', title: 'Ekspansi Cabang Olahraga & Brand Partnership', desc: 'Memperkenalkan cabang olahraga baru (Futsal/Basket) dan mengamankan 3+ brand partner strategis.' },
    { phase: 'Q2 2025', title: 'Aplikasi Mobile & Turnamen Skala Besar', desc: 'Merilis aplikasi mobile (iOS & Android) dan menyelenggarakan turnamen antar-komunitas pertama.' }
  ];

  return (
    <div className="bg-background-soft">
      <AnimatedSection as="div" className="w-full bg-surface">
        <div className="container py-16 md:py-24 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Bangun Ekosistem Olahraga Modern</h1>
          <p className="mt-4 max-w-3xl mx-auto text-text-muted md:text-lg [text-wrap:balance]">
            Lebih dari sekadar aplikasi booking, TI Sport adalah agensi kreatif yang membangun ekosistem olahraga dari hulu ke hilir.
          </p>
        </div>
      </AnimatedSection>
      
      <AnimatedSection as="div" className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
                <h2 className="font-headline text-3xl font-bold">Visi & Misi Kami</h2>
                <p className="text-text-muted text-lg">Menciptakan wadah olahraga yang seru, profesional, dan kreatif, di mana olahraga bukan hanya aktivitas fisik—tapi juga media sosial, networking, dan konten digital.</p>
                <div className="space-y-3 pt-4">
                    {values.map(value => (
                        <div key={value} className="flex items-center gap-3">
                            <CheckCircle className="h-6 w-6 text-success"/>
                            <span className="font-semibold">{value}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Card className="shadow-lg bg-surface">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Fokus Utama Kami</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>Komunitas:</strong> Membangun komunitas olahraga yang aktif, positif, dan inklusif untuk segmen Millennial & Gen-Z urban.</p>
                    <p><strong>Konten:</strong> Memproduksi konten foto & video berkualitas sinematik untuk setiap event, mengangkat citra olahraga amatir.</p>
                    <p><strong>Teknologi:</strong> Mengembangkan platform digital yang memudahkan akses, pembayaran, dan interaksi sosial dalam olahraga.</p>
                </CardContent>
            </Card>
        </div>
      </AnimatedSection>

      <AnimatedSection as="div" className="py-16 md:py-24 bg-surface">
        <div className="container">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="font-headline text-3xl font-bold">Peta Jalan (Roadmap)</h2>
                <p className="mt-4 text-text-muted md:text-lg">
                    Langkah demi langkah kami dalam membangun ekosistem olahraga masa depan.
                </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {roadmaps.map((item, index) => (
                    <AnimatedSection key={item.phase} delay={index * 0.1}>
                        <Card className="h-full bg-background">
                            <CardHeader>
                                <span className="font-bold text-primary text-sm">{item.phase}</span>
                                <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-text-muted">{item.desc}</p>
                            </CardContent>
                        </Card>
                    </AnimatedSection>
                ))}
            </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
