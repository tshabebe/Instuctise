import * as React from 'react';

import type { VariantProps } from 'class-variance-authority';

import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Icon } from './icon';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-subtle-border focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-br from-salmon to-orange text-white hover:opacity-90 dark:text-black',
        destructive: 'bg-red text-white hover:bg-red-solid-hover',
        outline:
          'border border-orange-subtle-border bg-gray-element text-foreground-muted hover:bg-gray-element-hover hover:text-foreground',
        ghost:
          'text-foreground-muted hover:bg-gray-element hover:text-foreground',
        // 'bg-indigo text-black',
        link: 'relative bg-gradient-to-br from-salmon to-orange bg-clip-text text-transparent before:absolute before:bottom-0 before:h-px before:w-[calc(100%-24px)] before:rounded-full before:bg-gradient-to-br before:from-salmon before:to-orange hover:opacity-90',
        subtlePrimary: 'bg-orange-subtle text-orange-foreground-muted',
        subtleOutline:
          'border border-orange-subtle-border text-foreground-muted hover:bg-gray-element-hover hover:text-foreground',
      },
      size: {
        default: 'px-4 py-2',
        sm: 'px-3 py-1.5',
        lg: 'px-3 py-1.5 lg:px-4 lg:py-2 lg:text-base',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant,
      size,
      asChild = false,
      isLoading,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading && <Icon name="Loader" className="animate-spin" />}
        <Slottable>{children}</Slottable>
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
