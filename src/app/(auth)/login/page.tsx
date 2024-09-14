import Link from "next/link";
import { redirect } from "next/navigation";

import { validateSession } from "@/auth/auth";
import { env } from "@/env";

const googleAuthIsEnabled =
  env.GOOGLE_CLIENT_ID !== undefined && env.GOOGLE_CLIENT_SECRET !== undefined;

/**
 * The login page of the application, if the user is already logged in they will be redirected to the home page.
 * @returns Next.js RSC page.
 */
export default async function Page() {
  const { user } = await validateSession();

  if (user) redirect("/");

  return (
    <main className="container mx-auto flex flex-col">
      {googleAuthIsEnabled && (
        <Link href="/login/google">Sign in with Google</Link>
      )}

      {!googleAuthIsEnabled && (
        <p>Authentication environment variables are not configured.</p>
      )}
    </main>
  );
}
