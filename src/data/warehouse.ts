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

export const getAllWarehouses = async (
  idGroup?: number
): Promise<WarehouseWithAdd[] | []> => {
  try {
    if (idGroup && idGroup !== 1) {
      const warehouses = await db.warehouse.findMany({
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
      return warehouses;
    } else {
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
    }
  } catch {
    return [];
  }
};
