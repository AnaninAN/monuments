'use client';

import { useState } from 'react';

import withAuth from '@/hoc/with-auth';

import { menu } from '@/consts/menu';
import { translateColumnsCounterpartyType } from '@/lib/data-table/translate-colums-header';
import { columns } from './columns';
import { getAllCounterpartyTypesData } from '@/data/counterparty-type';
import { useLoadingPageDataTable } from '@/hooks/use-loading-page-data-table';
import { TDataTable } from '@/types/types';

import { CounterpartyTypeForm } from '@/components/data-table/forms/counterparty-type-form';
import { ThreeTable } from '@/components/data-table/three-table';
import { TCounterpartyTypeFormData } from '@/schemas/counterparty-type-form-schema';

const CounterpartyTypesPage = () => {
  const [counterpartyTypes, setCounterpartyTypes] = useState<
    TCounterpartyTypeFormData[]
  >([]);

  const { isLoadingDataTable } =
    useLoadingPageDataTable<TCounterpartyTypeFormData>({
      getDataTable: getAllCounterpartyTypesData,
      setDataTable: setCounterpartyTypes,
    });

  if (!counterpartyTypes) return null;

  const dataTable: TDataTable<TCounterpartyTypeFormData> = {
    data: counterpartyTypes,
    FormComponent: CounterpartyTypeForm,
    filter: 'name',
    translateColumns: translateColumnsCounterpartyType,
    isLoadingDataTable,
    title: menu['COUNTERPARTY_TYPES'].title,
  };

  return <ThreeTable columns={columns} dataTable={dataTable} />;
};

export default withAuth(
  CounterpartyTypesPage,
  menu['COUNTERPARTY_TYPES'].roles,
  menu['COUNTERPARTY_TYPES'].title
);
