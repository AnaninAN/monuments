import withAuth from '@/hoc/with-auth';

import { menu } from '@/consts/menu';
import { translateColumnsWarehouses } from '@/lib/data-table/translate-colums-header';
import { columns } from './columns';

import { getAllWarehouses } from '@/data/warehouse';

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
      filter="name"
      translateColumns={translateColumnsWarehouses}
    />
  );
}

export default withAuth(
  WarehousesPage,
  menu['WAREHOUSES'].roles,
  menu['WAREHOUSES'].title
);
