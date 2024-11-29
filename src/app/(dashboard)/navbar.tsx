import { Button } from "@/primitives/button";
import { Icon } from "@/primitives/icon";

import { Avatar, AvatarFallback, AvatarImage } from "./avator";

import { Input } from "@/primitives/input";
import { SidebarTrigger } from "@/primitives/sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/primitives/breadcrumb";
import { Slash } from "lucide-react";

export function Navbar() {
  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <BreadcrumbWithCustomSeparator />
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Input placeholder="sections,teachers,students" className="pr-10" />
          <Button
            variant={"ghost"}
            className="absolute right-0 w-7 h-fit top-0"
          >
            <Icon name="Search" />
          </Button>
        </div>
        <Icon name="Bell"></Icon>
        <UserProfile />
      </div>
    </div>
  );
}

function UserProfile() {
  // const { user } = await validateSession();
  return (
    <Avatar>
      <AvatarImage
        src="https://lh3.googleusercontent.com/a/ACg8ocIf6EV7T-T6cH0y-0E6nm32UI-IPj47UkDY-Rb6ntx4tKPTGA=s96-c"
        alt="@shadcn"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

export function BreadcrumbWithCustomSeparator() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/class">Class</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
