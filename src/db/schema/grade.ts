import { sql } from 'drizzle-orm';
import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { section } from './class';
import { createInsertSchema } from 'drizzle-zod';
import { generateId } from '@/lib/id';
import { student } from './student';
import { subject } from './subject';

export const grade = pgTable('grade', {
  id: varchar('id', { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  grade: integer('grade'),
  studentId: varchar('student_id')
    .notNull()
    .references(() => student.id),
  sectionId: varchar('section_id')
    .notNull()
    .references(() => section.id),
  description: varchar('description', { length: 256 }),
  subjectId: varchar('teacher_id')
    .notNull()
    .references(() => subject.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export const InsertGradeSchema = createInsertSchema(grade).omit({ id: true });
