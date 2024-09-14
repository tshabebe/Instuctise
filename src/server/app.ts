import { router } from "./trpc";
import { userRouter } from "./router/user.router";

export const appRouter = router({
  userRouter,
});

export type AppRouter = typeof appRouter;