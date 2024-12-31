'use client';
import GoogleIcon from './google.icon';
import { Button } from '@/primitives/button';
import type { Key } from 'react-aria-components';
import { useState } from 'react';
import { UserRole } from '@/primitives/select';
import Link from 'next/link';
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
      <h1 className="text-4xl font-extrabold leading-tight">
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
      <Button variant={'search'} className={'w-56'}>
        <Link href={paths.auth.login.getHref(userRole as string)}>
          <GoogleIcon /> Login with Google
        </Link>
      </Button>
    </div>
  );
}
