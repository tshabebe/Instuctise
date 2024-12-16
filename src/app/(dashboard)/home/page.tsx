'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/primitives/button';

export default function Home() {
  const [data] = trpc.userRouter.getUser.useSuspenseQuery();
  return (
    <div>
      <ToggleTheme />
      <div>{data.name}</div>
    </div>
  );
}

import type { HTMLAttributes } from 'react';
import { trpc } from '@/lib/trpc/client';

function ToggleTheme(props: HTMLAttributes<HTMLButtonElement>) {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <Button
        size={'icon'}
        variant={'ghost'}
        onClick={
          theme === 'dark'
            ? () => {
                setTheme('light');
              }
            : () => {
                setTheme('dark');
              }
        }
        {...props}
      >
        {theme === 'dark' ? <Moon /> : <Sun />}
      </Button>
    </>
  );
}
