'use client';

import { useState } from 'react';

import withAuth from '@/hoc/with-auth';

import { menu } from '@/consts/menu';
import { translateColumnsUnit } from '@/lib/data-table/translate-colums-header';
import { columns } from './columns';
import { getAllUnitsData } from '@/data/unit';
import { useLoadingPageDataTable } from '@/hooks/use-loading-page-data-table';
import { TDataTable } from '@/types/types';
import { TUnitFormData } from '@/schemas/unit-form-schema';

import { UnitForm } from '@/components/data-table/forms/unit-form';
import { ThreeTable } from '@/components/data-table/three-table';

const UnitsPage = () => {
  const [units, setUnits] = useState<TUnitFormData[]>([]);

  const { isLoadingDataTable } = useLoadingPageDataTable<TUnitFormData>({
    getDataTable: getAllUnitsData,
    setDataTable: setUnits,
  });

  const dataTable: TDataTable<TUnitFormData> = {
    data: units,
    FormComponent: UnitForm,
    filter: 'name',
    translateColumns: translateColumnsUnit,
    isLoadingDataTable,
    title: menu['UNITS'].title,
  };

  return <ThreeTable columns={columns} dataTable={dataTable} />;
};

export default withAuth(UnitsPage, menu['UNITS'].roles, menu['UNITS'].title);
