"use client";
import {
  Contact,
  // GalleryVerticalEnd,
  House,
  NotebookPen,
  Plus,
  SquareMenu,
  UserPen,
  Users,
} from "lucide-react";

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
} from "@/primitives/sidebar";
import Image from "next/image";
import Link from "next/link";
import Logo from "../logo.png";
import { usePathname } from "next/navigation";
import { Icon } from "@/primitives/icon";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/primitives/dropdown-menu";
import { Button } from "@/primitives/button";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
    icon: House,
  },
  {
    title: "Class",
    url: "/class",
    icon: UserPen,
  },
  {
    title: "Student",
    url: "/student",
    icon: Contact,
  },
  {
    title: "Teacher",
    url: "/teacher",
    icon: Users,
  },
  {
    title: "Exam",
    url: "/exam",
    icon: SquareMenu,
  },
];

const recents = [
  {
    title: "be prepared for final exam",
    type: "blog",
    id: "bolg-123",
    icon: NotebookPen,
  },
  {
    title: "Computer Sience",
    type: "class",
    id: "class-123",
    icon: UserPen,
  },
  {
    title: "Final Exam preparation",
    type: "exam",
    id: "exam-123",
    icon: UserPen,
  },
  {
    title: "be prepared for final exam",
    type: "blog",
    id: "bolg-123",
    icon: NotebookPen,
  },
  {
    title: "Computer Sience",
    type: "class",
    id: "class-123",
    icon: UserPen,
  },
  {
    title: "Final Exam preparation",
    type: "exam",
    id: "exam-123",
    icon: UserPen,
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
                  {/* <div className="flex aspect-square size-8 items-cengter justify-center rounded-l bg-sidebar-primary text-gray-app"> */}
                  {/* <GalleryVerticalEnd className="size-4" /> */}
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
                      className={"size-7 ml-auto"}
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
                  <div className="flex justify-between grow">
                    <div className="font-medium">Teshome Abebe</div>
                    <span className="font-medium text-gray-solid text-sm">
                      student
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2">
                  <div className="flex justify-between grow">
                    <div className="font-medium">Teshome Abebe</div>
                    <span className="font-medium text-gray-solid text-sm">
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
        <SidebarGroup>
          <SidebarGroupLabel>Recents</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recents.map((recents) => (
                <SidebarMenuItem key={recents.title}>
                  <SidebarMenuButton asChild>
                    <Link href={"#"}>
                      <recents.icon />
                      <span className="font-medium">{recents.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
