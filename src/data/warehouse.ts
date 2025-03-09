import { db } from '@/lib/db';

export const getWarehouseById = async (id: number | undefined) => {
  try {
    const warehouse = await db.warehouse.findUnique({ where: { id } });

    return warehouse;
  } catch {
    return null;
  }
};

export const getWarehouseByName = async (name: string) => {
  try {
    const warehouse = await db.warehouse.findUnique({ where: { name } });

    return warehouse;
  } catch {
    return null;
  }
};

export const getAllWarehouses = async () => {
  try {
    const warehouses = await db.warehouse.findMany();

    return warehouses;
  } catch {
    return null;
  }
};
