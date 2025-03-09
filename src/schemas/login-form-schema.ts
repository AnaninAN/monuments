import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Необходимо ввести email' }),
  password: z.string().min(1, { message: 'Необходимо ввести пароль' }),
  code: z.string().optional(),
});

export type TLoginFormData = z.infer<typeof LoginFormSchema>;
