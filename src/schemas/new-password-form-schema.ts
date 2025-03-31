import { z } from 'zod';

export const NewPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Пароль должен содержать минимум 8 символов' })
      .regex(/[A-Z]/, {
        message: 'Пароль должен содержать хотя бы одну заглавную букву',
      })
      .regex(/[a-z]/, {
        message: 'Пароль должен содержать хотя бы одну строчную букву',
      })
      .regex(/[0-9]/, { message: 'Пароль должен содержать хотя бы одну цифру' })
      .regex(/[^A-Za-z0-9]/, {
        message: 'Пароль должен содержать хотя бы один специальный символ',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type TNewPasswordFormData = z.infer<typeof NewPasswordFormSchema>;
