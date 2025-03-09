'use server';

import { db } from '@/lib/db';
import {
  TCounterpartyTypeFormData,
  CounterpartyTypeFormSchema,
} from '@/schemas/counterparty-type-form-schema';
import {
  getCounterpartyTypeById,
  getCounterpartyTypeByName,
} from '@/data/counterparty-type';

export const counterpartyType = async (
  values: TCounterpartyTypeFormData,
  id?: number
) => {
  if (id) {
    const validatedFields = CounterpartyTypeFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: 'Поля с ошибками' };
    }

    const dbCounterpartyType = await getCounterpartyTypeById(id);

    if (!dbCounterpartyType) {
      return { error: 'Склад не найден!' };
    }

    await db.counterpartyType.update({
      where: { id },
      data: { ...values },
    });

    return { success: 'Данные склада обновлены!' };
  } else {
    const validatedFields = CounterpartyTypeFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: 'Поля с ошибками' };
    }

    const existingCounterpartyType = await getCounterpartyTypeByName(
      validatedFields.data.name
    );

    if (existingCounterpartyType) {
      return { error: 'Такое наименование уже используется!' };
    }

    await db.counterpartyType.create({
      data: {
        ...validatedFields.data,
      },
    });

    return { success: 'Категория контрагента создана!' };
  }
};
