import { PropsWithChildren } from 'react';

import { MainPage } from '@/components/main-page';

import { currentUser } from '@/lib/auth';

export default async function ProtectedLayout({ children }: PropsWithChildren) {
  const user = await currentUser();

  if (!user) return;

  return <MainPage user={user}>{children}</MainPage>;
}
