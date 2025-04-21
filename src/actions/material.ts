'use server';

import {
  MaterialFormSchema,
  TMaterialFormData,
} from '@/schemas/material-form-schema';
import {
  getMaterialByIdData,
  getMaterialByNameData,
  updateMaterialData,
  addMaterialData,
  delMaterialData,
} from '@/data/material';
import { TDataTableActionResult } from '@/types/types';

export const materialAction = async (
  values: TMaterialFormData,
  id?: number
): TDataTableActionResult => {
  if (id) {
    const validatedFields = MaterialFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: 'Поля с ошибками' };
    }

    const dbMaterial = await getMaterialByIdData(id);

    if (!dbMaterial) {
      return { error: 'Материал не найден!' };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { materialGroup, unit, warehouse, ...newValues } =
      validatedFields.data;
    const count = await updateMaterialData(id, newValues);

    if (count === null) {
      return { error: 'Материал не обновлен!' };
    }

    return {
      success: 'Данные материала обновлены!',
      count,
    };
  } else {
    const validatedFields = MaterialFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: 'Поля с ошибками' };
    }

    const existingMaterial = await getMaterialByNameData(
      validatedFields.data.name
    );

    if (existingMaterial) {
      return { error: 'Такое наименование уже используется!' };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { materialGroup, unit, warehouse, ...newValues } =
      validatedFields.data;
    const count = await addMaterialData(newValues);

    if (count === null) {
      return { error: 'Материал не создан!' };
    }

    return { success: 'Материал создан!', count };
  }
};

export const delMaterialAction = async (id: number): TDataTableActionResult => {
  const existingMaterial = await getMaterialByIdData(id);

  if (!existingMaterial) {
    return { error: 'Материала не существует!' };
  }

  const count = await delMaterialData(id);

  if (count === null) {
    return { error: 'Материал не удален!' };
  }

  return { success: 'Материал удален!', count };
};
