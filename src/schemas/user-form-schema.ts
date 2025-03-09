import { Role, Status } from '@prisma/client';
import { z } from 'zod';

export const UserFormSchema = z.object({
  email: z.string().email(),
  role: z.enum([Role.ADMIN, Role.OWNER, Role.OPERATOR]),
  name: z.string(),
  lastname: z.string(),
  phoneNumber: z.string(),
  status: z.enum([Status.ACTIVE, Status.ARCHIVE]),
});

export type TUserFormData = z.infer<typeof UserFormSchema>;
