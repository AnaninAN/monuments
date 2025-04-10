'use server';

import { TUnitFormData, UnitFormSchema } from '@/schemas/unit-form-schema';
import {
  addUnitData,
  delUnitData,
  getUnitByIdData,
  getUnitByNameData,
  updateUnitData,
} from '@/data/unit';
import { TDataTableActionResult } from '@/types/types';

export const unitAction = async (
  values: TUnitFormData,
  id?: number
): Promise<TDataTableActionResult> => {
  if (id) {
    const validatedFields = UnitFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: 'Поля с ошибками' };
    }

    const dbUnit = await getUnitByIdData(id);

    if (!dbUnit) {
      return { error: 'Еденица измерения не найдена!' };
    }

    const count = await updateUnitData(id, validatedFields.data);

    if (count === null) {
      return { error: 'Единицы измерения не обновлены!' };
    }

    return { success: 'Данные единицы измерения обновлены!', count };
  } else {
    const validatedFields = UnitFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: 'Поля с ошибками' };
    }

    const existingUnit = await getUnitByNameData(validatedFields.data.name);

    if (existingUnit) {
      return { error: 'Такое наименование уже используется!' };
    }

    const count = await addUnitData(validatedFields.data);

    if (count === null) {
      return { error: 'Единица измерения не создана!' };
    }

    return { success: 'Единица измерения создана!', count };
  }
};

export const delUnit = async (id: number) => {
  const existingUnit = await getUnitByIdData(id);

  if (!existingUnit) {
    return { error: 'Единицы измерения не существует!' };
  }

  const count = await delUnitData(id);

  if (count === null) {
    return { error: 'Единица измерения не удалена!' };
  }

  return { success: 'Единица измерения удалена!', count };
};
