import { relations, sql } from 'drizzle-orm';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { userTable } from './auth';
import { teacher } from './teacher';
import { student } from './student';
import { generateId } from '@/lib/id';

export const section = pgTable('section', {
  id: varchar('id', { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  name: varchar('name', { length: 256 }).notNull(),
  userId: varchar('user_id')
    .references(() => userTable.id)
    .notNull(),
  username: varchar('username', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export const sectionRequest = pgTable('section_request', {
  id: varchar('id', { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  userId: varchar('user_id')
    .references(() => userTable.id)
    .notNull(),
  sectionId: varchar('group_id')
    .references(() => section.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export const sectionRelations = relations(section, ({ many }) => ({
  teachers: many(teacher),
  students: many(student),
}));

export const group = pgTable('group', {
  id: varchar('id', { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  name: varchar('name', { length: 256 }).notNull(),
  sectionId: varchar('section_id')
    .references(() => section.id)
    .notNull(),
  userId: varchar('user_id')
    .references(() => userTable.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export const ZInsertGroupSchema = createInsertSchema(group).omit({
  id: true,
});
export const ZInsertSectionSchema = createInsertSchema(section).omit({
  id: true,
});
export const ZSelectSectionSchema = createSelectSchema(section).omit({
  id: true,
});
