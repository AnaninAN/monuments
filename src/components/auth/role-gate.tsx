import { PropsWithChildren } from 'react';
import { Role } from '@prisma/client';

import { FormError } from '@/components/form-error';
import { currentRole } from '@/lib/auth';

interface RoleGateProps {
  allowedRole: Role;
}

export const RoleGate = async ({
  children,
  allowedRole,
}: PropsWithChildren<RoleGateProps>) => {
  const role = await currentRole();

  if (role !== allowedRole) {
    return (
      <FormError message="You do not have permission to view this content!" />
    );
  }

  return <>{children}</>;
};
