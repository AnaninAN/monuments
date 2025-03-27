import { db } from '@/lib/db';

export const getMaterialById = async (id: number) => {
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

export const getMaterialByName = async (name: string) => {
  try {
    const material = await db.material.findUnique({
      where: { name },
    });

    return material;
  } catch {
    return null;
  }
};

export const getAllMaterials = async () => {
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
    return null;
  }
};
