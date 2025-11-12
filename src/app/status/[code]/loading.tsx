
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function StatusLoading() {
  return (
    <div className={`min-h-screen flex items-center justify-center bg-background py-12 px-4`}>
      <Card className="w-full max-w-md rounded-2xl shadow-xl text-center border-surface bg-background/80 backdrop-blur-xl overflow-hidden">
        <CardHeader className="pt-10">
          <Skeleton className="h-16 w-16 mx-auto rounded-full" />
        </CardHeader>
        <CardContent className="space-y-6 pb-10 px-4 sm:px-6">
          <div className="space-y-2">
            <Skeleton className="h-7 w-2/3 mx-auto" />
            <Skeleton className="h-4 w-full mx-auto" />
             <Skeleton className="h-4 w-5/6 mx-auto" />
          </div>
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}

    