
import { Skeleton } from '@/components/ui/skeleton';

export default function PaymentLoading() {
  return (
    <div className="container max-w-lg py-8 md:py-16 animate-pulse">
      <div className="mb-8">
        <Skeleton className="h-8 w-32" />
      </div>
      <div className="space-y-4 rounded-2xl border p-6">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-6 w-1/3" />
        <div className="space-y-3 pt-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}

    