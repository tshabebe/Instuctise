'use client';

import { trpc } from '@/lib/trpc/client';
import type {
  JoinSectionInput,
  JoinSectionOutput,
} from '@/server/router/onboarding.schema';
import { ZJoinSectionInput } from '@/server/router/onboarding.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Icon } from '@/primitives/icon';
import {
  Button,
  FieldError,
  Input,
  Label,
  TextField,
} from 'react-aria-components';

export default function JoinInput() {
  const [searchResult, setSearchResult] = useState<JoinSectionOutput>();

  const requestSection = trpc.onboardingRouter.requestSection.useMutation();
  return (
    <div className="flex flex-col gap-2">
      <CreateClassOnboarding onSearchResult={setSearchResult} />
      {searchResult && (
        <div className="flex justify-center gap-4 rounded-lg bg-gray-elevation-1 p-2 text-sm font-medium">
          <span>{searchResult.name}</span>
          <span className="text-gray-text-tertiary">
            {'@' + searchResult.username}
          </span>
          <button
            className="text-orange-text-primary"
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
        <p className="text-[0.8rem] font-medium text-red-text-tertiary">
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
    <form
      onSubmit={form.handleSubmit((data) => {
        createClass.mutate(data);
      })}
    >
      <Controller
        control={form.control}
        name="username"
        render={({
          field: { ref, ...field },
          fieldState: { error, invalid },
        }) => (
          <TextField {...field} isInvalid={invalid}>
            <Label>Name</Label>
            <div className="flex">
              <Input
                className="-me-px flex-1 rounded-l-md border bg-gray-elevation-2 px-3 py-1 placeholder:text-gray-text-tertiary focus-visible:z-10"
                placeholder="@classname"
                ref={ref}
              />
              <Button
                type="submit"
                isPending={createClass.isPending}
                isDisabled={createClass.isPending}
                className="flex items-center justify-center gap-2 rounded-r-lg border border-gray-elevation-2-border bg-gray-elevation-2 px-2 py-1 hover:bg-gray-elevation-3"
              >
                {!createClass.isPending && <Icon name="Search" size={16} />}
                <span>Search</span>
              </Button>
            </div>
            <FieldError className={'text-red-text-secondary'}>
              {error?.message}
            </FieldError>
          </TextField>
        )}
      />
    </form>
  );
}
