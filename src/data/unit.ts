import { db } from '@/lib/db';

export const getUnitById = async (id: number) => {
  try {
    const unit = await db.unit.findUnique({
      where: { id },
    });

    return unit;
  } catch {
    return null;
  }
};

export const getUnitByName = async (name: string) => {
  try {
    const unit = await db.unit.findUnique({
      where: { name },
    });

    return unit;
  } catch {
    return null;
  }
};

export const getAllUnits = async () => {
  try {
    const units = await db.unit.findMany();

    return units;
  } catch {
    return null;
  }
};
