import { cache } from 'react';
import { validateSessionToken, type SessionValidationResult } from './lucia';
import { cookies } from 'next/headers';
import { redis } from '@/lib/redis';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { section } from '@/db/schema';

export const AUTH_TOKEN_COOKIE_NAME = 'session';
const ONBOARDING_CACHE_PREFIX = 'onboarding:';

export const validateSession = cache(
  async (): Promise<SessionValidationResult> => {
    const token = (await cookies()).get('session')?.value ?? null;
    if (!token) {
      return { session: null, user: null };
    }
    const result = validateSessionToken(token);
    return result;
  },
);

export const checkLoggedIn = async () => {
  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get(AUTH_TOKEN_COOKIE_NAME);
  return isLoggedIn;
};

export async function checkIsOnboarding(): Promise<boolean> {
  const userId = (await validateSession()).user?.id;

  if (!userId) {
    return false;
  }

  try {
    const finishedOnboarding = (await redis.get(
      `${ONBOARDING_CACHE_PREFIX}:${userId}`,
    )) as boolean;
    if (finishedOnboarding) {
      return finishedOnboarding;
    }
    const dbStatus = await fetchOnboardingStatusFromDB(userId);
    await redis.set(
      `${ONBOARDING_CACHE_PREFIX}:${userId}`,
      dbStatus ? true : false,
    );

    return dbStatus;
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return fetchOnboardingStatusFromDB(userId);
  }
}

async function fetchOnboardingStatusFromDB(userId: string) {
  const dbStatus = await db.query.section.findFirst({
    where: eq(section.userId, userId),
  });
  return !!dbStatus;
}
