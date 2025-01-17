import { cn } from '@/lib/utils';
import slugify from 'slugify';
import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { PropsWithChildren } from 'react';
import { createElement } from 'react';

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6, className: string) {
  const Element = ({ children }: PropsWithChildren) => {
    const slug =
      typeof children === 'string'
        ? slugify(children, { lower: true, strict: true })
        : '';
    return createElement(
      `h${String(level)}`,
      { id: slug },
      createElement(
        'a',
        {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: cn('font-medium', className),
        },
        children,
      ),
    );
  };

  Element.displayName = `h${String(level)}`;

  return Element;
}

export const MDXComponents = {
  h1: createHeading(1, 'text-2xl md:text-3xl font-bold'),
  h2: createHeading(
    2,
    'text-xl md:text-2xl mb-3 md:mb-4 mt-3 md:mt-4 inline-block font-bold',
  ),
  h3: createHeading(
    3,
    'text-lg md:text-xl mb-2 md:mb-3 mt-2 md:mt-3 inline-block font-bold',
  ),
  ul: ({ children, className, ...props }) => (
    <ul
      {...props}
      className={cn(
        className as string,
        'mb-3 list-disc pl-6 text-sm md:mb-4 md:text-base',
      )}
    >
      {children}
    </ul>
  ),
  li: ({ children, className, ...props }) => (
    <li
      {...props}
      className={cn(
        className as string,
        'mb-1.5 text-sm leading-relaxed md:mb-2 md:text-base',
      )}
    >
      {children}
    </li>
  ),
  strong: ({ children, className, ...props }) => (
    <strong
      {...props}
      className={cn(className as string, 'font-medium text-foreground')}
    >
      {children}
    </strong>
  ),
  a: ({ children, className, ...props }) => (
    <a
      {...props}
      className={cn(
        className as string,
        'relative inline-flex items-center justify-center bg-gradient-to-br from-orange-text-primary to-red-text-primary bg-clip-text font-medium text-transparent before:absolute before:bottom-0 before:h-px before:w-full before:rounded-full before:bg-gradient-to-br before:from-orange-text-primary before:to-red-text-primary hover:opacity-90',
      )}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  p: ({ children, className, ...props }) => (
    <p
      {...props}
      className={cn(
        className as string,
        'mb-3 text-sm font-normal !leading-6 md:mb-4 md:text-base md:!leading-7',
      )}
    >
      {children}
    </p>
  ),
} satisfies MDXRemoteProps['components'];

export function CustomMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...MDXComponents, ...(props.components ?? {}) }}
    />
  );
}
