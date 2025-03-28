'use client';

import { ColumnDef } from '@tanstack/react-table';

import {
  KeyTMaterialFormData,
  TMaterialFormData,
} from '@/schemas/material-form-schema';
import { translateColumnsMaterials } from '@/lib/data-table/translate-colums-header';
import {
  ColumnsType,
  dataTableColumns,
} from '@/lib/data-table/data-table-colums';

import { MaterialForm } from '@/components/data-table/forms/material-form';

import { delMaterial } from '@/actions/material';

const cols: ColumnsType<KeyTMaterialFormData> = [
  { key: 'image', sort: false },
  { key: 'name', sort: true },
  { key: 'article', sort: true },
  { key: 'unit_name', sort: false },
  { key: 'warehouse_name', sort: false },
  { key: 'priceIn', sort: true },
  { key: 'minBalance', sort: true },
];

export const columns: ColumnDef<TMaterialFormData>[] = dataTableColumns(
  'id',
  cols,
  translateColumnsMaterials,
  delMaterial,
  MaterialForm
);
