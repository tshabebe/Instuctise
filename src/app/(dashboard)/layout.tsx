import { Suspense, type ReactNode } from 'react';
import { AppSidebar } from '../../features/sidebar/sidebar';
import { ErrorBoundary } from 'react-error-boundary';
import { HydrateClient, trpc } from '@/lib/trpc/rsc.client';
import { checkIsOnboarding, checkLoggedIn } from '@/auth/auth';
import { redirect } from 'next/navigation';
import { paths } from '@/config/paths';
import { Onboarding } from '../../features/onboarding/onboarding';

export const metadata = {
  title: 'Instructise',
  description: 'Instructise makes keeps you organized',
};

async function DashboardLayout({ children }: { children: ReactNode }) {
  const isLoggedIn = await checkLoggedIn();
  const IsOnboardingFinished = await checkIsOnboarding();

  if (!isLoggedIn) {
    redirect(paths.auth.register.getHref());
  }

  if (IsOnboardingFinished) {
    return <Onboarding />;
  }

  void trpc.userRouter.getUser.prefetch();
  return (
    <div className="flex min-h-screen">
      <HydrateClient>
        <ErrorBoundary fallback="something went wrong">
          <Suspense fallback="loading...">
            <AppSidebar />
            <div className="flex grow flex-col">{children}</div>
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </div>
  );
}

export default DashboardLayout;
