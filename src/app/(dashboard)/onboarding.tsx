"use client";
import { Button } from "@/primitives/button";
import {
  Dialog,
  DialogContent,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/primitives/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/primitives/form";
import { Input } from "@/primitives/input";
import { Label } from "@/primitives/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateClass, ZCreateClass } from "@/server/router/onboarding.schema";
import { trpc } from "@/lib/trpc/client";
import { Skeleton } from "@/primitives/skeleton";

export function Onboarding() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex basis-48 flex-col gap-4">
        <div>
          <Label htmlFor="join">Join</Label>
          <Input id="join" placeholder="@class" className="w-72" />
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-subtle-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-gray-solid">
              Or continue TO
            </span>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create class</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] w-80">
            <DialogHeader>
              <DialogTitle>Create class</DialogTitle>
            </DialogHeader>
            <CreateClassOnboarding />
            {/* <DialogFooter> */}
            {/*   <Button type="submit" className="w-full"> */}
            {/*     Create class */}
            {/*   </Button> */}
            {/* </DialogFooter> */}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
function CreateClassOnboarding() {
  const form = useForm<CreateClass>({
    resolver: zodResolver(ZCreateClass),
  });
  const { data, isPending } = trpc.onboardingRouter.getUsername.useQuery();
  const { mutate } = trpc.onboardingRouter.createClass.useMutation();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          mutate(data);
        })}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input placeholder="Enter class name" {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field}></Input>
                {/* <Button variant={"ghost"}>@teshome</Button> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          {isPending ? (
            <>
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
            </>
          ) : (
            <ul className="flex flex-wrap">
              {data
                ? data.suggestions.map((username) => (
                    <Button
                      type="button"
                      key={username}
                      variant={"ghost"}
                      size={"sm"}
                      onClick={() => {
                        form.setValue("username", username);
                      }}
                    >
                      <li>{username}</li>
                    </Button>
                  ))
                : "no data found"}
            </ul>
          )}
        </div>
        <Button type="submit" className="w-full">
          Create class
        </Button>
      </form>
    </Form>
  );
}