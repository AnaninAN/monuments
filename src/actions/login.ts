'use server';

import { AuthError } from 'next-auth';

import { LoginFormSchema, TLoginFormData } from '@/schemas/login-form-schema';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { getUserByEmail } from '@/data/user';
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from '@/lib/tokens';
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/lib/mail';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { db } from '@/lib/db';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';
import { RateLimit } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/ip';
import { logger } from '@/lib/logger/logger';

const rateLimit = new RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
});

export const login = async (
  values: TLoginFormData,
  callbackUrl?: string | null
) => {
  const ip = await getClientIp();
  if (!(await rateLimit.check(ip))) {
    logger.warn('user', 'Слишком много попыток входа', { ip });
    return { error: 'Слишком много попыток входа. Попробуйте еще раз позже!' };
  }

  const validatedFields = LoginFormSchema.safeParse(values);

  if (!validatedFields.success) {
    logger.error('user', 'Неверные данные формы входа', { ip });
    return { error: 'Поля с ошибками!' };
  }

  const { email, password, code } = validatedFields.data;

  const exitingUser = await getUserByEmail(email);

  if (!exitingUser || !exitingUser.email) {
    logger.error('user', 'Недействительные данные', { email, ip });
    return { error: 'Недействительные данные!' };
  }

  if (!exitingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      exitingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    logger.info('user', 'Письмо для подтверждения email отправлено на почту.', {
      email,
      ip,
    });
    return { success: 'Письмо для подтверждения email отправлено на почту.' };
  }

  if (exitingUser.isTwoFactorEnabled && exitingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(exitingUser.email);

      if (!twoFactorToken) {
        logger.error('user', 'Неудачная попытка входа', { email, ip });
        return { error: 'Неисправный код!' };
      }

      if (twoFactorToken.token !== code) {
        logger.error('user', 'Недействительный код', { email, ip });
        return { error: 'Недействительный код!' };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        logger.error('user', 'Код просрочен', { email, ip });
        return { error: 'Код просрочен!' };
      }

      await db.$transaction(async (tx) => {
        await tx.twoFactorToken.delete({
          where: { id: twoFactorToken.id },
        });
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        exitingUser.id
      );

      if (existingConfirmation) {
        await db.$transaction(async (tx) => {
          await tx.twoFactorConfirmation.delete({
            where: {
              id: existingConfirmation.id,
            },
          });
        });
      }

      await db.$transaction(async (tx) => {
        await tx.twoFactorConfirmation.create({
          data: {
            userId: exitingUser.id,
          },
        });
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(exitingUser.email);

      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
    return { success: 'Успешный вход!' };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          logger.error('user', 'Недействительные данные', { email, ip });
          return { error: 'Имя пользователя или(и) пароль не верны!' };
        default:
          logger.error('user', 'Что-то пошло не так!', { email, ip });
          return { error: 'Что-то пошло не так!' };
      }
    }

    throw error;
  }
};
