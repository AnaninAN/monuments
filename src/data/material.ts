'use server';

import { Material } from '@prisma/client';

import { db } from '@/lib/db';
import { MaterialWithAdd } from './dto/material';

export const getMaterialById = async (
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

export const getMaterialByName = async (
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

export const getAllMaterials = async (): Promise<MaterialWithAdd[] | []> => {
  try {
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
