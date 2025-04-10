import { z } from 'zod';
import { Status } from '@prisma/client';

export const CounterpartyFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Пустое значение не допустимо!')
    .max(50, 'Наименование не должно превышать 50 символов!')
    .trim(),
  counterpartyTypeId: z.number(),
  counterpartyType: z.object({
    name: z.string().min(1, 'Необходимо выбрать тип контрагента!'),
  }),
  status: z.nativeEnum(Status),
  comment: z
    .string()
    .max(100, 'Комментарий не должен превышать 100 символов!')
    .trim(),
  legalAddress: z
    .string()
    .max(100, 'Юридический адрес не должен превышать 100 символов!')
    .trim(),
  phone: z.string(),
  email: z.string(),
  INN: z.string(),
  KPP: z.string(),
  OGRN: z.string(),
});

export type TCounterpartyFormData = z.infer<typeof CounterpartyFormSchema>;

export type TCounterparty = Omit<TCounterpartyFormData, 'counterpartyType'>;

export type KeyTCounterpartyFormData =
  | keyof Omit<TCounterpartyFormData, 'counterpartyTypeId' | 'counterpartyType'>
  | 'counterpartyType_name'
  | 'id';
