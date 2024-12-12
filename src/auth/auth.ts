import { cache } from 'react';
import { validateSessionToken, type SessionValidationResult } from './lucia';
import { cookies } from 'next/headers';

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
