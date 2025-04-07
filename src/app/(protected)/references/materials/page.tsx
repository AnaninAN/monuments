import withAuth from '@/hoc/with-auth';

import { menu } from '@/consts/menu';
import { translateColumnsMaterial } from '@/lib/data-table/translate-colums-header';
import { columns } from './columns';

import { getAllMaterials } from '@/data/material';
import {
  getAllMaterialGroups,
  getMaterialGroupById,
} from '@/data/material-group';
import type { TThree } from '@/components/types/types';

import { MaterialForm } from '@/components/data-table/forms/material-form';
import { ThreeTable } from '@/components/data-table/three-table';
import { delMaterialGroup, materialGroup } from '@/actions/material-group';

async function MaterialsPage() {
  const [materials, materialGroups] = await Promise.all([
    getAllMaterials(),
    getAllMaterialGroups(),
  ]);

  if (!materials || !materialGroups) return null;

  const three: TThree = {
    threeData: materialGroups,
    getGroupById: getMaterialGroupById,
    action: materialGroup,
    actionDel: delMaterialGroup,
  };

  return (
    <ThreeTable
      title={menu['MATERIALS'].title}
      columns={columns}
      data={materials}
      FormComponent={MaterialForm}
      filter="name"
      translateColumns={translateColumnsMaterial}
      three={three}
    />
  );
}

export default withAuth(
  MaterialsPage,
  menu['MATERIALS'].roles,
  menu['MATERIALS'].title
);
