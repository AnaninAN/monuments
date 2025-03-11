'use client';

import { ColumnDef } from '@tanstack/react-table';

import { KeyTUnitFormData, TUnitFormData } from '@/schemas/unit-form-schema';
import { translateColumnsUnits } from '@/lib/data-table/translate-colums';

import { DataSheet } from '@/components/data-table/data-sheet';
import { UnitForm } from '@/components/data-table/forms/unit-form';
import { dataTableColumnHeader } from '@/lib/data-table/data-table-column-header';
import { CellStatus } from '@/components/data-table/cell-status';

export const columns: ColumnDef<TUnitFormData>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) =>
      dataTableColumnHeader<TUnitFormData, KeyTUnitFormData>(
        column,
        translateColumnsUnits,
        true
      ),
    cell: ({ row }) => (
      <div className="pl-3">
        <DataSheet
          id={row.getValue('id')}
          trigger={row.getValue('id')}
          className="bg-white p-1 text-blue-700 rounded-md hover:text-white hover:bg-blue-700 cursor-pointer"
          FormComponent={UnitForm}
        />
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) =>
      dataTableColumnHeader<TUnitFormData, KeyTUnitFormData>(
        column,
        translateColumnsUnits,
        true
      ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) =>
      dataTableColumnHeader<TUnitFormData, KeyTUnitFormData>(
        column,
        translateColumnsUnits
      ),
    cell: ({ row }) => <CellStatus value={row.getValue('status')} />,
  },
];
