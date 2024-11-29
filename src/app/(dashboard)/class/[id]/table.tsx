import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/primitives/table";
import { Avatar, AvatarFallback, AvatarImage } from "../../avator";

const invoices = [
  {
    UserProfile,
    name: "teshome abebe",
    username: "teshe234",
    key: "1",
  },
  {
    UserProfile,
    name: "teshome abebe",
    username: "teshe234",
    key: "2",
  },
  {
    UserProfile,
    name: "teshome abebe",
    username: "teshe234",
    key: "3",
  },
];

export function TableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-subtle-border">
          <TableHead>name</TableHead>
          <TableHead>username</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((student) => (
          <TableRow key={student.key} className="border-gray-subtle-border">
            <TableCell className="font-medium flex gap-2 items-center">
              <student.UserProfile />
              {student.name}
            </TableCell>
            <TableCell className="font-semibold text-gray-solid-hover">
              {student.username}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
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
