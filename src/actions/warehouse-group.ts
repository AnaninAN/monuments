'use server';

import { db } from '@/lib/db';
import { logger } from '@/lib/logger/logger';
import { GroupFormSchema, TGroupFormData } from '@/schemas/group-form-schema';
import {
  getWarehouseGroupById,
  getWarehouseGroupByName,
} from '@/data/warehouse-group';

export const warehouseGroup = async (values: TGroupFormData, id?: number) => {
  if (id) {
    const validatedFields = GroupFormSchema.safeParse(values);

    if (!validatedFields.success) {
      logger.error('warehouseGroup', 'Неверные данные формы', {
        errors: validatedFields.error,
      });
      return { error: 'Поля с ошибками' };
    }

    const dbWarehouseGroup = await getWarehouseGroupById(id);

    if (!dbWarehouseGroup) {
      logger.error('warehouseGroup', 'Категория склада не найдена', {
        id,
      });
      return { error: 'Категория склада не найдена!' };
    }

    await db.$transaction(async (tx) => {
      await tx.warehouseGroup.update({
        where: { id },
        data: { ...values },
      });
    });

    logger.info('warehouseGroup', 'Данные категории склада обновлены', {
      id,
    });
    return { success: 'Данные категории склада обновлены!' };
  } else {
    const validatedFields = GroupFormSchema.safeParse(values);

    if (!validatedFields.success) {
      logger.error('warehouseGroup', 'Неверные данные формы', {
        errors: validatedFields.error,
      });
      return { error: 'Поля с ошибками' };
    }

    const existingWarehouseGroup = await getWarehouseGroupByName(
      validatedFields.data.name
    );

    if (existingWarehouseGroup) {
      logger.warn('warehouseGroup', 'Такое наименование уже используется!', {
        name: validatedFields.data.name,
      });
      return { error: 'Такое наименование уже используется!' };
    }

    await db.$transaction(async (tx) => {
      await tx.warehouseGroup.create({
        data: {
          ...validatedFields.data,
        },
      });
    });

    logger.info('warehouseGroup', 'Категория склада создана!', {
      name: validatedFields.data.name,
    });
    return { success: 'Категория склада создана!' };
  }
};

export const delWarehouseGroup = async (id: number) => {
  const existingWarehouseGroup = await getWarehouseGroupById(id);

  if (!existingWarehouseGroup) {
    logger.warn('warehouseGroup', 'Категория склада не существует!', {
      id,
    });
    return { error: 'Категория склада не существует!' };
  }

  await db.$transaction(async (tx) => {
    await tx.warehouseGroup.delete({ where: { id } });
  });

  logger.info('warehouseGroup', 'Категория склада удалена!', { id });
  return { success: 'Категория склада удалена!' };
};
