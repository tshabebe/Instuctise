import { sql } from "drizzle-orm";
import { date, pgTable, time, timestamp, varchar } from "drizzle-orm/pg-core";
import { generateId } from "@/lib/id";
import { teacher } from "./teacher";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const scedule = pgTable("scedule", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  startTime: time("start_time"),
  endTime: time("end_time"),
  sceduleId: varchar("scedule_id").references(() => sceduleDay.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export const sceduleDay = pgTable("scedule_day", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  day: date("day"),
  teacherId: varchar("teacherId", { length: 256 }).references(() => teacher.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export const InsertSceduleDaySchema = createInsertSchema(sceduleDay).omit({
  id: true,
});
export const SelectSceduleDaySchema = createSelectSchema(sceduleDay).omit({
  id: true,
});
export const InsertSceduleSchema = createInsertSchema(scedule).omit({
  id: true,
});
export const SelectSceduleSchema = createSelectSchema(scedule).omit({
  id: true,
});
