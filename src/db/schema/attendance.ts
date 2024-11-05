import { sql } from 'drizzle-orm';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { section } from './class';
import { generateId } from '@/lib/id';
import { scedule } from './scedule';
import { teacher } from './teacher';
import { createInsertSchema } from 'drizzle-zod';
import { student } from './student';

export const attendance = pgTable('attendance', {
  id: varchar('id', { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  studentId: varchar('student_id')
    .notNull()
    .references(() => student.id),
  attendanceRecordId: varchar('attendance_record_id')
    .notNull()
    .references(() => attendanceRecord.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export const attendanceRecord = pgTable('attendance_record', {
  id: varchar('id', { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  password: varchar('password', { length: 256 }),
  sectionId: varchar('section_id')
    .notNull()
    .references(() => section.id),
  teacherId: varchar('teacherId_id')
    .notNull()
    .references(() => teacher.id),
  sceduleId: varchar('scedule_id')
    .notNull()
    .references(() => scedule.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export const InsertAttendanceSchema = createInsertSchema(attendance).omit({
  id: true,
});
export const InsertAttendanceRecordSchema = createInsertSchema(
  attendanceRecord,
).omit({ id: true });
