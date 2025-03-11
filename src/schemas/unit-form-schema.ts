import { z } from 'zod';
import { Status } from '@prisma/client';

export const UnitFormSchema = z.object({
  name: z.string().min(1, 'Пустое значение не допустимо!'),
  status: z.enum([Status.ACTIVE, Status.ARCHIVE]),
});

export type TUnitFormData = z.infer<typeof UnitFormSchema>;

export type KeyTUnitFormData = keyof TUnitFormData | 'id';
