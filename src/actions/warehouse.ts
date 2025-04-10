'use server';

import {
  getWarehouseByNameData,
  getWarehouseByIdData,
  updateWarehouseData,
  addWarehouseData,
  delWarehouseData,
} from '@/data/warehouse';
import {
  TWarehouseFormData,
  WarehouseFormSchema,
} from '@/schemas/warehouse-form-schema';
import { TDataTableActionResult } from '@/types/types';

export const warehouseAction = async (
  values: TWarehouseFormData,
  id?: number
) => {
  if (id) {
    const validatedFields = WarehouseFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: 'Поля с ошибками' };
    }

    const dbWarehouse = await getWarehouseByIdData(id);

    if (!dbWarehouse) {
      return { error: 'Склад не найден!' };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { warehouseGroup, ...newValues } = values;
    const count = await updateWarehouseData(id, newValues);

    if (count === null) {
      return { error: 'Склад не обновлен!' };
    }

    return { success: 'Данные склада обновлены!', count };
  } else {
    const validatedFields = WarehouseFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: 'Поля с ошибками' };
    }

    const existingWarehouse = await getWarehouseByNameData(
      validatedFields.data.name
    );

    if (existingWarehouse) {
      return { error: 'Такое наименование уже используется!' };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { warehouseGroup, ...newValues } = validatedFields.data;
    const count = await addWarehouseData(newValues);

    if (count === null) {
      return { error: 'Склад не создан!' };
    }

    return { success: 'Склад создан!', count };
  }
};

export const delWarehouseAction = async (
  id: number
): TDataTableActionResult => {
  const existingWarehouse = await getWarehouseByIdData(id);

  if (!existingWarehouse) {
    return { error: 'Склада не существует!' };
  }

  const count = await delWarehouseData(id);

  if (count === null) {
    return { error: 'Склад не удален!' };
  }

  return { success: 'Склад удален!', count };
};
