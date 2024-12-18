import { ZInsertSectionSchema } from '@/db/schema/class';
import { zfd } from 'zod-form-data';

import { z } from 'zod';

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

export const ZJoinSection = z.object({
  username: zfd.text(z.string()),
});

export type JoinSection = z.infer<typeof ZJoinSection>;
