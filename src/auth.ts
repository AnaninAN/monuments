import { getTwoFactorConfirmationByUserId } from './data/two-factor-confirmation';
import NextAuth from 'next-auth';
import { encode, decode } from 'next-auth/jwt';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Role } from '@prisma/client';

import authConfig from '@/auth.config';
import { db } from '@/lib/db';
import { getUserById } from '@/data/user';

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true;

      if (!user.id) return false;

      const exitingUser = await getUserById(user.id);

      if (!exitingUser?.emailVerified) return false;

      if (exitingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          exitingUser.id
        );

        if (!twoFactorConfirmation) return false;

        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.lastname = existingUser.lastname;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role as Role;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.name = token.name;
        session.user.lastname = token.lastname as string;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  jwt: { encode, decode },
  ...authConfig,
});
