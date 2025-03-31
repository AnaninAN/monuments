'use server';

import { db } from '@/lib/db';

import {
  MaterialFormSchema,
  TMaterialFormData,
} from '@/schemas/material-form-schema';

import { getMaterialById, getMaterialByName } from '@/data/material';

export const material = async (values: TMaterialFormData, id?: number) => {
  if (id) {
    const validatedFields = MaterialFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: 'Поля с ошибками' };
    }

    const dbMaterial = await getMaterialById(id);

    if (!dbMaterial) {
      return { error: 'Материал не найден!' };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { materialGroup, unit, warehouse, ...newValues } = values;
    await db.$transaction(async (tx) => {
      await tx.material.update({
        where: { id },
        data: { ...newValues },
      });
    });

    return { success: 'Данные материала обновлены!' };
  } else {
    const validatedFields = MaterialFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: 'Поля с ошибками' };
    }

    const existingMaterial = await getMaterialByName(validatedFields.data.name);

    if (existingMaterial) {
      return { error: 'Такое наименование уже используется!' };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { materialGroup, unit, warehouse, ...newValues } = values;
    await db.$transaction(async (tx) => {
      await tx.material.create({
        data: { ...newValues },
      });
    });

    return { success: 'Материал создан!' };
  }
};

export const delMaterial = async (id: number) => {
  const existingMaterial = await getMaterialById(id);

  if (!existingMaterial) {
    return { error: 'Материала не существует!' };
  }

  await db.$transaction(async (tx) => {
    await tx.material.delete({ where: { id } });
  });

  return { success: 'Материал удален!' };
};
