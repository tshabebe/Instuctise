import { Button } from "@/primitives/button";
import { Icon } from "@/primitives/icon";
import { Grading } from "./grading";

export default function IndvidualClass({ params }: { params: { id: string } }) {
  return (
    <main className="flex flex-col p-8 pt-4 gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold leading-none tracking-tight">
          Computer Science 4th year
        </h2>
        <div className="flex items-center gap-2">
          <Button variant={"subtleOutline"} className="bg-none">
            <Icon name="NotebookPen" />
            Take Attendance
          </Button>
          <Button variant={"subtlePrimary"} className="font-semibold">
            <Icon name="SquarePen" />
            Write
          </Button>
        </div>
      </div>
      <div className="flex">
        <Grading />
      </div>
    </main>
  );
}
