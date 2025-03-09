'use server';

import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';
import {
  RegisterFormSchema,
  TRegisterFormData,
} from '@/schemas/register-form-schema';
import { getUserByEmail, getUserMaxIdInt } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const register = async (values: TRegisterFormData) => {
  const validatedFields = RegisterFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Поля с ошибками' };
  }

  const { email, password, name, lastname } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const idInt = (await getUserMaxIdInt()) || 0 + 1;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Такой email уже используется!' };
  }

  await db.user.create({
    data: {
      idInt,
      email,
      password: hashedPassword,
      name,
      lastname,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: 'Пользователь создан!' };
};
