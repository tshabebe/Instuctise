import { section } from '@/db/schema';
import { authedProcedure, router } from '../trpc';
import { eq } from 'drizzle-orm';
import { ZCreateClassInput, ZCreateClassOutput } from './onboarding.schema';
import { generateUsername } from 'unique-username-generator';
import { TRPCError } from '@trpc/server';

export const onboardingRouter = router({
  getSection: authedProcedure.query(async (opts) => {
    try {
      const [sections] = await opts.ctx.db
        .select()
        .from(section)
        .where(eq(section.userId, opts.ctx.user.id))
        .limit(1);
      return sections;
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch section',
        cause: error,
      });
    }
  }),
  createClass: authedProcedure
    .input(ZCreateClassInput)
    .output(ZCreateClassOutput)
    .mutation(async (opts) => {
      try {
        return await opts.ctx.db.transaction(async (tx) => {
          const [exists] = await opts.ctx.db
            .select()
            .from(section)
            .where(eq(section.username, opts.input.username))
            .execute();

          if (exists) {
            throw new TRPCError({
              code: 'CONFLICT',
              message: 'username already taken',
            });
          }
          const [firstClass] = await tx
            .insert(section)
            .values({
              name: opts.input.name,
              userId: opts.ctx.user.id,
              username: opts.input.username,
            })
            .returning();

          if (!firstClass) {
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: 'Failed to create class, Please try again',
            });
          }

          return {
            name: firstClass.name,
          };
        });
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Could not create class',
          cause: error,
        });
      }
    }),
  getUsername: authedProcedure.query(async (opts) => {
    try {
      const suggestions = [];
      const requiredCount = 2;
      const maxAttempts = 10; // Prevent infinite loop
      let attempts = 0;

      while (suggestions.length < requiredCount && attempts < maxAttempts) {
        attempts++;

        const username = generateUsername();
        const exists = await opts.ctx.db
          .select()
          .from(section)
          .where(eq(section.username, username))
          .execute();

        if (exists.length === 0) {
          suggestions.push(username);
        }
      }

      if (suggestions.length < requiredCount) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to generate unique usernames. Please try again.',
        });
      }
      return {
        suggestions,
      };
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to generate username suggestions',
        cause: error,
      });
    }
  }),
});
