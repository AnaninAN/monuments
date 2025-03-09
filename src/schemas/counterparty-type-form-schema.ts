import { z } from 'zod';
import { Status } from '@prisma/client';

export const CounterpartyTypeFormSchema = z.object({
  name: z.string(),
  status: z.enum([Status.ACTIVE, Status.ARCHIVE]),
  comment: z.string(),
});

export type TCounterpartyTypeFormData = z.infer<
  typeof CounterpartyTypeFormSchema
>;
