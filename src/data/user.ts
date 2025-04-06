'use server';

import { ExtendedUser } from '@/next-auth';
import { User } from '@prisma/client';

import { db } from '@/lib/db';

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserByIdInt = async (
  idInt?: number
): Promise<ExtendedUser | null> => {
  try {
    const user = await db.user.findUnique({
      where: { idInt },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserMaxIdInt = async (): Promise<number | null> => {
  try {
    const maxIdInt = await db.user.aggregate({
      _max: {
        idInt: true,
      },
    });

    return maxIdInt._max.idInt;
  } catch {
    return null;
  }
};

export const getAllUsers = async (): Promise<ExtendedUser[] | []> => {
  try {
    const users = await db.user.findMany({
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

    return users as ExtendedUser[];
  } catch {
    return [];
  }
};
