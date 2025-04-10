'use client';

import { Suspense } from 'react';
import { Role } from '@prisma/client';

import Unauthorized from '@/components/unauthorized';
import { LoadingDataTable } from '@/components/loading/loading-data-table';
import { useUserStore } from '@/store/user';

const withAuth = (
  Component: React.ComponentType,
  allowedRoles: Role[],
  title?: string
): React.FC => {
  const Auth: React.FC = (props) => {
    const { user } = useUserStore();

    if (!user) {
      return;
    } else if (!allowedRoles.includes(user.role)) {
      return <Unauthorized />;
    }

    return (
      <Suspense fallback={<LoadingDataTable title={title} />}>
        <Component {...props} />
      </Suspense>
    );
  };

  return Auth;
};

export default withAuth;
