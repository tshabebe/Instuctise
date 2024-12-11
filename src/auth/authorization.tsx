// import { Comment, User } from "@/types/api";

import type { User } from '@/db/schema';
import { ZInsertUserTable } from '@/db/schema';
import type { z } from 'zod';
import type { ReactNode } from 'react';
import { useCallback } from 'react';

export const userRoles = ZInsertUserTable.pick({ userRole: true })
  .shape.userRole.unwrap()
  .unwrap();

type RoleTypes = z.infer<typeof userRoles>;

export const POLICIES = {
  // "add:teacher": (
  //   user: User,
  //   department: z.infer<typeof InsertDepartmentSchema>,
  // ) => {
  //   if (department.userId === user?.id) {
  //     return true;
  //   }
  //   return false;
  // },
  // "add:attendance": (
  //   user: User,
  //   department: z.infer<typeof InsertDepartmentSchema>,
  // ) => {
  //   if (department.userId === user?.id) {
  //     return true;
  //   }
  //   return false;
  // },
};

export const useAuthorization = () => {
  const checkAccess = useCallback(
    ({
      allowedRoles,
      user,
    }: {
      allowedRoles: RoleTypes[] | undefined;
      user: User | undefined;
    }) => {
      if (allowedRoles && allowedRoles.length > 0 && user) {
        return allowedRoles.includes(user.userRole as RoleTypes);
      }

      return true;
    },
    [],
  );

  return { checkAccess };
};

type AuthorizationProps = {
  forbiddenFallback?: ReactNode;
  children: ReactNode;
  user?: User;
} & (
  | {
      allowedRoles: RoleTypes[];
      policyCheck?: never;
    }
  | {
      allowedRoles?: never;
      policyCheck: boolean;
    }
);

export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children,
  user,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles && user) {
    canAccess = checkAccess({ allowedRoles, user });
  }

  if (typeof policyCheck !== 'undefined') {
    canAccess = policyCheck;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};
