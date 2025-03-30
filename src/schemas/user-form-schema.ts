import { Role, Status } from '@prisma/client';
import { z } from 'zod';

export const UserFormSchema = z.object({
  email: z.string().email({ message: 'Не верно указан email!' }),
  role: z.nativeEnum(Role),
  name: z
    .string()
    .min(1, 'Пустое значение не допустимо!')
    .max(20, 'Имя не должно превышать 20 символов!')
    .trim(),
  lastname: z
    .string()
    .min(1, 'Пустое значение не допустимо!')
    .max(20, 'Фамилия не должна превышать 20 символов!')
    .trim(),
  phoneNumber: z.string(),
  status: z.nativeEnum(Status),
});

export type TUserFormData = z.infer<typeof UserFormSchema>;

export type KeyTUserFormData = keyof TUserFormData | 'idInt';
