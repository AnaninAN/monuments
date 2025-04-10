'use client';

import withAuth from '@/hoc/with-auth';

import { menu } from '@/consts/menu';
import { translateColumnsCounterparty } from '@/lib/data-table/translate-colums-header';
import { columns } from './columns';

import { getAllCounterpartiesData } from '@/data/counterparty';

import { CounterpartyForm } from '@/components/data-table/forms/counterparty-form';
import { ThreeTable } from '@/components/data-table/three-table';
import { useState } from 'react';
import { useLoadingPageDataTable } from '@/hooks/use-loading-page-data-table';
import { CounterpartyWithAdd, TDataTable } from '@/types/types';

export const CounterpartiesPage = () => {
  const [counterparties, setCounterparties] = useState<CounterpartyWithAdd[]>(
    []
  );

  const { isLoadingDataTable } = useLoadingPageDataTable<CounterpartyWithAdd>({
    getDataTable: getAllCounterpartiesData,
    setDataTable: setCounterparties,
  });

  const dataTable: TDataTable<CounterpartyWithAdd> = {
    data: counterparties,
    FormComponent: CounterpartyForm,
    filter: 'name',
    translateColumns: translateColumnsCounterparty,
    isLoadingDataTable,
    title: menu['COUNTERPARTIES'].title,
  };

  return <ThreeTable columns={columns} dataTable={dataTable} />;
};

export default withAuth(
  CounterpartiesPage,
  menu['COUNTERPARTIES'].roles,
  menu['COUNTERPARTIES'].title
);
