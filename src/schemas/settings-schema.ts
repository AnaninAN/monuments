import { Role } from '@prisma/client';
import { z } from 'zod';

export const SettingsSchema = z
  .object({
    name: z.string().optional(),
    isTwoFactorEnabled: z.boolean().optional(),
    role: z.enum([Role.ADMIN, Role.OWNER, Role.OPERATOR]),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    newPassword: z.string().min(6).optional(),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false;

      return true;
    },
    { message: 'New password is required!', path: ['newPassword'] }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) return false;

      return true;
    },
    { message: 'Password is required!', path: ['password'] }
  )
  .refine(
    (data) => {
      if (data.newPassword !== data.password) return false;

      return true;
    },
    { message: "Passwords don't match!", path: ['password'] }
  )
  .refine(
    (data) => {
      if (data.newPassword !== data.password) return false;

      return true;
    },
    { message: "Passwords don't match!", path: ['newPassword'] }
  );

export type TSettingsData = z.infer<typeof SettingsSchema>;
