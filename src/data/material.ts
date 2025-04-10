'use server';

import { Material } from '@prisma/client';

import { db } from '@/lib/db';
import { MaterialWithAdd } from '@/types/types';
import { TMaterial } from '@/schemas/material-form-schema';

export const getMaterialByIdData = async (
  id?: number
): Promise<MaterialWithAdd | null> => {
  try {
    const material = await db.material.findUnique({
      where: { id },
      include: {
        materialGroup: {
          select: {
            name: true,
          },
        },
        unit: {
          select: {
            name: true,
          },
        },
        warehouse: {
          select: {
            name: true,
          },
        },
      },
    });

    return material;
  } catch {
    return null;
  }
};

export const getMaterialByNameData = async (
  name: string
): Promise<Material | null> => {
  try {
    const material = await db.material.findUnique({
      where: { name },
    });

    return material;
  } catch {
    return null;
  }
};

export const getAllMaterialsData = async (
  idGroup?: number
): Promise<MaterialWithAdd[] | []> => {
  try {
    if (idGroup && idGroup !== 1) {
      const materials = await db.material.findMany({
        where: {
          materialGroupId: idGroup,
        },
        include: {
          materialGroup: {
            select: {
              name: true,
            },
          },
          unit: {
            select: {
              name: true,
            },
          },
          warehouse: {
            select: {
              name: true,
            },
          },
        },
      });

      return materials;
    }
    const materials = await db.material.findMany({
      include: {
        materialGroup: {
          select: {
            name: true,
          },
        },
        unit: {
          select: {
            name: true,
          },
        },
        warehouse: {
          select: {
            name: true,
          },
        },
      },
    });
    return materials;
  } catch {
    return [];
  }
};

export const addMaterialData = async (
  data: TMaterial
): Promise<number | null> => {
  try {
    const result = await db.$transaction(async (tx) => {
      await tx.material.create({
        data: { ...data },
      });
      return await tx.material.count();
    });

    return result;
  } catch {
    return null;
  }
};

export const updateMaterialData = async (
  id: number,
  data: TMaterial
): Promise<number | null> => {
  try {
    await db.$transaction(async (tx) => {
      await tx.material.update({
        where: { id },
        data,
      });
    });

    return 0;
  } catch {
    return null;
  }
};

export const delMaterialData = async (id: number): Promise<number | null> => {
  try {
    const result = await db.$transaction(async (tx) => {
      await tx.material.delete({
        where: { id },
      });
      return await tx.material.count();
    });

    return result;
  } catch {
    return null;
  }
};
