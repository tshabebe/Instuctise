import { appRouter } from '@/server/app';
import { createCallerFactory, createTRPCContext } from '@/server/trpc';
import { headers, type UnsafeUnwrappedHeaders } from 'next/headers';
import { cache } from 'react';

const createContext = cache(async () => {
  const heads = new Headers(
    (await headers()) as unknown as UnsafeUnwrappedHeaders,
  );
  heads.set('x-trpc-source', 'rsc');

  return createTRPCContext({
    headers: heads,
  });
});

export const serverClient = createCallerFactory(appRouter)(createContext, {
  onError(error) {
    console.error(error.error.message);
  },
});
