'use server';

import { User } from '@prisma/client';
import { ExtendedUser } from '@/next-auth';

import { db } from '@/lib/db';
import { TUserFormData } from '@/schemas/user-form-schema';

export const getUserByEmailData = async (
  email: string
): Promise<User | null> => {
  try {
    const user = await db.$transaction(async (tx) => {
      return tx.user.findUnique({ where: { email } });
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserByIdData = async (id: string): Promise<User | null> => {
  try {
    const user = await db.$transaction(async (tx) => {
      return tx.user.findUnique({
        where: { id },
      });
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserByIdIntData = async (
  idInt?: number
): Promise<ExtendedUser | null> => {
  try {
    const user = await db.$transaction(async (tx) => {
      return tx.user.findUnique({
        where: { idInt },
      });
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserMaxIdIntData = async (): Promise<number | null> => {
  try {
    const maxIdInt = await db.$transaction(async (tx) => {
      return tx.user.aggregate({
        _max: {
          idInt: true,
        },
      });
    });

    return maxIdInt._max.idInt;
  } catch {
    return null;
  }
};

export const getAllUsersData = async (): Promise<ExtendedUser[] | []> => {
  try {
    const users = await db.$transaction(async (tx) => {
      return tx.user.findMany({
        select: {
          id: true,
          idInt: true,
          name: true,
          lastname: true,
          email: true,
          phoneNumber: true,
          role: true,
          isTwoFactorEnabled: true,
          status: true,
          password: false,
        },
      });
    });

    return users as ExtendedUser[];
  } catch {
    return [];
  }
};

export const addUserData = async (
  data: ExtendedUser
): Promise<number | null> => {
  try {
    const result = await db.$transaction(async (tx) => {
      tx.user.create({
        data: { ...data },
      });
      return tx.user.count();
    });

    return result;
  } catch {
    return null;
  }
};

export const updateUserData = async (
  idInt: number,
  data: TUserFormData
): Promise<number | null> => {
  try {
    await db.$transaction(async (tx) => {
      tx.user.update({
        where: { idInt },
        data: { ...data },
      });
    });

    return 0;
  } catch {
    return null;
  }
};
