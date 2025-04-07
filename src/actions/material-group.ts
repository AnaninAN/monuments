'use server';

import { db } from '@/lib/db';
import { logger } from '@/lib/logger/logger';
import { GroupFormSchema, TGroupFormData } from '@/schemas/group-form-schema';
import {
  getMaterialGroupById,
  getMaterialGroupByName,
} from '@/data/material-group';

export const materialGroup = async (values: TGroupFormData, id?: number) => {
  if (id) {
    const validatedFields = GroupFormSchema.safeParse(values);

    if (!validatedFields.success) {
      logger.error('materialGroup', 'Неверные данные формы', {
        errors: validatedFields.error,
      });
      return { error: 'Поля с ошибками' };
    }

    const dbMaterialGroup = await getMaterialGroupById(id);

    if (!dbMaterialGroup) {
      logger.error('materialGroup', 'Категория материала не найдена', {
        id,
      });
      return { error: 'Категория материала не найдена!' };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { parentname, ...newValues } = values;

    await db.$transaction(async (tx) => {
      await tx.materialGroup.update({
        where: { id },
        data: { ...newValues },
      });
    });

    logger.info('materialGroup', 'Данные категории материала обновлены', {
      id,
    });
    return { success: 'Данные категории материала обновлены!' };
  } else {
    const validatedFields = GroupFormSchema.safeParse(values);

    if (!validatedFields.success) {
      logger.error('materialGroup', 'Неверные данные формы', {
        errors: validatedFields.error,
      });
      return { error: 'Поля с ошибками' };
    }

    const existingMaterialGroup = await getMaterialGroupByName(
      validatedFields.data.name
    );

    if (existingMaterialGroup) {
      logger.warn('materialGroup', 'Такое наименование уже используется!', {
        name: validatedFields.data.name,
      });
      return { error: 'Такое наименование уже используется!' };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { parentname, ...newValues } = validatedFields.data;
    await db.$transaction(async (tx) => {
      await tx.materialGroup.create({
        data: {
          ...newValues,
        },
      });
    });

    logger.info('materialGroup', 'Категория материала создана!', {
      name: validatedFields.data.name,
    });
    return { success: 'Категория материала создана!' };
  }
};

export const delMaterialGroup = async (id?: number) => {
  console.log('delMaterialGroup', id);
  const existingMaterialGroup = await getMaterialGroupById(id);

  if (!existingMaterialGroup) {
    logger.warn('materialGroup', 'Категория материала не существует!', {
      id,
    });
    return { error: 'Категория материала не существует!' };
  }

  await db.$transaction(async (tx) => {
    await tx.materialGroup.delete({ where: { id } });
  });

  logger.info('materialGroup', 'Категория материала удалена!', { id });
  return { success: 'Категория материала удалена!' };
};
