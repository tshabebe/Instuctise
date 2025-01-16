'use client';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CreateClassInput } from '@/server/router/onboarding.schema';
import { ZCreateClassInput } from '@/server/router/onboarding.schema';
import { trpc } from '@/lib/trpc/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { paths } from '@/config/paths';
import { Toaster } from './error.toast';
import { useState } from 'react';
import JoinInput from './Input.end';
import {
  Button,
  Dialog,
  DialogTrigger,
  FieldError,
  Input,
  Label,
  Modal,
  ModalOverlay,
  TextField,
} from 'react-aria-components';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const MotionModal = motion(Modal);
const MotionModalOverlay = motion(ModalOverlay);

type AnimationState = 'unmounted' | 'hidden' | 'visible';

export function Onboarding() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex basis-48 flex-col gap-4">
        <div className="flex">
          <JoinInput />
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-elevation-2-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-gray-text-tertiary">
              Or continue TO
            </span>
          </div>
        </div>
        <CreateClass />
      </div>
    </div>
  );
}
function CreateClass() {
  const [animation, setAnimation] = useState<AnimationState>('unmounted');

  return (
    <DialogTrigger
      onOpenChange={(isOpen) => {
        if (isOpen) {
          // When opening, directly go from unmounted to visible
          setAnimation('visible');
        } else {
          // When closing, first animate to hidden
          setAnimation('hidden');
        }
      }}
    >
      <Button
        className={
          'rounded-md bg-gradient-to-r from-orange to-red py-1.5 font-bold text-gray-base'
        }
      >
        Create Class
      </Button>
      {animation !== 'unmounted' && (
        <MotionModalOverlay
          className={
            'fixed inset-0 z-10 flex h-full items-center justify-center bg-background/50'
          }
          isDismissable
          isExiting={animation === 'hidden'}
          onAnimationComplete={(definition) => {
            if (definition === 'hidden') {
              setAnimation('unmounted');
            }
          }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={animation}
        >
          <MotionModal
            className={'flex items-center justify-center bg-gray-elevation-1'}
          >
            <Dialog>
              <CreateClassOnboarding />
            </Dialog>
          </MotionModal>
        </MotionModalOverlay>
      )}
    </DialogTrigger>
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
        redirectTo
          ? decodeURIComponent(redirectTo)
          : paths.app.dashboard.getHref(),
      );
    },
  });

  const handleUsernameSelection = (username: string) => {
    setSelectedUsername(username);
    form.setValue('username', username);
  };

  return (
    <form
      onSubmit={form.handleSubmit((data) => {
        createClass.mutate(data);
      })}
      className="flex flex-col gap-4 rounded-md border px-4 py-6"
    >
      <h2 className="text-lg font-extrabold">New Class</h2>
      <Controller
        control={form.control}
        name="name"
        render={({
          field: { ref, ...field },
          fieldState: { error, invalid },
        }) => (
          <TextField
            {...field}
            isInvalid={invalid}
            validationBehavior="aria"
            className={'flex flex-col'}
          >
            <Label className="text-gray-text-secondary">Name</Label>
            <Input
              ref={ref}
              className={
                'rounded-md border border-gray-elevation-4 bg-gray-elevation-2 px-2 py-1'
              }
            />
            <FieldError>{error?.message}</FieldError>
          </TextField>
        )}
      />
      <Controller
        control={form.control}
        name="username"
        render={({
          field: { ref, ...field },
          fieldState: { error, invalid },
        }) => (
          <TextField {...field} isInvalid={invalid} className={'flex flex-col'}>
            <Label className="text-gray-text-secondary">username</Label>
            <Input
              ref={ref}
              className={
                'rounded-md border border-gray-elevation-4 bg-gray-elevation-2 px-2 py-1'
              }
            />
            <FieldError>{error?.message}</FieldError>
          </TextField>
        )}
      />
      <div className="flex gap-2">
        {isPending ? (
          <>
            <div className="h-4 w-32 bg-gray-elevation-1" />
            <div className="h-4 w-32 bg-gray-elevation-1" />
          </>
        ) : (
          <ul className="flex grow flex-wrap justify-between gap-2">
            {data
              ? data.suggestions.map((username) => (
                  <li key={username}>
                    <Button
                      type="button"
                      onPress={() => {
                        handleUsernameSelection(username);
                      }}
                      className={cn(
                        'transition-colors duration-200',
                        selectedUsername && 'bg-gray-elevation-2',
                      )}
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
        className={
          'rounded-md bg-gradient-to-r from-orange to-red py-1.5 font-bold text-gray-base'
        }
        isPending={createClass.isPending}
        isDisabled={createClass.isPending}
      >
        {createClass.isPending ? 'Redirecting' : 'Create class'}
      </Button>
      {createClass.isError && <Toaster message={createClass.error.message} />}
    </form>
  );
}
