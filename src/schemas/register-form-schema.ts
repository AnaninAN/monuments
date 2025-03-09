import { z } from 'zod';

export const RegisterFormSchema = z.object({
  email: z.string().email({ message: 'Необходимо ввести email' }),
  password: z
    .string()
    .min(6, { message: 'Пароль должен содержать минимум 6 символов' }),
  name: z.string().min(1, { message: 'Необходимо ввести имя' }),
  lastname: z.string().min(1, { message: 'Необходимо ввести Фамилию' }),
  jobTitle: z.string().optional(),
});

export type TRegisterFormData = z.infer<typeof RegisterFormSchema>;
