'use client';
import GoogleIcon from './google.icon';
import { Button } from '@/primitives/button';

export function LoginForm() {
  return (
    <div className="flex basis-48 flex-col bg-gray-elevation-1">
      <Greeting />
      <Button variant={'search'} className={'w-56'}>
        <GoogleIcon /> Login with Google
      </Button>
    </div>
  );
}

function Greeting() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-extrabold leading-tight">
        Login to your account
      </h1>
      <p className="">tip: change the default username</p>
    </div>
  );
}
