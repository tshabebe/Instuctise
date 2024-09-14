import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { env } from '@/env';

const sql = postgres(env.DATABASE_URL_UNPOOLED);

const db = drizzle(sql);

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: 'drizzle',
    });

    console.log('Migration successful');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void main();
