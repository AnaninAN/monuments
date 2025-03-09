'use server';

import bcrypt from 'bcryptjs';

import { getUserByEmail, getUserById, getUserMaxIdInt } from '@/data/user';
import { db } from '@/lib/db';
import { TUserFormData, UserFormSchema } from '@/schemas/user-form-schema';

export const user = async (values: TUserFormData, id?: number) => {
  if (id) {
    const dbUser = await getUserById(id);

    if (!dbUser) {
      return { error: 'Пользователь не найден!' };
    }

    await db.user.update({
      where: { idInt: id },
      data: { ...values },
    });

    return { success: 'Данные пользователя обновлены!' };
  } else {
    const validatedFields = UserFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: 'Поля с ошибками' };
    }

    const hashedPassword = await bcrypt.hash('11111111', 10);
    const idInt = (await getUserMaxIdInt()) || 0 + 1;

    const valuesWithPassword = {
      ...validatedFields.data,
      password: hashedPassword,
      idInt,
    };

    const existingUser = await getUserByEmail(validatedFields.data.email);

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
