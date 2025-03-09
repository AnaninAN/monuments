'use server';

import { Role } from '@prisma/client';

import { auth } from '@/auth';

import Unauthorized from '@/components/unauthorized';

const withAuth = (
  Component: React.ComponentType,
  allowedRoles: Role[]
): React.FC => {
  const Auth: React.FC = async (props) => {
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
