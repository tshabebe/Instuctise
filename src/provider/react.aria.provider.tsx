// app/provider.tsx
'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { RouterProvider } from 'react-aria-components';

declare module 'react-aria-components' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >;
  }
}

export function ClientProviders({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <RouterProvider
      navigate={(path, options) => {
        router.push(path, options);
      }}
    >
      {children}
    </RouterProvider>
  );
}
