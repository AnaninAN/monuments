import { z } from 'zod';
import { Status } from '@prisma/client';

export const WarehouseFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Пустое значение не допустимо!')
    .max(20, 'Наименование склада не должно превышать 20 символов!')
    .trim(),
  shortName: z
    .string()
    .max(10, 'Короткое наименование склада не должно превышать 10 символов!')
    .trim(),
  status: z.nativeEnum(Status),
  comment: z
    .string()
    .max(100, 'Комментарий не должен превышать 100 символов!')
    .trim(),
  warehouseGroupId: z.number(),
  warehouseGroup: z.object({
    name: z.string().min(1, 'Необходимо выбрать группу!'),
  }),
});

export type TWarehouseFormData = z.infer<typeof WarehouseFormSchema>;

export type TWarehouse = Omit<TWarehouseFormData, 'warehouseGroup'>;

export type KeyTWarehouseFormData =
  | keyof Omit<TWarehouseFormData, 'warehouseGroupId' | 'warehouseGroup'>
  | 'warehouseGroup_name'
  | 'id';
