import { section } from "@/db/schema";
import { authedProcedure, router } from "../trpc";
import { eq } from "drizzle-orm";
import { ZCreateClass } from "./onboarding.schema";
import { generateUsername } from "unique-username-generator";
import { TRPCError } from "@trpc/server";

export const onboardingRouter = router({
  getSection: authedProcedure.query(async (opts) => {
    const [sections] = await opts.ctx.db
      .select()
      .from(section)
      .where(eq(section.userId, opts.ctx.user.id))
      .limit(1);
    return sections;
  }),
  createClass: authedProcedure.input(ZCreateClass).mutation(async (opts) => {
    try {
      await opts.ctx.db.transaction(async (tx) => {
        const [exists] = await opts.ctx.db
          .select()
          .from(section)
          .where(eq(section.username, opts.input.username))
          .execute();
        if (exists) throw new Error("username already taken");
        const [firstClass] = await tx
          .insert(section)
          .values({
            name: opts.input.name,
            userId: opts.ctx.user.id,
            username: opts.input.username,
          })
          .returning();
        return firstClass;
      });
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not create class",
        cause: error,
      });
    }
  }),
  getUsername: authedProcedure.query(async (opts) => {
    const suggestions = [];

    for (let i = 0; i < 2; i++) {
      const username = generateUsername();
      suggestions.push(username);
    }

    // Check availability for all suggestions
    const availableUsernames = await Promise.all(
      suggestions.map(async (username) => {
        const exists = await opts.ctx.db
          .select()
          .from(section)
          .where(eq(section.username, username))
          .execute();

        return exists.length === 0 ? username : null;
      }),
    );
    return {
      suggestions: availableUsernames.filter(Boolean),
    };
  }),
});