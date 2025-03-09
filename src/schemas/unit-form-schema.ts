import { z } from 'zod';
import { Status } from '@prisma/client';

export const UnitFormSchema = z.object({
  name: z.string(),
  status: z.enum([Status.ACTIVE, Status.ARCHIVE]),
});

export type TUnitFormData = z.infer<typeof UnitFormSchema>;
