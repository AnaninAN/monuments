import withAuth from '@/hoc/with-auth';

import { menu } from '@/consts/menu';
import { translateColumnsUnits } from '@/lib/data-table/translate-colums-header';
import { columns } from './columns';

import { getAllUnits } from '@/data/unit';

import { DataTable } from '@/components/data-table/data-table';
import { UnitForm } from '@/components/data-table/forms/unit-form';

async function UnitsPage() {
  const units = await getAllUnits();
  if (!units) return null;

  return (
    <DataTable
      title={menu['UNITS'].title}
      columns={columns}
      data={units}
      FormComponent={UnitForm}
      filter="name"
      translateColumns={translateColumnsUnits}
    />
  );
}

export default withAuth(UnitsPage, menu['UNITS'].roles, menu['UNITS'].title);
