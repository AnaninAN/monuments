import withAuth from '@/hoc/with-auth';

import { menu } from '@/consts/menu';
import { translateColumnsMaterials } from '@/lib/data-table/translate-colums-header';
import { columns } from './columns';

import { getAllMaterials } from '@/data/material';

import { DataTable } from '@/components/data-table/data-table';
import { MaterialForm } from '@/components/data-table/forms/material-form';

async function MaterialsPage() {
  const materials = await getAllMaterials();

  if (!materials) return null;

  return (
    <DataTable
      title={menu['MATERIALS'].title}
      columns={columns}
      data={materials}
      FormComponent={MaterialForm}
      filter="name"
      translateColumns={translateColumnsMaterials}
    />
  );
}

export default withAuth(
  MaterialsPage,
  menu['MATERIALS'].roles,
  menu['MATERIALS'].title
);
