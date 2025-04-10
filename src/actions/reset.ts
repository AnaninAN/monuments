'use server';

import { getUserByEmailData } from '@/data/user';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';
import { ResetFormSchema, TResetFormData } from '@/schemas/reset-form-schema';

export const reset = async (values: TResetFormData) => {
  const validatedFields = ResetFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Не корректный email!' };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmailData(email);

  if (!existingUser) return { error: 'email не найден!' };

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: 'Для сброса пароля направлено письмо на почту!' };
};
