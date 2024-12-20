'use client';
import {
  ChevronRight,
  Contact,
  // GalleryVerticalEnd,
  House,
  Plus,
  SquareMenu,
  UserPen,
  Users,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from '@/primitives/sidebar';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/app/icon.png';
import { usePathname } from 'next/navigation';
import { Icon } from '@/primitives/icon';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/primitives/dropdown-menu';
import { Button } from '@/primitives/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/primitives/collapsible';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/home',
    icon: House,
  },
  {
    title: 'Class',
    url: '/class',
    icon: UserPen,
  },
  {
    title: 'Student',
    url: '/student',
    icon: Contact,
  },
  {
    title: 'Teacher',
    url: '/teacher',
    icon: Users,
  },
  {
    title: 'Exam',
    url: '/exam',
    icon: SquareMenu,
  },
];

const recent = [
  {
    title: 'class',
    id: 'blog-1',
    list: [
      {
        title: 'Computer Science',
        id: 'computer-1',
      },
      {
        title: 'Business Management',
        id: 'computer-2',
      },
      {
        title: 'Accounting 4th year',
        id: 'computer-3',
      },
    ],
    icon: UserPen,
  },
  {
    title: 'Blogs',
    list: [
      {
        title: 'be prepared for final exam',
        id: 'blog-1',
      },
      {
        title: 'An assignment is set to be delivered on monday',
        id: 'blog-2',
      },
      {
        title: 'How does postgres work under the hood',
        id: 'blog-3',
      },
    ],
    id: 'class-2',
    icon: UserPen,
  },
  {
    title: 'Exam',
    id: 'exam-3',
    list: [
      { title: 'Maths final chapter 4', id: 'Exam 1' },

      { title: 'Object Oriented Programming mid chapter 4', id: 'Exam 1' },
    ],
    icon: SquareMenu,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar className="basis-48 border-gray-subtle-border" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <SidebarMenuButton size="lg" asChild className="">
                <Link href="/home">
                  <Image
                    src={Logo}
                    width={32}
                    height={32}
                    alt="Instructise logo"
                  />
                  {/* </div> */}
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Instructise</span>
                    <span className="text-xs">student</span>
                  </div>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={'ml-auto size-7'}
                    >
                      <Icon name="ChevronsUpDown" />
                      <span className="sr-only">Switch User</span>
                    </Button>
                  </DropdownMenuTrigger>
                </Link>
              </SidebarMenuButton>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg border-gray-subtle-border"
                align="start"
                side="bottom"
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-xs text-gray-solid">
                  Teams
                </DropdownMenuLabel>
                <DropdownMenuItem className="p-2">
                  <div className="flex grow justify-between">
                    <div className="font-medium">Teshome Abebe</div>
                    <span className="text-sm font-medium text-gray-solid">
                      student
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2">
                  <div className="flex grow justify-between">
                    <div className="font-medium">Teshome Abebe</div>
                    <span className="text-sm font-medium text-gray-solid">
                      teacher
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border border-gray-subtle-border">
                    <Plus className="size-4" />
                  </div>
                  <div className="font-medium text-gray-solid">Add team</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.url === pathname}>
                    <Link href={item.url}>
                      <item.icon />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Recent</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recent.map((recent) => (
                <Collapsible key={recent.id} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild>
                        <Link href={'#'}>
                          <recent.icon />
                          <span className="font-medium">{recent.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </Link>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {recent.list.map((list) => (
                          <SidebarMenuSubItem key={list.id}>
                            <SidebarMenuSubButton>
                              {list.title}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
