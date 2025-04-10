'use client';

import { useState } from 'react';

import withAuth from '@/hoc/with-auth';

import { menu } from '@/consts/menu';
import { translateColumnsWarehouse } from '@/lib/data-table/translate-colums-header';
import { columns } from './columns';
import { getAllWarehousesData } from '@/data/warehouse';
import { getAllEntityGroupsData } from '@/data/entity-group';
import { useLoadingPageDataTable } from '@/hooks/use-loading-page-data-table';
import type {
  EntityGroupWithAdd,
  TDataTable,
  TThree,
  WarehouseWithAdd,
} from '@/types/types';

import { WarehouseForm } from '@/components/data-table/forms/warehouse-form';
import { ThreeTable } from '@/components/data-table/three-table';

const WarehousesPage = () => {
  const [warehouses, setWarehouses] = useState<WarehouseWithAdd[]>([]);
  const [warehouseGroups, setWarehouseGroups] = useState<EntityGroupWithAdd[]>(
    []
  );

  const { isLoadingDataTable, isLoadingDataGroup } =
    useLoadingPageDataTable<WarehouseWithAdd>({
      getDataTable: getAllWarehousesData,
      setDataTable: setWarehouses,
      entity: 'warehouseGroup',
      getDataGroup: getAllEntityGroupsData,
      setDataGroup: setWarehouseGroups,
    });

  const dataTable: TDataTable<WarehouseWithAdd> = {
    data: warehouses,
    FormComponent: WarehouseForm,
    filter: 'name',
    translateColumns: translateColumnsWarehouse,
    isLoadingDataTable,
    title: menu['WAREHOUSES'].title,
  };

  const three: TThree = {
    entity: 'warehouseGroup',
    threeData: warehouseGroups,
    isLoadingDataGroup,
  };

  return <ThreeTable columns={columns} dataTable={dataTable} three={three} />;
};

export default withAuth(
  WarehousesPage,
  menu['WAREHOUSES'].roles,
  menu['WAREHOUSES'].title
);
