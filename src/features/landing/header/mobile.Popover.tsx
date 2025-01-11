'use client';
import { paths } from '@/config/paths';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Popover, MenuTrigger, Menu, MenuItem } from 'react-aria-components';
import { Button } from 'react-aria-components';

const userRoles = [
  { name: 'pricing', href: paths.landing.pricing.getHref() },
  { name: 'FAQ', href: paths.landing.FAQ.getHref() },
  { name: 'blogs', href: paths.landing.blogs.getHref() },
];

export function MobilePopover() {
  const [IsOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  return (
    <MenuTrigger
      aria-labelledby="Landing Page Navigation"
      onOpenChange={(isOpen) => {
        setIsOpen(isOpen);
      }}
    >
      <Button
        className={
          'group border-gray-elevation-3 bg-gray-elevation-1 text-gray-text-secondary sm:hidden'
        }
        aria-expanded={IsOpen}
        aria-label="Menu"
      >
        <span aria-hidden="true">
          <svg
            className="pointer-events-none"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12L20 12"
              className="origin-center translate-y-[-7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
            />
            <path
              d="M4 12H20"
              className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
            />
            <path
              d="M4 12H20"
              className="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
            />
          </svg>
        </span>
      </Button>
      <Popover
        className={
          'shadow-md shadow-[#0C0909] entering:animate-in entering:fade-in entering:zoom-in-95 exiting:animate-out exiting:fade-out exiting:zoom-out-95'
        }
      >
        <Menu
          className={'flex w-48 flex-col overflow-hidden rounded-md border'}
          items={userRoles}
        >
          {(role) => {
            return (
              <MenuItem
                id={role.name}
                href={role.href}
                className={({ isFocused }) =>
                  cn(
                    'cursor-pointer p-2 outline-none',
                    isFocused && 'bg-gray-elevation-1-hover',
                    pathname === role.href && 'bg-gray-elevation-3',
                  )
                }
              >
                {role.name}
              </MenuItem>
            );
          }}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
