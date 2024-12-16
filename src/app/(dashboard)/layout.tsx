import { Suspense, type ReactNode } from 'react';
import { AppSidebar } from './sidebar';
import { Navbar } from './navbar';
import { SidebarProvider } from '@/primitives/sidebar';
import { ErrorBoundary } from 'react-error-boundary';
import { HydrateClient, trpc } from '@/lib/trpc/rsc.client';

export const metadata = {
  title: 'Instructise',
  description: 'Instructise makes keeps you organized',
};

function DashboardLayout({ children }: { children: ReactNode }) {
  void trpc.userRouter.getUser.prefetch();
  return (
    <div className="flex min-h-screen">
      <HydrateClient>
        <ErrorBoundary fallback="something went wrong">
          <Suspense fallback="loading...">
            <SidebarProvider>
              <AppSidebar />
              <div className="flex grow flex-col">
                <Navbar />
                {children}
              </div>
            </SidebarProvider>
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </div>
  );
}

export default DashboardLayout;
