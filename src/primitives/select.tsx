'use client';
import {
  ListBox,
  ListBoxItem,
  Popover,
  Select as SelectAria,
  SelectValue,
} from 'react-aria-components';
import { Icon } from './icon';
import { Button } from './button';

export function Select() {
  return (
    <SelectAria aria-describedby="user role">
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
      <Popover>
        <ListBox className={'bg-gray-elevation-4'}>
          <ListBoxItem>Student</ListBoxItem>
          <ListBoxItem>Teacher</ListBoxItem>
        </ListBox>
      </Popover>
    </SelectAria>
  );
}
