'use client';

import { paths } from '@/config/paths';
import { trpc } from '@/lib/trpc/client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/primitives/form';
import { Icon } from '@/primitives/icon';
import { Input } from '@/primitives/input';
import type { JoinSection } from '@/server/router/onboarding.schema';
import { ZJoinSection } from '@/server/router/onboarding.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function JoinInput() {
  return (
    <div className="flex flex-col gap-2">
      <CreateClassOnboarding />
      <div className="flex justify-center gap-4 rounded-lg bg-gray-subtle p-2 text-sm font-medium">
        <span>Teshome Abebe</span>
        <span className="text-gray-solid">@class234</span>
        <button className="text-orange-foreground-muted">request</button>
      </div>
    </div>
  );
}
function CreateClassOnboarding() {
  const form = useForm<JoinSection>({
    resolver: zodResolver(ZJoinSection),
    defaultValues: {
      username: '',
    },
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  const createClass = trpc.onboardingRouter.joinSection.useMutation({
    onSuccess: () => {
      router.replace(
        redirectTo ? decodeURIComponent(redirectTo) : paths.app.class.getHref(),
      );
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
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-e-lg border border-gray-subtle-border bg-gray-element px-3 text-sm font-medium text-foreground-muted outline-offset-2 transition-colors hover:bg-gray-element-hover hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-solid-hover disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Icon name="Search" size={16} />
                    <span>Search</span>
                  </button>
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
