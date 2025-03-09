'use server';

import { Role } from '@prisma/client';

import { auth } from '@/auth';

import Unauthorized from '@/components/unauthorized';

const withAuth = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
  allowedRoles: Role[]
): React.FC<P> => {
  const Auth: React.FC<P> = async (props) => {
    const session = await auth();

    if (!session) {
      return;
    } else if (!allowedRoles.includes(session.user.role)) {
      return <Unauthorized />;
    }

    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
