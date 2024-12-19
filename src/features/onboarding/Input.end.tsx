'use client';

import { trpc } from '@/lib/trpc/client';
import { Button } from '@/primitives/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/primitives/form';
import { Input } from '@/primitives/input';
import type {
  JoinSectionInput,
  JoinSectionOutput,
} from '@/server/router/onboarding.schema';
import { ZJoinSectionInput } from '@/server/router/onboarding.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Icon } from '@/primitives/icon';

export default function JoinInput() {
  const [searchResult, setSearchResult] = useState<JoinSectionOutput>();

  const requestSection = trpc.onboardingRouter.requestSection.useMutation();
  return (
    <div className="flex flex-col gap-2">
      <CreateClassOnboarding onSearchResult={setSearchResult} />
      {searchResult && (
        <div className="flex justify-center gap-4 rounded-lg bg-gray-subtle p-2 text-sm font-medium">
          <span>{searchResult.name}</span>
          <span className="text-gray-solid">{'@' + searchResult.username}</span>
          <button
            className="text-orange-foreground-muted"
            onClick={() => {
              requestSection.mutate(searchResult);
            }}
          >
            {requestSection.isSuccess && 'sent'}
            {requestSection.isPending && 'loading'}
            {!(requestSection.isPending || requestSection.isSuccess) &&
              'request'}
          </button>
        </div>
      )}
      {requestSection.isError && (
        <p className="text-[0.8rem] font-medium text-red-solid">
          <Icon name="CircleX" className="mr-1.5 inline-block size-4" />
          {requestSection.error.message}
        </p>
      )}
    </div>
  );
}

function CreateClassOnboarding({
  onSearchResult,
}: {
  onSearchResult: Dispatch<SetStateAction<JoinSectionOutput | undefined>>;
}) {
  const form = useForm<JoinSectionInput>({
    resolver: zodResolver(ZJoinSectionInput),
    defaultValues: {
      username: '',
    },
  });

  const createClass = trpc.onboardingRouter.joinSection.useMutation({
    onSuccess: (data) => {
      onSearchResult(data);
    },
    onError: (error) => {
      form.setError('username', {
        type: 'server',
        message: error.message,
      });
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          createClass.mutate(data);
        })}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Join</FormLabel>
              <FormControl>
                <div className="flex">
                  <Input
                    className="-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10"
                    placeholder="@classname"
                    {...field}
                  />
                  <Button
                    type="submit"
                    variant={'search'}
                    isLoading={createClass.isPending}
                    disabled={createClass.isPending}
                    // TODO add more variants to button that works
                    className="rounded-none rounded-e-lg py-1"
                  >
                    {!createClass.isPending && <Icon name="Search" size={16} />}
                    <span>Search</span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
