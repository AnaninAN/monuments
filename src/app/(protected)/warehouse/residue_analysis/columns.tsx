'use client';

import { ColumnDef } from '@tanstack/react-table';

import {
  KeyTMaterialFormData,
  TMaterialFormData,
} from '@/schemas/material-form-schema';
import { translateColumnsMaterial } from '@/lib/data-table/translate-colums-header';
import {
  ColumnsType,
  dataTableColumns,
} from '@/lib/data-table/data-table-colums';

import { MaterialForm } from '@/components/data-table/forms/material-form';

const columnsMaterial: ColumnsType<KeyTMaterialFormData> = [
  { key: 'name', sort: true },
  { key: 'article', sort: true },
  { key: 'unit_name', sort: false },
  { key: 'minBalance', sort: true },
  { key: 'count', sort: true },
  { key: 'warehouse_name', sort: true },
];

export const columns: ColumnDef<TMaterialFormData>[] = dataTableColumns({
  key: undefined,
  columns: columnsMaterial,
  translateColumns: translateColumnsMaterial,
  delRowDataTableAction: undefined,
  FormComponent: MaterialForm,
});
