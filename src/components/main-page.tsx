import { PropsWithChildren } from 'react';

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { currentUser } from '@/lib/auth';

export const MainPage = async ({ children }: PropsWithChildren) => {
  const user = await currentUser();

  if (!user) return;

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
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
