import { cva, type VariantProps } from 'class-variance-authority';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const statusBadgeVariants = cva('border-transparent', {
  variants: {
    status: {
      Tersedia: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
      'Hampir Penuh': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
      Penuh: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
      Ditutup: 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300',
      OPEN: 'bg-success/20 text-success-foreground dark:bg-success/20 dark:text-success',
      CLOSED: 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300',
      REVIEW: 'bg-warning/20 text-warning-foreground dark:bg-warning/20 dark:text-warning',
      PAID: 'bg-success/20 text-success-foreground dark:bg-success/20 dark:text-success',
      REJECTED: 'bg-danger/20 text-danger-foreground dark:bg-danger/20 dark:text-danger',
      EXPIRED: 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300',
    },
  },
  defaultVariants: {
    status: 'Tersedia',
  },
});

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statusBadgeVariants> {}

export function StatusBadge({ className, status, ...props }: StatusBadgeProps) {
  const statusText = status === 'PAID' ? 'Lunas' : 
                     status === 'REVIEW' ? 'Pending' : 
                     status === 'REJECTED' ? 'Ditolak' : status;
  return (
    <Badge
      className={cn(statusBadgeVariants({ status }), 'font-semibold', className)}
      {...props}
    >
      {statusText}
    </Badge>
  );
}
