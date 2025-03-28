import { z } from 'zod';
import { Status } from '@prisma/client';

export const CounterpartyFormSchema = z.object({
  name: z.string().min(1, 'Пустое значение не допустимо!'),
  counterpartyTypeId: z.number(),
  counterpartyType: z.object({
    name: z.string().min(1, 'Необходимо выбрать тип контрагента!'),
  }),
  status: z.enum([Status.ACTIVE, Status.ARCHIVE]),
  comment: z.string(),
});

export type TCounterpartyFormData = z.infer<typeof CounterpartyFormSchema>;

export type KeyTCounterpartyFormData =
  | keyof Omit<TCounterpartyFormData, 'counterpartyTypeId' | 'counterpartyType'>
  | 'counterpartyType_name'
  | 'id';
