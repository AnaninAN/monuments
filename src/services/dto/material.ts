import { Material, MaterialGroup, Unit, Warehouse } from '@prisma/client';

export type MaterialWithAdd = Material & {
  materialGroup: Pick<MaterialGroup, 'name'>;
  unit: Pick<Unit, 'name'>;
  warehouse: Pick<Warehouse, 'name'>;
};
