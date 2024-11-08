import type { ReactNode } from "react";
import { AppSidebar } from "./sidebar";
import { Navbar } from "./navbar";
import { validateSession } from "@/auth/auth";
import { serverClient } from "@/lib/trpc/serverClient";
import { redirect } from "next/navigation";
import { Onboarding } from "./onboarding";
import { SidebarProvider } from "@/primitives/sidebar";
export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // if there are no classes available create or join one
  const { user } = await validateSession();
  if (!user) {
    redirect("/login");
  }
  const sections = await serverClient.onboardingRouter.getSection();
  if (!sections) {
    return <Onboarding />;
  }
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex grow flex-col gap-8">
          <Navbar />
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
}
