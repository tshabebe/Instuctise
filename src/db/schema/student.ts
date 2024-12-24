import { relations, sql } from 'drizzle-orm';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { section } from './class';
import { createInsertSchema } from 'drizzle-zod';
import { userTable } from './auth';
import { generateId } from '@/lib/id';

export const student = pgTable('student', {
  id: varchar('id', { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  name: varchar('student_name', { length: 256 }).notNull(),
  userId: varchar('user_id').references(() => userTable.id),
  sectionId: varchar('section_id')
    .references(() => section.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export const studentRelations = relations(student, ({ one }) => ({
  sectionId: one(section, {
    fields: [student.sectionId],
    references: [section.id],
  }),
}));

export const InsertStudentSchema = createInsertSchema(student).omit({
  id: true,
});
