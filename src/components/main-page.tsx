'use client';

import { PropsWithChildren, useEffect } from 'react';

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { ExtendedUser } from '@/next-auth';
import { useUserStore } from '@/store/user';

interface MainPageProps {
  user: ExtendedUser;
}

export const MainPage = ({
  children,
  user,
}: PropsWithChildren<MainPageProps>) => {
  const { setUser } = useUserStore();

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <div className="px-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};
