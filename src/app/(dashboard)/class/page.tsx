'use client';

import { Button } from '@/primitives/button';
import { usePathname, useRouter } from 'next/navigation';

export default function Class() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="flex grow flex-col gap-8 px-8">
      <h1>all classes</h1>
      <Button
        onClick={() => {
          router.push(`${pathname}/class234`);
        }}
        variant={'link'}
      >
        this is{' '}
      </Button>
    </div>
  );
}
