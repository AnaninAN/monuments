import withAuth from '@/hoc/with-auth';

import { getAllWarehouses } from '@/data/warehouse';
import { menu } from '@/consts/menu';

import { columns } from './columns';
import { DataTable } from '@/components/data-table/data-table';
import { WarehouseForm } from '@/components/data-table/forms/warehouse-form';

async function WarehousesPage() {
  const warehouses = await getAllWarehouses();
  if (!warehouses) return null;

  return (
    <DataTable
      columns={columns}
      data={warehouses}
      FormComponent={WarehouseForm}
      title={menu['WAREHOUSES'].title}
    />
  );
}

export default withAuth(
  WarehousesPage,
  menu['WAREHOUSES'].roles,
  menu['WAREHOUSES'].title
);
