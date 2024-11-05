import { router } from './trpc';
import { userRouter } from './router/user.router';
import { onboardingRouter } from './router/onboarding.router';

export const appRouter = router({
  onboardingRouter,
  userRouter,
});

export type AppRouter = typeof appRouter;
