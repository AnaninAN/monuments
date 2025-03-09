import { db } from '@/lib/db';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: number) => {
  try {
    const user = await db.user.findUnique({
      where: { idInt: id },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserMaxIdInt = async () => {
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

export const getAllUsers = async () => {
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

    return users;
  } catch {
    return null;
  }
};
