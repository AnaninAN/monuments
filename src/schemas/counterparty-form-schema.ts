import { z } from 'zod';
import { Status } from '@prisma/client';

export const CounterpartyFormSchema = z.object({
  name: z.string().min(1, 'Пустое значение не допустимо!'),
  counterpartyTypeId: z.number().optional(),
  counterpartyType: z.object({
    name: z.string(),
  }),
  status: z.enum([Status.ACTIVE, Status.ARCHIVE]),
  // legalAddress: z.string(),
  // phone: z.string(),
  // email: z.string().email(),
  // INN: z.string(),
  // KPP: z.string(),
  // OGRN: z.string(),
  comment: z.string(),
});

export type TCounterpartyFormData = z.infer<typeof CounterpartyFormSchema>;

export type KeyTCounterpartyFormData =
  | keyof Omit<TCounterpartyFormData, 'counterpartyTypeId' | 'counterpartyType'>
  | 'counterpartyType_name'
  | 'id';
