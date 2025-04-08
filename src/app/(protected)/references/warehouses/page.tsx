import withAuth from '@/hoc/with-auth';

import { menu } from '@/consts/menu';
import { translateColumnsWarehouse } from '@/lib/data-table/translate-colums-header';
import { columns } from './columns';

import { getAllWarehouses } from '@/data/warehouse';
import {
  getAllWarehouseGroups,
  getWarehouseGroupById,
} from '@/data/warehouse-group';

import { TThree } from '@/components/types/types';
import { WarehouseWithAdd } from '@/data/dto/warehouse';
import { filterWarehouse } from '@/actions/warehouse';

import { WarehouseForm } from '@/components/data-table/forms/warehouse-form';
import { ThreeTable } from '@/components/data-table/three-table';
import { delWarehouseGroup, warehouseGroup } from '@/actions/warehouse-group';

async function WarehousesPage() {
  const [warehouses, warehouseGroups] = await Promise.all([
    getAllWarehouses(),
    getAllWarehouseGroups(),
  ]);

  if (!warehouses || !warehouseGroups) return null;

  const three: TThree<WarehouseWithAdd> = {
    threeData: warehouseGroups,
    getGroupById: getWarehouseGroupById,
    action: warehouseGroup,
    actionDel: delWarehouseGroup,
    actionFilter: filterWarehouse,
  };

  return (
    <ThreeTable
      columns={columns}
      data={warehouses}
      FormComponent={WarehouseForm}
      title={menu['WAREHOUSES'].title}
      filter="name"
      translateColumns={translateColumnsWarehouse}
      three={three}
    />
  );
}

export default withAuth(
  WarehousesPage,
  menu['WAREHOUSES'].roles,
  menu['WAREHOUSES'].title
);
