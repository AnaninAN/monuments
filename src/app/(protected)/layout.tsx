import { MainPage } from '@/components/main-page';
import { PropsWithChildren } from 'react';

export default function ProtectedLayout({ children }: PropsWithChildren) {
  return <MainPage>{children}</MainPage>;
}
