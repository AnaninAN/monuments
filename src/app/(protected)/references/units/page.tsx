import withAuth from '@/hoc/with-auth';

import { menu } from '@/consts/menu';
import { translateColumnsUnit } from '@/lib/data-table/translate-colums-header';
import { columns } from './columns';

import { getAllUnits } from '@/data/unit';

import { UnitForm } from '@/components/data-table/forms/unit-form';
import { ThreeTable } from '@/components/data-table/three-table';

async function UnitsPage() {
  const units = await getAllUnits();
  if (!units) return null;

  return (
    <ThreeTable
      title={menu['UNITS'].title}
      columns={columns}
      data={units}
      FormComponent={UnitForm}
      filter="name"
      translateColumns={translateColumnsUnit}
    />
  );
}

export default withAuth(UnitsPage, menu['UNITS'].roles, menu['UNITS'].title);
