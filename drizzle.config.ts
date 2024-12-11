import { env } from '@/env';
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema',
  out: 'drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL_UNPOOLED,
  },
} satisfies Config;
