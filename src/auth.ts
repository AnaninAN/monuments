import NextAuth from 'next-auth';
import { encode, decode } from 'next-auth/jwt';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Role } from '@prisma/client';

import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';
import { SessionManager } from '@/lib/session';
import { logger } from '@/lib/logger/logger';
import { getUserFromCache, setUserInCache } from '@/lib/cache';
import authConfig from '@/auth.config';
import { db } from '@/lib/db';
import { getUserById } from '@/data/user';

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user, account }) {
      try {
        await db.$transaction(async (tx) => {
          await tx.user.update({
            where: { id: user.id },
            data: { emailVerified: new Date() },
          });
        });

        logger.info('auth', 'Аккаунт связан', {
          userId: user.id,
          provider: account.provider,
        });
      } catch (error) {
        console.error('Ошибка при связывании аккаунта:', error);
        logger.error('auth', 'Ошибка при связывании аккаунта', {
          userId: user.id,
          provider: account.provider,
        });
      }
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider !== 'credentials') return true;
        if (!user.id) {
          logger.error('auth', 'Неверный идентификатор пользователя', {
            userId: user.id,
          });
          return false;
        }

        const existingUser = await getUserById(user.id);
        if (!existingUser?.emailVerified) {
          logger.error('auth', 'Неподтвержденный адрес электронной почты', {
            userId: user.id,
          });
          return false;
        }

        if (existingUser.isTwoFactorEnabled) {
          const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
            existingUser.id
          );

          if (!twoFactorConfirmation) {
            logger.error('auth', 'Требуется двухфакторная аутентификация', {
              userId: user.id,
            });
            return false;
          }

          await db.$transaction(async (tx) => {
            await tx.twoFactorConfirmation.delete({
              where: { id: twoFactorConfirmation.id },
            });
          });
        }

        logger.info('user', 'Пользователь успешно вошел в систему', {
          email: user.email,
        });

        return true;
      } catch (error) {
        console.error('Ошибка входа:', error);
        logger.error('auth', 'Ошибка входа', {
          userId: user.id,
        });
        return false;
      }
    },
    async jwt({ token }) {
      try {
        if (!token.sub) return token;

        const cachedUser = getUserFromCache(token.sub);
        if (cachedUser) {
          return {
            ...token,
            ...cachedUser,
          };
        }

        if (SessionManager.shouldRefreshToken(token.jti as string)) {
          const existingUser = await getUserById(token.sub);
          if (!existingUser) return token;

          const userData = {
            name: existingUser.name,
            lastname: existingUser.lastname,
            email: existingUser.email,
            role: existingUser.role,
            isTwoFactorEnabled: existingUser.isTwoFactorEnabled,
          };

          setUserInCache(token.sub, userData);

          return {
            ...token,
            ...userData,
          };
        }

        return token;
      } catch (error) {
        console.error('Ошибка при обновлении токена:', error);
        logger.error('auth', 'Ошибка при обновлении токена', {
          userId: token.sub,
        });
        return token;
      }
    },
    async session({ token, session }) {
      try {
        if (token.sub && session.user) {
          session.user.id = token.sub;
          session.user.role = token.role as Role;
          session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
          session.user.name = token.name as string;
          session.user.lastname = token.lastname as string;
          session.user.email = token.email as string;
        }

        return session;
      } catch (error) {
        console.error('Ошибка при создании сеанса:', error);
        logger.error('auth', 'Ошибка при создании сеанса', {
          userId: token.sub,
        });
        return session;
      }
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 дней
    updateAge: 24 * 60 * 60, // 24 часа
  },
  jwt: {
    encode,
    decode,
    maxAge: 30 * 24 * 60 * 60, // 30 дней
  },
  ...authConfig,
});
