import { Icon } from '@/primitives/icon';

export function SideBar() {
  return (
    <div className="flex basis-48 flex-col gap-8 border-r border-gray-subtle-border p-4">
      <div className="font-bold text-xl">Instructise</div>
      <Menu />
    </div>
  );
}

function Menu() {
  return (
    <div className="flex flex-col gap-2 text-gray">
      <div className="flex gap-2 hover:text-gray-foreground-muted hover:cursor-pointer">
        <Icon name="House" size={20} />
        <div className="font-medium">home</div>
      </div>
      <div className="flex gap-2">
        <Icon name="UserPen" size={20} />
        <div className="font-medium">class</div>
      </div>
      <div className="flex gap-2">
        <Icon name="Contact" size={20} />
        <div className="font-medium">students</div>
      </div>
      <div className="flex gap-2">
        <Icon name="Users" size={20} />
        <div className="font-medium">teachers</div>
      </div>
      <div className="flex gap-2">
        <Icon name="SquareMenu" size={20} />
        <div className="font-medium">exams</div>
      </div>
    </div>
  );
}