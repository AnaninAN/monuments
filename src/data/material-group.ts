'use server';

import { MaterialGroup } from '@prisma/client';

import { db } from '@/lib/db';
import { TGroupFormData } from '@/schemas/group-form-schema';
import { EntityGroup } from './dto/entity-group';

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
      parentId: materialGroup?.parentId || 0,
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

export const getAllMaterialGroups = async (): Promise<EntityGroup[] | []> => {
  try {
    const materialGroups = await db.materialGroup.findMany({
      include: {
        _count: {
          select: {
            material: true,
          },
        },
      },
    });

    const countAll = materialGroups.reduce(
      (acc, group) => acc + group._count.material,
      0
    );

    return materialGroups.map((group) => ({
      ...group,
      count: group._count.material,
      countAll,
    }));
  } catch {
    return [];
  }
};
