'use server';

import bcrypt from 'bcryptjs';

import {
  getUserByEmailData,
  getUserByIdIntData,
  getUserMaxIdIntData,
  updateUserData,
} from '@/data/user';
import { db } from '@/lib/db';
import { TUserFormData, UserFormSchema } from '@/schemas/user-form-schema';

export const userAction = async (values: TUserFormData, idInt?: number) => {
  if (idInt) {
    const dbUser = await getUserByIdIntData(idInt);

    if (!dbUser) {
      return { error: 'Пользователь не найден!' };
    }

    const count = await updateUserData(idInt, values);

    if (count === null) {
      return { error: 'Пользователь не обновлен!' };
    }

    return { success: 'Данные пользователя обновлены!', count };
  } else {
    const validatedFields = UserFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: 'Поля с ошибками' };
    }

    const hashedPassword = await bcrypt.hash('11111111', 10);
    const idInt = (await getUserMaxIdIntData()) || 0 + 1;

    const valuesWithPassword = {
      ...validatedFields.data,
      password: hashedPassword,
      idInt,
    };

    const existingUser = await getUserByEmailData(validatedFields.data.email);

    if (existingUser) {
      return { error: 'Такой email уже используется!' };
    }

    await db.user.create({
      data: {
        ...valuesWithPassword,
      },
    });

    return { success: 'Пользователь создан!' };
  }
};
