'use client';

import { ColumnDef } from '@tanstack/react-table';

import {
  KeyTWarehouseFormData,
  TWarehouseFormData,
} from '@/schemas/warehouse-form-schema';
import { translateColumnsWarehouses } from '@/lib/data-table/translate-colums-header';
import {
  ColumnsType,
  dataTableColumns,
} from '@/lib/data-table/data-table-colums';

import { WarehouseForm } from '@/components/data-table/forms/warehouse-form';

import { delWarehouse } from '@/actions/warehouse';

const cols: ColumnsType<KeyTWarehouseFormData> = [
  { key: 'name', sort: true },
  { key: 'shortName', sort: false },
  { key: 'comment', sort: false },
  { key: 'status', sort: false },
];

export const columns: ColumnDef<TWarehouseFormData>[] = dataTableColumns(
  'id',
  cols,
  translateColumnsWarehouses,
  delWarehouse,
  WarehouseForm
);
