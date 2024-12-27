'use client';

import * as React from 'react';

import type { VariantProps } from 'class-variance-authority';

import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Icon } from './icon';

import {
  Button as AriaButton,
  composeRenderProps,
  type ButtonProps as AriaButtonProps,
} from 'react-aria-components';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-elevation-2-border focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: ' bg-gradient-to-br from-green to-orange hover:opacity-90',
        search:
          'inline-flex items-center gap-2 rounded-e-lg border border-gray-elevation-2-border bg-gray-elevation-2 px-3 text-sm font-medium outline-offset-2 transition-colors hover:bg-gray-elevation-2-hover hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-ring disabled:cursor-not-allowed disabled:opacity-50',
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

interface ButtonProps
  extends AriaButtonProps,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  children?: React.ReactNode;
}

const Button = ({
  className,
  children,
  variant,
  size,
  isLoading,
  ...props
}: ButtonProps) => {
  return (
    <AriaButton
      className={composeRenderProps(className, (className) =>
        cn(
          buttonVariants({
            variant,
            size,
            className,
          }),
        ),
      )}
      {...props}
    >
      {isLoading && <Icon name="Loader" className="animate-spin" />}
      {children}
    </AriaButton>
  );
};

Button.displayName = 'Button';

export { Button, buttonVariants };
