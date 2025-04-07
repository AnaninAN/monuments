'use server';

import { WarehouseGroup } from '@prisma/client';

import { db } from '@/lib/db';
import { TGroupFormData } from '@/schemas/group-form-schema';
import { EntityGroup } from './dto/entity-group';

export const getWarehouseGroupById = async (
  id?: number | undefined
): Promise<TGroupFormData | null> => {
  try {
    const warehouseGroup = await db.warehouseGroup.findUnique({
      where: { id },
    });

    const parentGroup = warehouseGroup?.parentId
      ? await db.warehouseGroup.findUnique({
          where: { id: warehouseGroup.parentId },
        })
      : null;

    return {
      name: warehouseGroup?.name || '',
      parentname: parentGroup?.name || '',
      parentId: warehouseGroup?.parentId || 0,
    };
  } catch {
    return null;
  }
};

export const getWarehouseGroupByName = async (
  name: string
): Promise<WarehouseGroup | null> => {
  try {
    const warehouseGroup = await db.warehouseGroup.findUnique({
      where: { name },
    });

    return warehouseGroup;
  } catch {
    return null;
  }
};

export const getAllWarehouseGroups = async (): Promise<EntityGroup[] | []> => {
  try {
    const warehouseGroups = await db.warehouseGroup.findMany({
      include: {
        _count: {
          select: {
            warehouse: true,
          },
        },
      },
    });

    const countAll = warehouseGroups.reduce(
      (acc, group) => acc + group._count.warehouse,
      0
    );

    return warehouseGroups.map((group) => ({
      ...group,
      count: group._count.warehouse,
      countAll,
    }));
  } catch {
    return [];
  }
};
