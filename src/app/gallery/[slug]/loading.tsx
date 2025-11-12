
import { Skeleton } from '@/components/ui/skeleton';

export default function EventGalleryLoading() {
  return (
    <div className="bg-background">
      <div className="w-full bg-surface/50">
        <div className="container py-16 md:py-24 text-center">
            <Skeleton className="h-8 w-48 mb-4 mx-auto" />
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mt-4 mx-auto" />
        </div>
      </div>

      <div className="container py-16 md:py-24">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="break-inside-avoid">
              <Skeleton className="aspect-[3/4] w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

    