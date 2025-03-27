'use client';

import { ColumnDef } from '@tanstack/react-table';

import { KeyTUnitFormData, TUnitFormData } from '@/schemas/unit-form-schema';
import { translateColumnsUnits } from '@/lib/data-table/translate-colums-header';
import {
  ColumnsType,
  dataTableColumns,
} from '@/lib/data-table/data-table-colums';

import { UnitForm } from '@/components/data-table/forms/unit-form';

import { delUnit } from '@/actions/unit';

const cols: ColumnsType<KeyTUnitFormData> = [
  { key: 'name', sort: true },
  { key: 'status', sort: false },
];

export const columns: ColumnDef<TUnitFormData>[] = dataTableColumns(
  'id',
  cols,
  translateColumnsUnits,
  delUnit,
  UnitForm
);
