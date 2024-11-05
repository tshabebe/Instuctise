import type { ReactNode } from "react";
import { SideBar } from "./sidebar";
import { Navbar } from "./navbar";
import { validateSession } from "@/auth/auth";
import { serverClient } from "@/lib/trpc/serverClient";
import { redirect } from "next/navigation";
import { Onboarding } from "./onboarding";
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
      <SideBar />
      <div className="flex grow flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}