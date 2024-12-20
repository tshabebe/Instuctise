import { TRPCError, initTRPC } from '@trpc/server';
import { db } from '@/db';
import { validateSession } from '@/auth/auth';
import superjson from 'superjson';
import { redis } from '@/lib/redis';

export const createTRPCContext = (opts: { headers: Headers }) => {
  return {
    db,
    redis,
    ...opts,
  };
};

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
});

// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;
export const authedProcedure = t.procedure.use(async ({ ctx, next }) => {
  const { user } = await validateSession();

  if (!user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to perform this action',
    });
  }

  return next({ ctx: { ...ctx, user: user } });
});
export const createCallerFactory = t.createCallerFactory;
