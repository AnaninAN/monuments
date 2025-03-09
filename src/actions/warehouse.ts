'use server';

import { db } from '@/lib/db';
import { getWarehouseByName, getWarehouseById } from '@/data/warehouse';
import {
  TWarehouseFormData,
  WarehouseFormSchema,
} from '@/schemas/warehouse-form-schema';

export const warehouse = async (values: TWarehouseFormData, id?: number) => {
  if (id) {
    const validatedFields = WarehouseFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: 'Поля с ошибками' };
    }

    const dbWarehouse = await getWarehouseById(id);

    if (!dbWarehouse) {
      return { error: 'Склад не найден!' };
    }

    await db.warehouse.update({
      where: { id },
      data: { ...values },
    });

    return { success: 'Данные склада обновлены!' };
  } else {
    const validatedFields = WarehouseFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: 'Поля с ошибками' };
    }

    const existingWarehouse = await getWarehouseByName(
      validatedFields.data.name
    );

    if (existingWarehouse) {
      return { error: 'Такое наименование уже используется!' };
    }

    await db.warehouse.create({
      data: {
        ...validatedFields.data,
      },
    });

    return { success: 'Склад создан!' };
  }
};
