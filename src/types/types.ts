import {
  Counterparty,
  CounterpartyType,
  Material,
  MaterialGroup,
  Unit,
  Warehouse,
  WarehouseGroup,
} from '@prisma/client';

export type Entity = 'warehouseGroup' | 'materialGroup';

export type EntityGroup = {
  id: number;
  name: string;
  parentId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type EntityGroupWithAdd = Omit<
  EntityGroup,
  'createdAt' | 'updatedAt'
> & {
  count: number;
};

export type EntityGroupWithParentname = Omit<
  EntityGroup,
  'createdAt' | 'updatedAt' | 'id'
> & {
  parentname: string;
};

export type WarehouseWithAdd = Warehouse & {
  warehouseGroup: Pick<WarehouseGroup, 'name'>;
};

export type MaterialWithAdd = Material & {
  materialGroup: Pick<MaterialGroup, 'name'>;
  unit: Pick<Unit, 'name'>;
  warehouse: Pick<Warehouse, 'name'> | null;
};

export type CounterpartyWithAdd = Counterparty & {
  counterpartyType: Pick<CounterpartyType, 'name'>;
};

export type FormComponentProps = {
  id?: number;
  closeSheet?: () => void;
};

export type FormComponent = React.ComponentType<FormComponentProps>;

export type TreeNode = {
  id: number;
  name: string;
  parentId: number | 0;
  count: number;
  children?: TreeNode[];
};

export type TThree = {
  entity: Entity;
  threeData: TreeNode[];
  isLoadingDataGroup: boolean;
};

export type TDataTable<TData> = {
  data: TData[];
  FormComponent: React.ComponentType;
  filter: string;
  translateColumns: Record<string, string>;
  isLoadingDataTable: boolean;
  title: string;
};

export type TDataTableActionResult = Promise<{
  success?: string;
  error?: string;
  count?: number;
}>;

export type TDataTableAction = (id: number) => TDataTableActionResult;
