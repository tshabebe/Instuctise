import { relations, sql } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { section } from './class';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { userTable } from './auth';

export const teacher = pgTable('teacher', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('teacher_name', { length: 256 }).notNull(),
  sectionId: uuid('section_id')
    .references(() => section.id)
    .notNull(),
  userId: varchar('user_id').references(() => userTable.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export const teacherRelations = relations(teacher, ({ one }) => ({
  sectionId: one(section, {
    fields: [teacher.sectionId],
    references: [section.id],
  }),
}));

export const InsertTeacherSchema = createInsertSchema(teacher).omit({
  id: true,
});
export const SelectTeacherSchema = createSelectSchema(teacher).omit({
  id: true,
});
