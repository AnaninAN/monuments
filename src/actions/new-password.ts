'use server';

import bcrypt from 'bcryptjs';

import { getPasswordResetTokenByToken } from '@/data/password-reset-token';
import { getUserByEmail } from '@/data/user';
import {
  NewPasswordFormSchema,
  TNewPasswordFormData,
} from '@/schemas/new-password-form-schema';
import { db } from '@/lib/db';

export const newPassword = async (
  values: TNewPasswordFormData,
  token?: string | null
) => {
  if (!token) {
    return { error: 'Токен отсутствует!' };
  }

  const validatedFields = NewPasswordFormSchema.safeParse(values);

  if (!validatedFields.success)
    return { error: 'Поля заполнены не корректно!' };

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) return { error: 'Некорректный токен!' };

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) return { error: 'Срок действие токена истек!' };

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) return { error: 'Пользователь не существует!' };

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: 'Пароль изменен!' };
};
