import { ZInsertSectionSchema } from "@/db/schema/class";

import { type z } from "zod";

export const ZCreateClass = ZInsertSectionSchema.omit({
  userId: true,
  updatedAt: true,
  createdAt: true,
});
export type CreateClass = z.infer<typeof ZCreateClass>;