'use server';

import { MaterialGroup } from '@prisma/client';

import { db } from '@/lib/db';

export const getMaterialGroupById = async (
  id?: number
): Promise<MaterialGroup | null> => {
  try {
    const materialGroup = await db.materialGroup.findUnique({
      where: { id },
    });

    return materialGroup;
  } catch {
    return null;
  }
};

export const getMaterialGroupByName = async (
  name: string
): Promise<MaterialGroup | null> => {
  try {
    const materialGroup = await db.materialGroup.findUnique({
      where: { name },
    });

    return materialGroup;
  } catch {
    return null;
  }
};

export const getAllMaterialGroups = async (): Promise<MaterialGroup[] | []> => {
  try {
    const materialGroups = await db.materialGroup.findMany();

    return materialGroups;
  } catch {
    return [];
  }
};
