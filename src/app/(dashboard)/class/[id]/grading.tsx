"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// import { toast } from "@/components/hooks/use-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/primitives/form";
import { Input } from "@/primitives/input";
import { Textarea } from "@/primitives/textarea";
import { TableDemo } from "./table";
import { Button } from "@/primitives/button";
import { Icon } from "@/primitives/icon";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  classNotice: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  additionalNotes: z
    .string()
    .min(10, {
      message: "Message must be at least 10 characters.",
    })
    .max(160, {
      message: "Message must not be longer than 30 characters.",
    }),
});

export function Grading() {
  return (
    <div className="bg-gray-subtle border border-gray-subtle-border rounded-lg px-6 py-4 gap-4 flex flex-col">
      <div className="flex justify-between items-center">
        <div className="tracking-tight text-xl font-bold text-gray-solid">
          Grading
        </div>
        <span className="text-pink-foreground-muted font-semibold">
          view all
        </span>
      </div>
      <div className="flex gap-4">
        <div>
          <InputForm />
        </div>
        <div className="border border-gray-subtle-border bg-gray-element p-4 rounded-lg flex flex-col">
          <div className="flex justify-between items-center">
            <div className="font-semibold text-sm text-gray-solid-hover">
              Student
            </div>
            <Button variant={"ghost"} className="w-7 h-7">
              <Icon name="Search" />
            </Button>
          </div>
          <TableDemo />
        </div>
      </div>
    </div>
  );
}

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-solid-hover">
                Assesment Score
              </FormLabel>
              <FormControl>
                <Input placeholder="Grade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="classNotice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-solid-hover">
                Assesment Score
              </FormLabel>
              <FormControl>
                <Input placeholder="Grade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="additionalNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-solid-hover">
                Additional Notes
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Message for the student along the Assesment"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <Button type="submit">Submit</Button> */}
      </form>
    </Form>
  );
}
