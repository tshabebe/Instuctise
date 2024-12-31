'use client';
import { cn } from '@/lib/utils';
import GoogleIcon from './google.icon';
import { Button } from '@/primitives/button';
import { Icon } from '@/primitives/icon';
import {
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components';

const userRole = [{ name: 'Teacher' }, { name: 'Student' }];
export function LoginForm() {
  return (
    <div className="flex basis-72 flex-col items-center gap-10">
      <Greeting />
      <div className="flex flex-col items-end gap-2">
        <Select aria-describedby="user role" defaultSelectedKey={'Teacher'}>
          <Button
            variant={'search'}
            size={'sm'}
            className={
              'border-gray-elevation-3 bg-gray-elevation-1 text-gray-text-secondary'
            }
          >
            <SelectValue />
            <span aria-hidden="true">
              <Icon name="ChevronDown" />
            </span>
          </Button>
          <Popover className={'w-[--trigger-width]'}>
            <ListBox
              className={
                'rounded-md border border-gray-elevation-3-border bg-gray-elevation-2'
              }
              items={userRole}
            >
              {(role) => {
                return (
                  <ListBoxItem
                    id={role.name}
                    className={({ isSelected, isFocused }) =>
                      cn(
                        'cursor-pointer p-2 outline-none',
                        isFocused && 'bg-gray-elevation-2-hover',
                        isSelected && 'bg-gray-elevation-4',
                      )
                    }
                  >
                    {role.name}
                  </ListBoxItem>
                );
              }}
            </ListBox>
          </Popover>
        </Select>
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
