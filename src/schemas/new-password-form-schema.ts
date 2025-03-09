import { z } from 'zod';

export const NewPasswordFormSchema = z.object({
  password: z
    .string()
    .min(6, { message: 'Пароль должен содержать минимум 6 символов' }),
});

export type TNewPasswordFormData = z.infer<typeof NewPasswordFormSchema>;
