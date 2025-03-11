import { Role, Status } from '@prisma/client';
import { z } from 'zod';

export const UserFormSchema = z.object({
  email: z.string().email({ message: 'Не верно указан email!' }),
  role: z.enum([Role.ADMIN, Role.OWNER, Role.OPERATOR]),
  name: z.string().min(1, 'Пустое значение не допустимо!'),
  lastname: z.string().min(1, 'Пустое значение не допустимо!'),
  phoneNumber: z.string(),
  status: z.enum([Status.ACTIVE, Status.ARCHIVE]),
});

export type TUserFormData = z.infer<typeof UserFormSchema>;

export type KeyTUserFormData = keyof TUserFormData | 'idInt';
