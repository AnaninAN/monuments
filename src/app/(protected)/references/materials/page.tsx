'use client';

import { useState } from 'react';

import withAuth from '@/hoc/with-auth';

import { menu } from '@/consts/menu';
import { translateColumnsMaterial } from '@/lib/data-table/translate-colums-header';
import { columns } from './columns';
import type {
  EntityGroupWithAdd,
  MaterialWithAdd,
  TDataTable,
  TThree,
} from '@/types/types';
import { useLoadingPageDataTable } from '@/hooks/use-loading-page-data-table';
import { getAllMaterialsData } from '@/data/material';
import { getAllEntityGroupsData } from '@/data/entity-group';

import { MaterialForm } from '@/components/data-table/forms/material-form';
import { ThreeTable } from '@/components/data-table/three-table';

const MaterialsPage = () => {
  const [materials, setMaterials] = useState<MaterialWithAdd[]>([]);
  const [materialGroups, setMaterialGroups] = useState<EntityGroupWithAdd[]>(
    []
  );

  const { isLoadingDataTable, isLoadingDataGroup } =
    useLoadingPageDataTable<MaterialWithAdd>({
      getDataTable: getAllMaterialsData,
      setDataTable: setMaterials,
      entity: 'materialGroup',
      getDataGroup: getAllEntityGroupsData,
      setDataGroup: setMaterialGroups,
    });

  const dataTable: TDataTable<MaterialWithAdd> = {
    data: materials,
    FormComponent: MaterialForm,
    filter: 'name',
    translateColumns: translateColumnsMaterial,
    isLoadingDataTable,
    title: menu['MATERIALS'].title,
  };

  const three: TThree = {
    entity: 'materialGroup',
    threeData: materialGroups,
    isLoadingDataGroup,
  };

  return <ThreeTable columns={columns} dataTable={dataTable} three={three} />;
};

export default withAuth(
  MaterialsPage,
  menu['MATERIALS'].roles,
  menu['MATERIALS'].title
);
