import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { generateId } from '@/lib/id';
import { grade } from './grade';

export const description = pgTable('description', {
  id: varchar('id', { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  description: text('description').notNull(),
  shortDescription: varchar('short_description', { length: 256 }).notNull(),
  gradeId: varchar('grade_id')
    .references(() => grade.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});
