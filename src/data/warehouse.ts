'use server';

import { Warehouse } from '@prisma/client';

import { db } from '@/lib/db';
import { WarehouseWithAdd } from './dto/warehouse';

export const getWarehouseById = async (
  id?: number
): Promise<WarehouseWithAdd | null> => {
  try {
    const warehouse = await db.warehouse.findUnique({
      where: { id },
      include: {
        warehouseGroup: {
          select: {
            name: true,
          },
        },
      },
    });

    return warehouse;
  } catch {
    return null;
  }
};

export const getWarehouseByName = async (
  name: string
): Promise<Warehouse | null> => {
  try {
    const warehouse = await db.warehouse.findUnique({
      where: { name },
    });

    return warehouse;
  } catch {
    return null;
  }
};

export const getAllWarehouses = async (): Promise<WarehouseWithAdd[] | []> => {
  try {
    const warehouses = await db.warehouse.findMany({
      include: {
        warehouseGroup: {
          select: {
            name: true,
          },
        },
      },
    });

    return warehouses;
  } catch {
    return [];
  }
};
