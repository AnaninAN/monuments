import { Role } from '@prisma/client';
import { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  role: Role;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  lastname: string;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
