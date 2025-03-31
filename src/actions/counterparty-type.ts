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
import { logger } from '@/lib/logger/logger';

export const counterpartyType = async (
  values: TCounterpartyTypeFormData,
  id?: number
) => {
  if (id) {
    const validatedFields = CounterpartyTypeFormSchema.safeParse(values);

    if (!validatedFields.success) {
      logger.error('counterpartyType', 'Неверные данные формы', {
        errors: validatedFields.error,
      });
      return { error: 'Поля с ошибками' };
    }

    const dbCounterpartyType = await getCounterpartyTypeById(id);

    if (!dbCounterpartyType) {
      logger.error('counterpartyType', 'Категория контрагента не найдена', {
        id,
      });
      return { error: 'Категория контрагента не найдена!' };
    }

    await db.$transaction(async (tx) => {
      await tx.counterpartyType.update({
        where: { id },
        data: { ...values },
      });
    });

    logger.info('counterpartyType', 'Данные категории контрагента обновлены', {
      id,
    });
    return { success: 'Данные категории контрагента обновлены!' };
  } else {
    const validatedFields = CounterpartyTypeFormSchema.safeParse(values);

    if (!validatedFields.success) {
      logger.error('counterpartyType', 'Неверные данные формы', {
        errors: validatedFields.error,
      });
      return { error: 'Поля с ошибками' };
    }

    const existingCounterpartyType = await getCounterpartyTypeByName(
      validatedFields.data.name
    );

    if (existingCounterpartyType) {
      logger.warn('counterpartyType', 'Такое наименование уже используется!', {
        name: validatedFields.data.name,
      });
      return { error: 'Такое наименование уже используется!' };
    }

    await db.$transaction(async (tx) => {
      await tx.counterpartyType.create({
        data: {
          ...validatedFields.data,
        },
      });
    });

    logger.info('counterpartyType', 'Категория контрагента создана!', {
      name: validatedFields.data.name,
    });
    return { success: 'Категория контрагента создана!' };
  }
};

export const delCounterpartyType = async (id: number) => {
  const existingCounterpartyType = await getCounterpartyTypeById(id);

  if (!existingCounterpartyType) {
    logger.warn('counterpartyType', 'Категория контрагента не существует!', {
      id,
    });
    return { error: 'Категория контрагента не существует!' };
  }

  await db.$transaction(async (tx) => {
    await tx.counterpartyType.delete({ where: { id } });
  });

  logger.info('counterpartyType', 'Категория контрагента удалена!', { id });
  return { success: 'Категория контрагента удалена!' };
};
