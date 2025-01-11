'use client';
import GoogleIcon from './google.icon';
import { Button, Link, type Key } from 'react-aria-components';
import { useState } from 'react';
import { UserRole } from '@/primitives/select';
import { paths } from '@/config/paths';

export function LoginPageUI() {
  return (
    <div className="flex basis-72 flex-col items-center gap-10">
      <Greeting />
      <LoginForm />
    </div>
  );
}

function Greeting() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-extrabold leading-tight md:text-4xl">
        Login to your account
      </h1>
      <p className="text-gray-text-secondary">
        tip: change the default user role
      </p>
    </div>
  );
}

function LoginForm() {
  const [userRole, setUserRole] = useState<Key>('Teacher');
  return (
    <div className="flex flex-col items-end gap-2">
      <UserRole selectedKey={userRole} onSelectionChange={setUserRole} />
      <Button
        className={
          'w-56 rounded-md border bg-gray-elevation-1 px-4 py-2 hover:bg-gray-elevation-1-hover [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'
        }
      >
        <Link
          href={paths.auth.login.getHref(userRole as string)}
          className="flex items-center gap-2"
        >
          <GoogleIcon /> Login with Google
        </Link>
      </Button>
    </div>
  );
}
