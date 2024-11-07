import { Button } from "@/primitives/button";
import { Icon } from "@/primitives/icon";

import { Avatar, AvatarFallback, AvatarImage } from "./avator";

import { Input } from "@/primitives/input";
import { SidebarTrigger } from "@/primitives/sidebar";

export function Navbar() {
  return (
    <div className="flex items-center justify-between p-2">
      <SidebarTrigger />
      <div className="flex items-center gap-2">
        <div className="relative">
          <Input placeholder="sections,teachers,students" className="pr-10" />
          <Button variant={"ghost"} className="absolute right-0 top-0">
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
