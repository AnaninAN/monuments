import { Status } from '@prisma/client';

export { Status };

export const translateStatus: Record<Status, string> = {
  ACTIVE: 'Активный',
  ARCHIVE: 'Архивный',
};
