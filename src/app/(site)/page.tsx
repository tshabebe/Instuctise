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
            <div className="">Insturctise</div>
          </div>
          <nav className="grow flex items-center justify-center gap-2">
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
            <p className="font-extrabold text-7xl">
              Ease of{' '}
              <span className="bg-foreground-muted text-background font-extrabold text-7xl px-2">
                Instructors
              </span>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
