'use client';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { ModeToggle } from '@/components/mode-toggle';
import { ExtendedUser } from '@/next-auth';
import { navMain } from '@/consts/nav-main';

interface AppSidebar extends React.ComponentProps<typeof Sidebar> {
  user: ExtendedUser;
}

export function AppSidebar({ user, ...props }: AppSidebar) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="fle">
        <ModeToggle />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
