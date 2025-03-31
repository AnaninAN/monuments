'use server';

import { signOut } from '@/auth';
import { logger } from '@/lib/logger/logger';

export const logout = async (email?: string | null) => {
  logger.info('user', 'Пользователь вышел из системы', { email });

  await signOut({ redirectTo: '/' });
};
