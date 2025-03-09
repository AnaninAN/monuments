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

export const login = async (
  values: TLoginFormData,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Поля с ошибками' };
  }

  const { email, password, code } = validatedFields.data;

  const exitingUser = await getUserByEmail(email);

  if (!exitingUser || !exitingUser.email || !exitingUser.password) {
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

    return { success: 'Письмо для подтверждения email отправлено на почту!' };
  }

  if (exitingUser.isTwoFactorEnabled && exitingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(exitingUser.email);

      if (!twoFactorToken) return { error: 'Неисправный код!' };

      if (twoFactorToken.token !== code) return { error: 'Неисправный код!' };

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) return { error: 'Код просрочен' };

      db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        exitingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: exitingUser.id,
        },
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
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Имя пользователя или(и) пароль не верны!' };
        default:
          return { error: 'Что-то пошло не так!' };
      }
    }

    throw error;
  }
};
