'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/primitives/button';

export default function Home() {
  return (
    <div>
      <ToggleTheme />
    </div>
  );
}

import { HTMLAttributes } from 'react';

export function ToggleTheme(props: HTMLAttributes<HTMLButtonElement>) {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <Button
        size={'icon'}
        variant={'ghost'}
        onClick={
          theme === 'dark' ? () => setTheme('light') : () => setTheme('dark')
        }
        {...props}
      >
        {theme === 'dark' ? <Moon /> : <Sun />}
      </Button>
    </>
  );
}
