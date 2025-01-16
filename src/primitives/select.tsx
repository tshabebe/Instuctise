'use client';
import { cn } from '@/lib/utils';
import type { SelectProps } from 'react-aria-components';
import {
  Select,
  SelectValue,
  Popover,
  ListBox,
  ListBoxItem,
} from 'react-aria-components';
import { Button } from 'react-aria-components';
import { Icon } from './icon';

const userRoles = [{ name: 'Teacher' }, { name: 'Student' }];

export function UserRole({ ...props }: SelectProps) {
  return (
    <Select aria-labelledby="user role" {...props}>
      <Button
        className={
          'flex gap-2 rounded-md border border-gray-elevation-3  bg-gray-elevation-1 px-2 py-1 text-gray-text-secondary'
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
            'overflow-hidden rounded-md border border-gray-elevation-3-border bg-gray-elevation-2'
          }
          items={userRoles}
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
  );
}
