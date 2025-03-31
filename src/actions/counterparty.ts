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
import { logger } from '@/lib/logger/logger';

export const counterparty = async (
  values: TCounterpartyFormData,
  id?: number
) => {
  if (id) {
    const validatedFields = CounterpartyFormSchema.safeParse(values);

    if (!validatedFields.success) {
      logger.error('counterparty', 'Поля с ошибками', {
        errors: validatedFields.error,
      });
      return { error: 'Поля с ошибками' };
    }

    const dbCounterparty = await getCounterpartyById(id);

    if (!dbCounterparty) {
      logger.warn('counterparty', 'Контрагент не найден!', { id });
      return { error: 'Контрагент не найден!' };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { counterpartyType, ...newValues } = values;
    await db.$transaction(async (tx) => {
      await tx.counterparty.update({
        where: { id },
        data: { ...newValues },
      });
    });

    logger.info('counterparty', 'Данные контрагента обновлены!', { id });
    return { success: 'Данные контрагента обновлены!' };
  } else {
    const validatedFields = CounterpartyFormSchema.safeParse(values);

    if (!validatedFields.success) {
      logger.error('counterparty', 'Поля с ошибками', {
        errors: validatedFields.error,
      });
      return { error: 'Поля с ошибками' };
    }

    const existingCounterparty = await getCounterpartyByName(
      validatedFields.data.name
    );

    if (existingCounterparty) {
      logger.warn('counterparty', 'Такое наименование уже используется!', {
        name: validatedFields.data.name,
      });
      return { error: 'Такое наименование уже используется!' };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { counterpartyType, ...newValues } = values;
    await db.$transaction(async (tx) => {
      await tx.counterparty.create({
        data: {
          ...newValues,
        },
      });
    });

    logger.info('counterparty', 'Контрагент создан!', {
      name: validatedFields.data.name,
    });
    return { success: 'Контрагент создан!' };
  }
};

export const delCounterparty = async (id: number) => {
  const existingCounterparty = await getCounterpartyById(id);

  if (!existingCounterparty) {
    logger.warn('counterparty', 'Контрагент не существует!', { id });
    return { error: 'Контрагент не существует!' };
  }

  await db.$transaction(async (tx) => {
    await tx.counterparty.delete({ where: { id } });
  });

  logger.info('counterparty', 'Контрагент удален!', { id });
  return { success: 'Контрагент удален!' };
};
