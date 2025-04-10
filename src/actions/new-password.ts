'use server';

import bcrypt from 'bcryptjs';

import { getPasswordResetTokenByToken } from '@/data/password-reset-token';
import { getUserByEmailData } from '@/data/user';
import {
  NewPasswordFormSchema,
  TNewPasswordFormData,
} from '@/schemas/new-password-form-schema';
import { db } from '@/lib/db';
import { logger } from '@/lib/logger/logger';

export const newPassword = async (
  values: TNewPasswordFormData,
  token?: string | null
) => {
  try {
    if (!token) {
      logger.warn('user', 'Попытка сброса пароля без токена');
      return { error: 'Токен отсутствует!' };
    }

    const validatedFields = NewPasswordFormSchema.safeParse(values);

    if (!validatedFields.success) {
      logger.warn('user', 'Неверные данные формы сброса пароля', {
        errors: validatedFields.error,
      });
      return { error: 'Поля заполнены не корректно!' };
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
      logger.warn('user', 'Использован неверный токен сброса пароля', {
        token,
      });
      return {
        error: 'Некорректный токен!',
      };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      logger.warn(
        'user',
        'Использован токен сброса пароля с истекшим сроком действия',
        {
          token,
        }
      );
      return { error: 'Срок действие токена истек!' };
    }

    const existingUser = await getUserByEmailData(existingToken.email);

    if (!existingUser) {
      logger.warn(
        'user',
        'Попытка сброса пароля для несуществующего пользователя',
        {
          email: existingToken.email,
        }
      );
      return { error: 'Пользователь не существует!' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: existingUser.id },
        data: {
          password: hashedPassword,
        },
      });

      await tx.passwordResetToken.delete({
        where: { id: existingToken.id },
      });
    });

    logger.info('user', 'Пароль успешно сброшен', { userId: existingUser.id });
    return { success: 'Пароль изменен!' };
  } catch (error) {
    logger.error('user', 'Ошибка при сбросе пароля', { error });
    return { error: 'Произошла ошибка при сбросе пароля!' };
  }
};
