'use client';
import { Button } from '@/primitives/button';
import Link from 'next/link';
import { useState } from 'react';

export default function LandingPage() {
  const [pending, setPending] = useState<boolean>(false);
  return (
    <div className="min-h-screen bg-gradient-to-b">
      <header>
        <div className="container flex items-center gap-4 pt-4">
          <div className="flex items-center gap-2">
            {/* <LogoItem /> */}
            <div className="">Instructise</div>
          </div>
          <nav className="flex grow items-center justify-center gap-2">
            <div className="hover:text-foreground">
              <Button variant={'ghost'}>pricing</Button>
            </div>
            <div className="hover:text-foreground">
              <Button variant={'ghost'}>FAQ</Button>
            </div>
          </nav>
          <Link href={'/login'}>
            <Button
              variant={'outline'}
              onClick={() => {
                setPending(true);
              }}
            >
              {pending ? <div>loading</div> : <>Hoo started</>}
            </Button>
          </Link>
        </div>
      </header>
      <main>
        <section>
          <div className="container flex justify-center gap-12 pt-36">
            <p className="text-7xl font-extrabold">
              Ease of{' '}
              <span className="bg-foreground-muted px-2 text-7xl font-extrabold text-background">
                Instructors
              </span>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
