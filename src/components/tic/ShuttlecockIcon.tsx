import { cn } from '@/lib/utils';

export const ShuttlecockIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('h-6 w-6', className)}
    {...props}
  >
    <path d="M10 18.5v-3" />
    <path d="M14 18.5v-3" />
    <path d="m7 10 3.4-3.4C11.1 5.9 12.7 5.2 14.1 5.4c.8.1 1.6.4 2.2.9l.2.2c.5.5.8 1.2.9 1.9.2 1.5-.5 3-1.2 4.3L13 15.5h-3l-3-5.5Z" />
    <path d="M7 10h.01" />
    <path d="m17 10-3.4 3.4" />
    <path d="m14 15.5 3.4-3.4" />
    <path d="M10.2 7.8 7 11" />
  </svg>
);
