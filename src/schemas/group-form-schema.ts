import { z } from 'zod';

export const GroupFormSchema = z.object({
  parentname: z.string(),
  name: z
    .string()
    .min(1, 'Пустое значение не допустимо!')
    .max(20, 'Наименование не должно превышать 15 символов!')
    .trim(),
});

export type TGroupFormData = z.infer<typeof GroupFormSchema>;
