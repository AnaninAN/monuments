'use client';

import { ColumnDef } from '@tanstack/react-table';

import {
  KeyTCounterpartyTypeFormData,
  TCounterpartyTypeFormData,
} from '@/schemas/counterparty-type-form-schema';
import { translateColumnsCounterpartyType } from '@/lib/data-table/translate-colums-header';
import {
  ColumnsType,
  dataTableColumns,
} from '@/lib/data-table/data-table-colums';
import { delCounterpartyTypeAction } from '@/actions/counterparty-type';

import { CounterpartyTypeForm } from '@/components/data-table/forms/counterparty-type-form';

const columnsCounterpartyType: ColumnsType<KeyTCounterpartyTypeFormData> = [
  { key: 'name', sort: true },
  { key: 'comment', sort: false },
  { key: 'status', sort: false },
];

export const columns: ColumnDef<TCounterpartyTypeFormData>[] = dataTableColumns(
  {
    key: 'id',
    columns: columnsCounterpartyType,
    translateColumns: translateColumnsCounterpartyType,
    delRowDataTableAction: delCounterpartyTypeAction,
    FormComponent: CounterpartyTypeForm,
  }
);
