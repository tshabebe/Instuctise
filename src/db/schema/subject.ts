import { generateId } from "@/lib/id";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { section } from "./class";
import { relations, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { teacher } from "./teacher";

export const subject = pgTable(
  "subject",
  {
    id: varchar("id", { length: 30 })
      .$defaultFn(() => generateId())
      .primaryKey(), // prefix_ + nanoid (12)
    name: varchar("name", { length: 256 }).notNull(),
    sectionId: varchar("section_id")
      .notNull()
      .references(() => section.id)
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`current_timestamp`)
      .$onUpdate(() => new Date()),
  }
  // (table) => {
  //   return {
  //     uniqueSubject: unique("unique_teachers_name_with_subject").on(
  //       table.sectionId, // no two tables with the similar subjects in the same section
  //       table.id,
  //     ),
  //   };
  // },
);

export const subjectsRelations = relations(subject, ({ one, many }) => ({
  sectionId: one(section, {
    fields: [subject.sectionId],
    references: [section.id],
  }),
  teachers: many(teacherToSubject),
}));

export const teacherToSubject = pgTable("teacher_to_subject", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  subjectId: varchar("subject_id")
    .notNull()
    .references(() => subject.id)
    .notNull(),
  teacherId: varchar("teacher_id")
    .notNull()
    .references(() => teacher.id)
    .notNull(),
});

export const teacherToSubjectRelation = relations(
  teacherToSubject,
  ({ one }) => ({
    subjectsId: one(teacher, {
      fields: [teacherToSubject.teacherId],
      references: [teacher.id],
    }),
    teacherId: one(subject, {
      fields: [teacherToSubject.subjectId],
      references: [subject.id],
    }),
  })
);
export const InsertTeacherToSubjectSchema = createInsertSchema(
  teacherToSubject
).omit({ id: true });
export const InsertSubjectSchema = createInsertSchema(subject).omit({
  id: true,
});
export const SelectSubjectSchema = createSelectSchema(subject).omit({
  id: true,
});
