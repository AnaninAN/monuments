import { Role, Status } from '@prisma/client';

export { Status, Role };

export const translateStatus: Record<Status, string> = {
  ACTIVE: 'Активный',
  ARCHIVE: 'Архивный',
};

export const translateRole: Record<Role, string> = {
  ADMIN: 'Администратор',
  OPERATOR: 'Оператор',
  OWNER: 'Владелец',
};
