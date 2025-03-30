import { z } from 'zod';
import { Status } from '@prisma/client';

export const CounterpartyTypeFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Пустое значение не допустимо!')
    .max(20, 'Наименование не должно превышать 20 символов!')
    .trim(),
  status: z.nativeEnum(Status),
  comment: z
    .string()
    .max(100, 'Комментарий не должен превышать 100 символов!')
    .trim(),
});

export type TCounterpartyTypeFormData = z.infer<
  typeof CounterpartyTypeFormSchema
>;

export type KeyTCounterpartyTypeFormData =
  | keyof TCounterpartyTypeFormData
  | 'id';
