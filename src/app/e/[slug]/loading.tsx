
import { Skeleton } from '@/components/ui/skeleton';

export default function EventDetailLoading() {
  return (
    <div>
      <Skeleton className="relative w-full h-64 md:h-80 bg-muted" />

      <div className="container -mt-16 md:-mt-24 pb-40 md:pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="relative z-10 p-6 mb-8 bg-background/80 backdrop-blur-sm rounded-2xl shadow-xl border">
            <div className="flex items-start justify-between gap-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
             <Skeleton className="h-6 w-1/3 mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Jadwal & Lokasi Card Skeleton */}
              <div className="space-y-4 rounded-2xl border p-6">
                <Skeleton className="h-8 w-1/2" />
                <div className="space-y-3">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-6 w-5/6" />
                </div>
                 <Skeleton className="h-10 w-48 mt-2" />
              </div>

              {/* Deskripsi Card Skeleton */}
              <div className="space-y-4 rounded-2xl border p-6">
                <Skeleton className="h-8 w-1/2" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>

              {/* Peserta Card Skeleton */}
              <div className="space-y-4 rounded-2xl border p-6">
                <Skeleton className="h-8 w-1/2" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Card Skeleton */}
            <div className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-24 space-y-4 rounded-2xl border p-6">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-10 w-1/2" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

    