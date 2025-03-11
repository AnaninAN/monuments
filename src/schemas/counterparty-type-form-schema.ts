import { z } from 'zod';
import { Status } from '@prisma/client';

export const CounterpartyTypeFormSchema = z.object({
  name: z.string().min(1, 'Пустое значение не допустимо!'),
  status: z.enum([Status.ACTIVE, Status.ARCHIVE]),
  comment: z.string(),
});

export type TCounterpartyTypeFormData = z.infer<
  typeof CounterpartyTypeFormSchema
>;

export type KeyTCounterpartyTypeFormData =
  | keyof TCounterpartyTypeFormData
  | 'id';
