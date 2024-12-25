'use client';

import { trpc } from '@/lib/trpc/client';

export default function Home() {
  const [data] = trpc.userRouter.getUser.useSuspenseQuery();
  return (
    <div>
      <div>{data.name}</div>
    </div>
  );
}
