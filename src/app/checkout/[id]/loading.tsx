
import { Skeleton } from '@/components/ui/skeleton';

export default function CheckoutLoading() {
  return (
    <div className="container max-w-4xl py-8 md:py-16 animate-pulse">
      <div className="mb-8">
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4 rounded-2xl border p-6">
            <Skeleton className="h-8 w-1/2" />
            <div className="space-y-3">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          </div>
          <div className="space-y-4 rounded-2xl border p-6">
            <Skeleton className="h-8 w-1/2" />
            <div className="space-y-3">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="space-y-4 rounded-2xl border p-6">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <div className="space-y-2 pt-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

    