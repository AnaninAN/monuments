'use client';

import { PropsWithChildren } from 'react';

import { logout } from '@/actions/logout';
import { useUserStore } from '@/store/user';

export const LogoutButton = ({ children }: PropsWithChildren) => {
  const { user } = useUserStore();

  const onClick = () => {
    logout(user?.email);
  };

  return (
    <span
      onClick={onClick}
      className="cursor-pointer flex items-center gap-2 w-full"
    >
      {children}
    </span>
  );
};
