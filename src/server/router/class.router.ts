import { authedProcedure, router } from '../trpc';
import { desc } from 'drizzle-orm';

export const classRouter = router({
  getAllClass: authedProcedure.query((opts) => {
    return opts.ctx.db.query.section.findMany({
      with: {
        teachers: true,
        students: true,
      },
      orderBy: (section) => [desc(section.createdAt)],
    });
  }),
});
