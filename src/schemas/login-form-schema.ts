import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Необходимо ввести email' }).trim(),
  password: z.string().min(1, { message: 'Необходимо ввести пароль' }).trim(),
  code: z.string().optional(),
});

export type TLoginFormData = z.infer<typeof LoginFormSchema>;
