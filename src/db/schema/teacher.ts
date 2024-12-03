import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { section } from "./class";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { generateId } from "@/lib/id";
import { userTable } from "./auth";

export const teacher = pgTable("teacher", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  name: varchar("teacher_name", { length: 256 }).notNull(),
  sectionId: varchar("section_id")
    .references(() => section.id)
    .notNull(),
  userId: varchar("user_id").references(() => userTable.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export const InsertTeacherSchema = createInsertSchema(teacher).omit({
  id: true,
});
export const SelectTeacherSchema = createSelectSchema(teacher).omit({
  id: true,
});
