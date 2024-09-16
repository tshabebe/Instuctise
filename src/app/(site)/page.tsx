import { Button } from '@/primitives/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-indigo-app to-background pt-2">
      <header>
        <div className="container flex items-center justify-between gap-2">
          <div>Insturctise</div>
          <div className="ml-auto">features</div>
          <div>blog</div>
          <Button size={'sm'}>sign up</Button>
        </div>
      </header>
      <main>
        <div className="text-8xl">hello world</div>
      </main>
    </div>
  );
}
