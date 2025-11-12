
import { Skeleton } from '@/components/ui/skeleton';

export default function BookingLoading() {
  return (
    <div className="container max-w-3xl py-8 md:py-16 animate-pulse">
        <div className="mb-8">
             <Skeleton className="h-8 w-48" />
        </div>
        <div className="space-y-4 rounded-2xl border p-6 text-center">
            <Skeleton className="h-8 w-1/2 mx-auto" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </div>
        </div>
    </div>
  );
}

    