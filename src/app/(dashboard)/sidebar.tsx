"use client";
import {
  Contact,
  // GalleryVerticalEnd,
  House,
  SquareMenu,
  UserPen,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/primitives/sidebar";
import Image from "next/image";
import Link from "next/link";
import Logo from "../logo.png";
import { usePathname } from "next/navigation";

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

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar className="basis-48 border-gray-subtle-border" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="">
              <Link href="#">
                {/* <div className="flex aspect-square size-8 items-cengter justify-center rounded-l bg-sidebar-primary text-gray-app"> */}
                {/* <GalleryVerticalEnd className="size-4" /> */}
                <Image
                  src={Logo}
                  width={32}
                  height={32}
                  alt="Instructise logo"
                />
                {/* </div> */}
                {/* <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Instructise</span>
                  <span className="text-xs">student</span>
                </div> */}
              </Link>
            </SidebarMenuButton>
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
      </SidebarContent>
    </Sidebar>
  );
}
