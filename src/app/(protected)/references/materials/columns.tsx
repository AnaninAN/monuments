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

import { delMaterialAction } from '@/actions/material';

const columnsMaterial: ColumnsType<KeyTMaterialFormData> = [
  { key: 'image', sort: false },
  { key: 'name', sort: true },
  { key: 'article', sort: true },
  { key: 'unit_name', sort: false },
  { key: 'priceIn', sort: true },
  { key: 'minBalance', sort: true },
];

export const columns: ColumnDef<TMaterialFormData>[] = dataTableColumns({
  key: 'id',
  columns: columnsMaterial,
  translateColumns: translateColumnsMaterial,
  delRowDataTableAction: delMaterialAction,
  FormComponent: MaterialForm,
});
