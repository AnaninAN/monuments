import { db } from '@/lib/db';

export const getMaterialGroupById = async (id: number) => {
  try {
    const materialGroup = await db.materialGroup.findUnique({
      where: { id },
    });

    return materialGroup;
  } catch {
    return null;
  }
};

export const getMaterialGroupByName = async (name: string) => {
  try {
    const materialGroup = await db.materialGroup.findUnique({
      where: { name },
    });

    return materialGroup;
  } catch {
    return null;
  }
};

export const getAllMaterialGroups = async () => {
  try {
    const materialGroups = await db.materialGroup.findMany();

    return materialGroups;
  } catch {
    return null;
  }
};
