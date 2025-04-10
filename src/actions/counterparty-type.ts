'use server';

import {
  TCounterpartyTypeFormData,
  CounterpartyTypeFormSchema,
} from '@/schemas/counterparty-type-form-schema';
import {
  addCounterpartyTypeData,
  delCounterpartyTypeData,
  getCounterpartyTypeByIdData,
  getCounterpartyTypeByNameData,
  updateCounterpartyTypeData,
} from '@/data/counterparty-type';
import { logger } from '@/lib/logger/logger';

export const counterpartyTypeAction = async (
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

    const dbCounterpartyType = await getCounterpartyTypeByIdData(id);

    if (!dbCounterpartyType) {
      logger.error('counterpartyType', 'Категория контрагента не найдена', {
        id,
      });
      return { error: 'Категория контрагента не найдена!' };
    }

    const count = await updateCounterpartyTypeData(id, values);

    if (count === null) {
      logger.error('counterpartyType', 'Категория контрагента не обновлена', {
        id,
      });
      return { error: 'Категория контрагента не обновлена!' };
    }

    logger.info('counterpartyType', 'Данные категории контрагента обновлены', {
      id,
    });
    return { success: 'Данные категории контрагента обновлены!', count };
  } else {
    const validatedFields = CounterpartyTypeFormSchema.safeParse(values);

    if (!validatedFields.success) {
      logger.error('counterpartyType', 'Неверные данные формы', {
        errors: validatedFields.error,
      });
      return { error: 'Поля с ошибками' };
    }

    const existingCounterpartyType = await getCounterpartyTypeByNameData(
      validatedFields.data.name
    );

    if (existingCounterpartyType) {
      logger.warn('counterpartyType', 'Такое наименование уже используется!', {
        name: validatedFields.data.name,
      });
      return { error: 'Такое наименование уже используется!' };
    }

    const count = await addCounterpartyTypeData(validatedFields.data);

    if (count === null) {
      logger.error('counterpartyType', 'Категория контрагента не создана', {
        name: validatedFields.data.name,
      });
      return { error: 'Категория контрагента не создана!' };
    }

    logger.info('counterpartyType', 'Категория контрагента создана!', {
      name: validatedFields.data.name,
    });
    return { success: 'Категория контрагента создана!', count };
  }
};

export const delCounterpartyTypeAction = async (id: number) => {
  const existingCounterpartyType = await getCounterpartyTypeByIdData(id);

  if (!existingCounterpartyType) {
    logger.warn('counterpartyType', 'Категория контрагента не существует!', {
      id,
    });
    return { error: 'Категория контрагента не существует!' };
  }

  const count = await delCounterpartyTypeData(id);

  if (count === null) {
    logger.error('counterpartyType', 'Категория контрагента не удалена!', {
      id,
    });
    return { error: 'Категория контрагента не удалена!' };
  }

  logger.info('counterpartyType', 'Категория контрагента удалена!', { id });
  return { success: 'Категория контрагента удалена!', count };
};
