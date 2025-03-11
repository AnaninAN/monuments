import { z } from 'zod';
import { Status } from '@prisma/client';

export const WarehouseFormSchema = z.object({
  name: z.string().min(1, 'Пустое значение не допустимо!'),
  shortName: z.string(),
  status: z.enum([Status.ACTIVE, Status.ARCHIVE]),
  comment: z.string(),
});

export type TWarehouseFormData = z.infer<typeof WarehouseFormSchema>;

export type KeyTWarehouseFormData = keyof TWarehouseFormData | 'id';
