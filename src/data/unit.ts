'use server';

import { Unit } from '@prisma/client';

import { db } from '@/lib/db';
import { TUnit } from '@/schemas/unit-form-schema';

export const getUnitByIdData = async (id?: number): Promise<Unit | null> => {
  try {
    const unit = await db.$transaction(async (tx) => {
      return tx.unit.findUnique({
        where: { id },
      });
    });

    return unit;
  } catch {
    return null;
  }
};

export const getUnitByNameData = async (name: string): Promise<Unit | null> => {
  try {
    const unit = await db.$transaction(async (tx) => {
      return tx.unit.findUnique({
        where: { name },
      });
    });

    return unit;
  } catch {
    return null;
  }
};

export const getAllUnitsData = async (): Promise<Unit[] | []> => {
  try {
    const units = await db.$transaction(async (tx) => {
      return tx.unit.findMany();
    });

    return units;
  } catch {
    return [];
  }
};

export const delUnitData = async (id: number): Promise<number | null> => {
  try {
    const result = await db.$transaction(async (tx) => {
      await tx.unit.delete({
        where: { id },
      });
      return tx.unit.count();
    });

    return result;
  } catch {
    return null;
  }
};

export const addUnitData = async (data: TUnit): Promise<number | null> => {
  try {
    const result = await db.$transaction(async (tx) => {
      await tx.unit.create({
        data,
      });
      return tx.unit.count();
    });

    return result;
  } catch {
    return null;
  }
};

export const updateUnitData = async (
  id: number,
  data: TUnit
): Promise<number | null> => {
  try {
    await db.$transaction(async (tx) => {
      await tx.unit.update({
        where: { id },
        data,
      });
    });

    return 0;
  } catch {
    return null;
  }
};
