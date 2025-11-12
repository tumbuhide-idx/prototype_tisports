import { notFound } from 'next/navigation';
import { newsItems } from '@/lib/news-data';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import React from 'react';

type NewsDetailPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return newsItems.map((item) => ({
    slug: item.slug,
  }));
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const resolvedParams = await params;
  const item = newsItems.find((i) => i.slug === resolvedParams.slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="bg-background-soft">
      <AnimatedSection as="div" className="w-full bg-surface">
        <div className="container py-16 md:py-24 text-center">
            <div className="flex justify-center mb-4">
                <Badge variant={item.categoryVariant} className="text-sm">{item.category}</Badge>
            </div>
            <h1 className="font-headline text-3xl md:text-5xl font-bold [text-wrap:balance]">{item.title}</h1>
            <p className="mt-4 text-text-muted">{item.date}</p>
        </div>
      </AnimatedSection>

      <AnimatedSection as="div" className="container py-16 md:py-24 max-w-3xl mx-auto">
        <div className="prose dark:prose-invert max-w-none text-lg">
          <div dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>
        
        <div className="mt-16 text-center">
            <Button asChild variant="outline">
                <Link href="/news">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali ke Semua Berita
                </Link>
            </Button>
        </div>
      </AnimatedSection>
    </div>
  );
}
