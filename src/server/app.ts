import { router } from './trpc';
import { userRouter } from './router/user.router';
import { onboardingRouter } from './router/onboarding.router';
import { classRouter } from './router/class.router';

export const appRouter = router({
  onboardingRouter,
  userRouter,
  classRouter,
});

export type AppRouter = typeof appRouter;
