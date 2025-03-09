import { z } from 'zod';
import { Status } from '@prisma/client';

export const WarehouseFormSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  status: z.enum([Status.ACTIVE, Status.ARCHIVE]),
  comment: z.string(),
});

export type TWarehouseFormData = z.infer<typeof WarehouseFormSchema>;
