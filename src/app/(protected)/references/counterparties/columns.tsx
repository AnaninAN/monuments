'use client';

import { ColumnDef } from '@tanstack/react-table';

import {
  KeyTCounterpartyFormData,
  TCounterpartyFormData,
} from '@/schemas/counterparty-form-schema';
import { translateColumnsCounterparty } from '@/lib/data-table/translate-colums-header';
import {
  ColumnsType,
  dataTableColumns,
} from '@/lib/data-table/data-table-colums';

import { CounterpartyForm } from '@/components/data-table/forms/counterparty-form';

import { delCounterpartyAction } from '@/actions/counterparty';

const columnsCounterparty: ColumnsType<KeyTCounterpartyFormData> = [
  { key: 'name', sort: true },
  { key: 'counterpartyType_name', sort: false },
  { key: 'comment', sort: false },
  { key: 'status', sort: false },
];

export const columns: ColumnDef<TCounterpartyFormData>[] = dataTableColumns({
  key: 'id',
  columns: columnsCounterparty,
  translateColumns: translateColumnsCounterparty,
  delRowDataTableAction: delCounterpartyAction,
  FormComponent: CounterpartyForm,
});
