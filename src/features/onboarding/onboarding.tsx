'use client';
import { Button } from '@/primitives/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/primitives/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/primitives/form';
import { Input } from '@/primitives/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CreateClassInput } from '@/server/router/onboarding.schema';
import { ZCreateClassInput } from '@/server/router/onboarding.schema';
import { trpc } from '@/lib/trpc/client';
import { Skeleton } from '@/primitives/skeleton';
import { useRouter, useSearchParams } from 'next/navigation';
import { paths } from '@/config/paths';
import { Toaster } from './error.toast';
import { useState } from 'react';
import JoinInput from './Input.end';
export function Onboarding() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex basis-48 flex-col gap-4">
        <div className="flex">
          <JoinInput />
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
            <Button variant={'subtlePrimary'} className="rounded-md py-2">
              Create class
            </Button>
          </DialogTrigger>
          <DialogContent className="w-80 sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create class</DialogTitle>
            </DialogHeader>
            <CreateClassOnboarding />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
function CreateClassOnboarding() {
  const form = useForm<CreateClassInput>({
    resolver: zodResolver(ZCreateClassInput),
  });

  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  const { data, isPending } = trpc.onboardingRouter.getUsername.useQuery();

  const createClass = trpc.onboardingRouter.createClass.useMutation({
    onSuccess: () => {
      router.replace(
        redirectTo ? decodeURIComponent(redirectTo) : paths.app.class.getHref(),
      );
    },
  });

  const handleUsernameSelection = (username: string) => {
    setSelectedUsername(username);
    form.setValue('username', username);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          createClass.mutate(data);
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
            <ul className="flex grow flex-wrap justify-between">
              {data
                ? data.suggestions.map((username) => (
                    <li key={username}>
                      <Button
                        type="button"
                        variant={
                          selectedUsername === username
                            ? 'ghostSelected'
                            : 'ghost'
                        }
                        size={'sm'}
                        onClick={() => {
                          handleUsernameSelection(username);
                        }}
                        className="transition-colors duration-200"
                      >
                        <li>{username}</li>
                      </Button>
                    </li>
                  ))
                : 'no data found'}
            </ul>
          )}
        </div>
        <Button
          type="submit"
          className="w-full"
          isLoading={createClass.isPending}
          disabled={createClass.isPending}
        >
          {createClass.isPending ? 'Redirecting' : 'Create class'}
        </Button>
        {createClass.isError && <Toaster message={createClass.error.message} />}
      </form>
    </Form>
  );
}
