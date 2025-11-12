import { Progress } from '@/components/ui/progress';

type CapacityBarProps = {
  current: number;
  max: number;
};

export function CapacityBar({ current, max }: CapacityBarProps) {
  const percentage = (current / max) * 100;
  
  return (
    <div className="space-y-2">
      <Progress value={percentage} className="h-3 [&>*]:bg-primary" />
      <p className="text-sm text-muted-foreground">{current} dari {max} slot terisi</p>
    </div>
  );
}
