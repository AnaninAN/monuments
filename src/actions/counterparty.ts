'use server';

import { db } from '@/lib/db';

import {
  CounterpartyFormSchema,
  TCounterpartyFormData,
} from '@/schemas/counterparty-form-schema';
import {
  getCounterpartyById,
  getCounterpartyByName,
} from '@/data/counterparty';

export const counterparty = async (
  values: TCounterpartyFormData,
  id?: number
) => {
  if (id) {
    const validatedFields = CounterpartyFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: 'Поля с ошибками' };
    }

    const dbCounterparty = await getCounterpartyById(id);

    if (!dbCounterparty) {
      return { error: 'Контрагент не найден!' };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { counterpartyType, ...newValues } = values;

    await db.counterparty.update({
      where: { id },
      data: { ...newValues },
    });

    return { success: 'Данные контрагента обновлены!' };
  } else {
    const validatedFields = CounterpartyFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: 'Поля с ошибками' };
    }

    const existingCounterparty = await getCounterpartyByName(
      validatedFields.data.name
    );

    if (existingCounterparty) {
      return { error: 'Такое наименование уже используется!' };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { counterpartyType, ...newValues } = values;

    await db.counterparty.create({
      data: {
        ...newValues,
      },
    });

    return { success: 'Контрагент создан!' };
  }
};

export const delCounterparty = async (id: number) => {
  const existingCounterparty = await getCounterpartyById(id);

  if (!existingCounterparty) {
    return { error: 'Контрагент не существует!' };
  }

  await db.counterparty.delete({ where: { id } });

  return { success: 'Контрагент удален!' };
};
