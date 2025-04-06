import { Role, User } from '@prisma/client';

export type ExtendedUser = User & {
  role: Role;
  isTwoFactorEnabled: boolean;
  lastname: string;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
