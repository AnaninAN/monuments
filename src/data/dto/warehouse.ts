import { Warehouse, WarehouseGroup } from '@prisma/client';

export type WarehouseWithAdd = Warehouse & {
  warehouseGroup: Pick<WarehouseGroup, 'name'>;
};
