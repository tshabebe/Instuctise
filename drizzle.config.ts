import { env } from '@/config/env';
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema',
  out: 'drizzle',
  dialect: 'postgresql',
  strict: true,
  verbose: true,
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;
