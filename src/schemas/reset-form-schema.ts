import { z } from 'zod';

export const ResetFormSchema = z.object({
  email: z.string().email({ message: 'Необходимо ввести email' }),
});

export type TResetFormData = z.infer<typeof ResetFormSchema>;
