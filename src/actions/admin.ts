'use server';

import { Role } from '@prisma/client';

import { currentRole } from '@/lib/auth';

export const admin = async () => {
  const role = await currentRole();

  if (role !== Role.ADMIN) {
    return { error: 'Запрещенный!' };
  }

  return { success: 'Успех' };
};
