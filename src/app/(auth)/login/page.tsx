import Link from 'next/link';
import { redirect } from 'next/navigation';

import { checkLoggedIn } from '@/auth/auth';
import { env } from '@/config/env';
import type { Metadata } from 'next';
import { paths } from '@/config/paths';

const googleAuthIsEnabled =
  env.GOOGLE_CLIENT_ID !== undefined && env.GOOGLE_CLIENT_SECRET !== undefined;

/**
 * The login page of the application, if the user is already logged in they will be redirected to the home page.
 * @returns Next.js RSC page.
 */

export const metadata: Metadata = {
  title: 'Login - Instructise',
  description: 'Login to your Instructise account',
};

export default async function LoginPage() {
  const isLoggedIn = await checkLoggedIn();

  if (isLoggedIn) {
    redirect(paths.app.dashboard.getHref());
  }

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
