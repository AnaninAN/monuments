'use server';

import { Suspense } from 'react';
import { Role } from '@prisma/client';

import { auth } from '@/auth';

import Unauthorized from '@/components/unauthorized';
import Loading from '@/components/loading';

const withAuth = (
  Component: React.ComponentType,
  allowedRoles: Role[],
  title?: string
): React.FC => {
  const Auth: React.FC = async (props) => {
    const session = await auth();

    if (!session) {
      return;
    } else if (!allowedRoles.includes(session.user.role)) {
      return <Unauthorized />;
    }

    return (
      <Suspense fallback={<Loading title={title} />}>
        <Component {...props} />
      </Suspense>
    );
  };

  return Auth;
};

export default withAuth;
