'use server';

import { db } from '@/lib/db';

import { TUnitFormData, UnitFormSchema } from '@/schemas/unit-form-schema';
import { getUnitById, getUnitByName } from '@/data/unit';

export const unit = async (values: TUnitFormData, id?: number) => {
  if (id) {
    const validatedFields = UnitFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: 'Поля с ошибками' };
    }

    const dbUnit = await getUnitById(id);

    if (!dbUnit) {
      return { error: 'Еденица измерения не найдена!' };
    }

    await db.unit.update({
      where: { id },
      data: { ...values },
    });

    return { success: 'Данные единицы измерения обновлены!' };
  } else {
    const validatedFields = UnitFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: 'Поля с ошибками' };
    }

    const existingUnit = await getUnitByName(validatedFields.data.name);

    if (existingUnit) {
      return { error: 'Такое наименование уже используется!' };
    }

    await db.unit.create({
      data: {
        ...validatedFields.data,
      },
    });

    return { success: 'Единица измерения создана!' };
  }
};

export const delUnit = async (id: number) => {
  const existingUnit = await getUnitById(id);

  if (!existingUnit) {
    return { error: 'Единицы измерения не существует!' };
  }

  await db.unit.delete({ where: { id } });

  return { success: 'Единица измерения удалена!' };
};
