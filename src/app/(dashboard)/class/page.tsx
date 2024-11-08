import { Button } from "@/primitives/button";
import { Icon } from "@/primitives/icon";

export default function Class() {
  return (
    <div className="grow px-2 flex flex-col">
      <div className="flex justify-between px-2 py-6">
        <h3 className="scroll-m-20 text-2xl font-bold tracking-tight text-gray-solid">
          Class
        </h3>
        {/* <Button className="px-2">
          <Icon name="Plus" /> New
        </Button> */}
      </div>
      <div className="flex flex-wrap gap-4">
        <CardClass />
        <CardClass />
        <CardClass />
      </div>
    </div>
  );
}

function CardClass() {
  return (
    <div className="flex flex-col px-4 py-2 gap-2 border rounded-lg border-gray-subtle-border bg-gray-subtle">
      <div className="flex justify-between items-center">
        <div className="font-semibold">Computer Science</div>
        <Icon name="Ellipsis" className="text-gray-solid" />
      </div>

      <div className="flex gap-4">
        <div className="flex items-center gap-1">
          <Icon name="UserPen" />
          <span className="text-pink-foreground-muted text-sm font-semibold">
            3
          </span>
          <span className="text-sm font-medium leading-none text-gray-solid">
            teachers
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="GraduationCap" />
          <span className="text-pink-foreground-muted text-sm font-semibold">
            3
          </span>
          <span className="text-sm font-medium leading-none text-gray-solid">
            studentsk
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-2">
          <Button variant={"outline"} size={"sm"}>
            announce
          </Button>
          <Button variant={"outline"} size={"sm"}>
            grade
          </Button>
        </div>
        <small className="text-sm font-medium leading-none text-gray-solid">
          2 hours ago
        </small>
      </div>
    </div>
  );
}
