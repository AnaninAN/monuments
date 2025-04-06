'use server';

import { MaterialGroup } from '@prisma/client';

import { db } from '@/lib/db';
import { TGroupFormData } from '@/schemas/group-form-schema';

export const getMaterialGroupById = async (
  id?: number
): Promise<TGroupFormData | null> => {
  try {
    const materialGroup = await db.materialGroup.findUnique({
      where: { id },
    });

    const parentGroup = materialGroup?.parentId
      ? await db.materialGroup.findUnique({
          where: { id: materialGroup.parentId },
        })
      : null;

    return {
      name: materialGroup?.name || '',
      parentname: parentGroup?.name || '',
    };
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
