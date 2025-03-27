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
      return { error: 'Контрагент не найден!' };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { materialGroup, unit, warehouse, ...newValues } = values;

    await db.material.update({
      where: { id },
      data: { ...newValues },
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

    console.log(newValues);

    await db.material.create({
      data: {
        ...newValues,
      },
    });

    return { success: 'Материал создан!' };
  }
};
