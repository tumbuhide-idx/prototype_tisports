import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { cn } from '@/lib/utils';
import { newsItems } from '@/lib/news-data';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';


export default function NewsPage() {
    const latestNews = newsItems[0];
    const otherNews = newsItems.slice(1);
    const heroImage = PlaceHolderImages.find(p => p.id === 'gallery-2');

  return (
    <div className="bg-background">
      <AnimatedSection as="div" className="w-full bg-surface/50">
        <div className="container py-16 md:py-24 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Berita & Pengumuman</h1>
          <p className="mt-4 max-w-3xl mx-auto text-text-muted md:text-lg [text-wrap:balance]">
            Ikuti berita terbaru, pengumuman penting, dan artikel menarik seputar komunitas TI Sport.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection as="div" className="container py-16 md:py-24">
        {/* Latest News Hero */}
        <Link href={`/news/${latestNews.slug}`} className="block group mb-16">
            <Card className="grid md:grid-cols-2 overflow-hidden bg-surface border-border-soft hover:border-primary/50 transition-all duration-300">
                <div className="relative aspect-[16/10] md:aspect-auto">
                    {heroImage && 
                        <Image 
                            src={heroImage.imageUrl}
                            alt={latestNews.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            data-ai-hint={heroImage.imageHint}
                        />
                    }
                </div>
                <div className="flex flex-col p-6 md:p-10">
                    <CardHeader className="p-0">
                        <Badge variant={latestNews.categoryVariant as any} className="w-fit">{latestNews.category}</Badge>
                        <CardTitle className="font-headline text-2xl md:text-3xl pt-2">{latestNews.title}</CardTitle>
                        <CardDescription className="pt-1">{latestNews.date}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow mt-4">
                        <p className="text-text-muted">{latestNews.description}</p>
                    </CardContent>
                    <CardFooter className="p-0 mt-6">
                        <span className="font-semibold text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                            Baca Selengkapnya <ArrowRight className="h-4 w-4" />
                        </span>
                    </CardFooter>
                </div>
            </Card>
        </Link>
        
        {/* Other News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherNews.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 0.1} className="flex">
                 <Card className="flex flex-col w-full transition-colors duration-300 bg-surface border-border-soft hover:border-primary/50">
                    <CardHeader>
                        <Badge variant={item.categoryVariant as any} className="w-fit">{item.category}</Badge>
                        <CardTitle className="font-headline text-xl pt-2">
                            <Link href={`/news/${item.slug}`} className="hover:text-primary transition-colors">{item.title}</Link>
                        </CardTitle>
                        <CardDescription>{item.date}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-text-muted text-sm">{item.description}</p>
                    </CardContent>
                    <CardFooter>
                        <Link href={`/news/${item.slug}`} className="font-semibold text-primary flex items-center gap-2 text-sm">
                            Baca Selengkapnya <ArrowRight className="h-4 w-4" />
                        </Link>
                    </CardFooter>
                </Card>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
