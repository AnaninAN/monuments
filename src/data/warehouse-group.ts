'use server';

import { WarehouseGroup } from '@prisma/client';

import { db } from '@/lib/db';
import { TGroupFormData } from '@/schemas/group-form-schema';

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

export const getAllWarehouseGroups = async (): Promise<
  WarehouseGroup[] | []
> => {
  try {
    const warehouseGroups = await db.warehouseGroup.findMany();

    return warehouseGroups;
  } catch {
    return [];
  }
};
