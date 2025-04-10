'use server';

import {
  CounterpartyFormSchema,
  TCounterpartyFormData,
} from '@/schemas/counterparty-form-schema';
import {
  addCounterpartyData,
  delCounterpartyData,
  getCounterpartyByIdData,
  getCounterpartyByName,
  updateCounterpartyData,
} from '@/data/counterparty';
import { logger } from '@/lib/logger/logger';

export const counterpartyAction = async (
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

    const dbCounterparty = await getCounterpartyByIdData(id);

    if (!dbCounterparty) {
      logger.warn('counterparty', 'Контрагент не найден!', { id });
      return { error: 'Контрагент не найден!' };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { counterpartyType, ...newValues } = values;
    const count = await updateCounterpartyData(id, newValues);

    if (count === null) {
      logger.error('counterparty', 'Контрагент не обновлен!', { id });
      return { error: 'Контрагент не обновлен!' };
    }

    logger.info('counterparty', 'Данные контрагента обновлены!', { id });
    return { success: 'Данные контрагента обновлены!', count };
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
    const count = await addCounterpartyData(newValues);

    if (count === null) {
      logger.error('counterparty', 'Контрагент не создан!', {
        name: validatedFields.data.name,
      });
      return { error: 'Контрагент не создан!' };
    }

    logger.info('counterparty', 'Контрагент создан!', {
      name: validatedFields.data.name,
    });
    return { success: 'Контрагент создан!', count };
  }
};

export const delCounterpartyAction = async (id: number) => {
  const existingCounterparty = await getCounterpartyByIdData(id);

  if (!existingCounterparty) {
    logger.warn('counterparty', 'Контрагент не существует!', { id });
    return { error: 'Контрагент не существует!' };
  }

  const count = await delCounterpartyData(id);

  if (count === null) {
    logger.error('counterparty', 'Контрагент не удален!', { id });
    return { error: 'Контрагент не удален!' };
  }

  logger.info('counterparty', 'Контрагент удален!', { id });
  return { success: 'Контрагент удален!', count };
};
