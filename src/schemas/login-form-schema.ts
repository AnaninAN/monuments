import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Необходимо ввести email' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Пароль должен содержать минимум 8 символов' })
    .regex(/[A-ZА-Я]/, {
      message: 'Пароль должен содержать хотя бы одну заглавную букву',
    })
    .regex(/[a-zа-я]/, {
      message: 'Пароль должен содержать хотя бы одну строчную букву',
    })
    .regex(/[0-9]/, { message: 'Пароль должен содержать хотя бы одну цифру' })
    .regex(/[^A-Za-z0-9а-яА-Я]/, {
      message: 'Пароль должен содержать хотя бы один специальный символ',
    }),
  code: z.string().optional(),
});

export type TLoginFormData = z.infer<typeof LoginFormSchema>;
