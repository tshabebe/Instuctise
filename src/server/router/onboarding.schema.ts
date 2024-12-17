import { ZInsertSectionSchema } from '@/db/schema/class';

import { type z } from 'zod';

export const ZCreateClassInput = ZInsertSectionSchema.omit({
  userId: true,
  updatedAt: true,
  createdAt: true,
});
export type CreateClassInput = z.infer<typeof ZCreateClassInput>;
export const ZCreateClassOutput = ZInsertSectionSchema.omit({
  userId: true,
  username: true,
  updatedAt: true,
  createdAt: true,
});
export type CreateClassOutput = z.infer<typeof ZCreateClassOutput>;
