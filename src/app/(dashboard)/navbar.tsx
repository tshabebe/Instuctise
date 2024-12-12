import { Avatar, AvatarFallback, AvatarImage } from './avatar';

import { SidebarTrigger } from '@/primitives/sidebar';
import { BreadcrumbNav } from './breadcrumb';

export function Navbar() {
  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <BreadcrumbNav />
      </div>
      <div className="flex items-center gap-2">
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
