import type { InferSelectModel } from 'drizzle-orm';
import { pgTable, primaryKey, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const userTable = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name'),
  username: text('username'),
  email: text('email').unique(),
  userRole: text('user_role', { enum: ['admin', 'user', 'student'] }),
  avatorUrl: text('avator_url'),
  password: text('password'),
});

export const oauthAccountTable = pgTable(
  'oauth_account',
  {
    providerId: text('provider_id').notNull(),
    providerUserId: text('provider_user_id').notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => userTable.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.providerId, table.providerUserId] }),
  }),
);

export const sessionTable = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});

export const ZInsertUserTable = createInsertSchema(userTable).omit({
  id: true,
});

export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;
