'use server';

import { db } from '@/lib/db';
import { TGroup } from '@/schemas/group-form-schema';
import {
  Entity,
  EntityGroup,
  EntityGroupWithAdd,
  EntityGroupWithParentname,
} from '@/types/types';

export const getEntityGroupByIdData = async (
  entity: Entity,
  id?: number | undefined
): Promise<EntityGroupWithParentname | null> => {
  const req = {
    where: { id },
  };

  try {
    const group = await db.$transaction(async (tx) => {
      switch (entity) {
        case 'warehouseGroup':
          return await tx.warehouseGroup.findUnique(req);
        case 'materialGroup':
          return await tx.materialGroup.findUnique(req);
        default:
          return null;
      }
    });

    const parentGroup = group?.parentId
      ? await db.warehouseGroup.findUnique({
          where: { id: group.parentId },
        })
      : null;

    return {
      name: group?.name || '',
      parentname: parentGroup?.name || '',
      parentId: group?.parentId || 0,
    };
  } catch {
    return null;
  }
};

export const getEntityGroupByNameData = async (
  entity: Entity,
  name: string
): Promise<EntityGroup | null> => {
  const req = {
    where: { name },
  };
  try {
    const group = await db.$transaction(async (tx) => {
      switch (entity) {
        case 'warehouseGroup':
          return await tx.warehouseGroup.findUnique(req);
        case 'materialGroup':
          return await tx.materialGroup.findUnique(req);
        default:
          return null;
      }
    });

    return group;
  } catch {
    return null;
  }
};

export const getAllEntityGroupsData = async (
  entity: Entity
): Promise<EntityGroupWithAdd[] | []> => {
  try {
    const groups = await db.$transaction(async (tx) => {
      switch (entity) {
        case 'warehouseGroup':
          const warehouseGroups = await tx.warehouseGroup.findMany({
            include: {
              _count: {
                select: {
                  warehouses: true,
                },
              },
            },
          });
          return warehouseGroups.map((group) => ({
            ...group,
            count: group._count.warehouses,
          }));
        case 'materialGroup':
          const materialGroups = await tx.materialGroup.findMany({
            include: {
              _count: {
                select: {
                  materials: true,
                },
              },
            },
          });
          return materialGroups.map((group) => ({
            ...group,
            count: group._count.materials,
          }));
        default:
          return [];
      }
    });

    return groups;
  } catch {
    return [];
  }
};

export const addEntityGroupData = async (
  entity: Entity,
  data: TGroup
): Promise<number | null> => {
  const req = {
    data: { ...data },
  };
  try {
    const result = await db.$transaction(async (tx) => {
      switch (entity) {
        case 'warehouseGroup':
          await tx.warehouseGroup.create(req);
          return tx.warehouseGroup.count();
        case 'materialGroup':
          await tx.materialGroup.create(req);
          return tx.materialGroup.count();
        default:
          throw new Error('Invalid entity');
      }
    });

    return result;
  } catch {
    return null;
  }
};

export const updateEntityGroupData = async (
  entity: Entity,
  id: number,
  data: TGroup
): Promise<number | null> => {
  const req = {
    where: { id },
    data: { ...data },
  };
  try {
    await db.$transaction(async (tx) => {
      switch (entity) {
        case 'warehouseGroup':
          await tx.warehouseGroup.update(req);
          return tx.warehouseGroup.count();
        case 'materialGroup':
          await tx.materialGroup.update(req);
          return tx.materialGroup.count();
        default:
          throw new Error('Invalid entity');
      }
    });

    return 0;
  } catch {
    return null;
  }
};

export const delEntityGroupData = async (
  entity: Entity,
  id: number
): Promise<number | null> => {
  const req = {
    where: { id },
  };
  try {
    const result = await db.$transaction(async (tx) => {
      switch (entity) {
        case 'warehouseGroup':
          await tx.warehouseGroup.delete(req);
          return tx.warehouseGroup.count();
        case 'materialGroup':
          await tx.materialGroup.delete(req);
          return tx.materialGroup.count();
        default:
          throw new Error('Invalid entity');
      }
    });

    return result;
  } catch {
    return null;
  }
};
