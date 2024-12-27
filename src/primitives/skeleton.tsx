import { cn } from '@/lib/utils';

function Skeleton({
  className,
  noPulse = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { noPulse?: boolean }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-elevation-1',
        noPulse && 'animate-none',
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
