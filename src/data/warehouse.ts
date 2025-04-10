'use server';

import { Warehouse } from '@prisma/client';

import { db } from '@/lib/db';
import { WarehouseWithAdd } from '@/types/types';
import { TWarehouse } from '@/schemas/warehouse-form-schema';

export const getWarehouseByIdData = async (
  id?: number
): Promise<WarehouseWithAdd | null> => {
  try {
    const warehouse = await db.$transaction(async (tx) => {
      return tx.warehouse.findUnique({
        where: { id },
        include: {
          warehouseGroup: {
            select: {
              name: true,
            },
          },
        },
      });
    });

    return warehouse;
  } catch {
    return null;
  }
};

export const getWarehouseByNameData = async (
  name: string
): Promise<Warehouse | null> => {
  try {
    const warehouse = await db.$transaction(async (tx) => {
      return tx.warehouse.findUnique({
        where: { name },
      });
    });

    return warehouse;
  } catch {
    return null;
  }
};

export const getAllWarehousesData = async (
  idGroup?: number
): Promise<WarehouseWithAdd[] | []> => {
  try {
    if (idGroup && idGroup !== 1) {
      const warehouses = await db.$transaction(async (tx) => {
        return tx.warehouse.findMany({
          where: {
            warehouseGroupId: idGroup,
          },
          include: {
            warehouseGroup: {
              select: {
                name: true,
              },
            },
          },
        });
      });

      return warehouses;
    } else {
      const warehouses = await db.$transaction(async (tx) => {
        return tx.warehouse.findMany({
          include: {
            warehouseGroup: {
              select: {
                name: true,
              },
            },
          },
        });
      });

      return warehouses;
    }
  } catch {
    return [];
  }
};

export const updateWarehouseData = async (
  id: number,
  data: TWarehouse
): Promise<number | null> => {
  try {
    await db.$transaction(async (tx) => {
      await tx.warehouse.update({
        where: { id },
        data: { ...data },
      });
    });

    return 0;
  } catch {
    return null;
  }
};

export const addWarehouseData = async (
  data: TWarehouse
): Promise<number | null> => {
  try {
    const result = await db.$transaction(async (tx) => {
      await tx.warehouse.create({
        data: { ...data },
      });
      return tx.warehouse.count();
    });

    return result;
  } catch {
    return null;
  }
};

export const delWarehouseData = async (id: number): Promise<number | null> => {
  try {
    const result = await db.$transaction(async (tx) => {
      await tx.warehouse.delete({ where: { id } });
      return tx.warehouse.count();
    });

    return result;
  } catch {
    return null;
  }
};
