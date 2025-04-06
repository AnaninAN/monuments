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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { warehouseGroup, ...newValues } = values;
    await db.$transaction(async (tx) => {
      await tx.warehouse.update({
        where: { id },
        data: { ...newValues },
      });
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { warehouseGroup, ...newValues } = validatedFields.data;
    await db.$transaction(async (tx) => {
      await tx.warehouse.create({
        data: {
          ...newValues,
        },
      });
    });

    return { success: 'Склад создан!' };
  }
};

export const delWarehouse = async (id: number) => {
  const existingWarehouse = await getWarehouseById(id);

  if (!existingWarehouse) {
    return { error: 'Склада не существует!' };
  }

  await db.warehouse.delete({ where: { id } });

  return { success: 'Склад удален!' };
};
