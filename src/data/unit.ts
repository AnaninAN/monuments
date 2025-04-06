'use server';

import { Unit } from '@prisma/client';

import { db } from '@/lib/db';

export const getUnitById = async (id?: number): Promise<Unit | null> => {
  try {
    const unit = await db.unit.findUnique({
      where: { id },
    });

    return unit;
  } catch {
    return null;
  }
};

export const getUnitByName = async (name: string): Promise<Unit | null> => {
  try {
    const unit = await db.unit.findUnique({
      where: { name },
    });

    return unit;
  } catch {
    return null;
  }
};

export const getAllUnits = async (): Promise<Unit[] | []> => {
  try {
    const units = await db.unit.findMany();

    return units;
  } catch {
    return [];
  }
};
