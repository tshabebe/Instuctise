'use client';
import { Select } from '@/primitives/select';
import GoogleIcon from './google.icon';
import { Button } from '@/primitives/button';

export function LoginForm() {
  return (
    <div className="flex basis-72 flex-col items-center gap-10">
      <Greeting />
      <div className="flex flex-col items-end gap-2">
        <Select />
        <Button variant={'search'} className={'w-56'}>
          <GoogleIcon /> Login with Google
        </Button>
      </div>
    </div>
  );
}

function Greeting() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-extrabold leading-tight">
        Login to your account
      </h1>
      <p className="text-gray-text-secondary">
        tip: change the default user role
      </p>
    </div>
  );
}
