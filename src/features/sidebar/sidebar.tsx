import { Button } from '@/primitives/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/primitives/dropdown-menu';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Logo from '@/app/icon.png';
import { Icon } from '@/primitives/icon';

export function AppSidebar() {
  return (
    <div className="flex basis-56 flex-col border-r-gray-subtle-border p-2">
      <div>hello there </div>
      <div>another hello </div>
      <DropdownMenu>
        <div className="flex">
          <Image src={Logo} width={32} height={32} alt="Instructise logo" />
          {/* </div> */}
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold">Instructise</span>
            <span className="text-xs">student</span>
          </div>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className={'ml-auto size-7'}>
              <Icon name="ChevronsUpDown" />
              <span className="sr-only">Switch User</span>
            </Button>
          </DropdownMenuTrigger>
        </div>
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
    </div>
  );
}
