'use client';

import { ColumnDef } from '@tanstack/react-table';

import {
  KeyTCounterpartyTypeFormData,
  TCounterpartyTypeFormData,
} from '@/schemas/counterparty-type-form-schema';
import { translateColumnsCounterpartyType } from '@/lib/data-table/translate-colums';

import { DataSheet } from '@/components/data-table/data-sheet';
import { CounterpartyTypeForm } from '@/components/data-table/forms/counterpaty-type-form';
import { CellStatus } from '@/lib/data-table/cell-status';
import { dataTableColumnHeader } from '@/lib/data-table/data-table-column-header';

export const columns: ColumnDef<TCounterpartyTypeFormData>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) =>
      dataTableColumnHeader<
        TCounterpartyTypeFormData,
        KeyTCounterpartyTypeFormData
      >(column, translateColumnsCounterpartyType, true),
    cell: ({ row }) => (
      <div className="pl-3">
        <DataSheet
          id={row.getValue('id')}
          trigger={row.getValue('id')}
          className="bg-white p-1 text-blue-700 rounded-md hover:text-white hover:bg-blue-700 cursor-pointer"
          FormComponent={CounterpartyTypeForm}
        />
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) =>
      dataTableColumnHeader<
        TCounterpartyTypeFormData,
        KeyTCounterpartyTypeFormData
      >(column, translateColumnsCounterpartyType, true),
  },
  {
    accessorKey: 'comment',
    header: ({ column }) =>
      dataTableColumnHeader<
        TCounterpartyTypeFormData,
        KeyTCounterpartyTypeFormData
      >(column, translateColumnsCounterpartyType),
  },
  {
    accessorKey: 'status',
    header: ({ column }) =>
      dataTableColumnHeader<
        TCounterpartyTypeFormData,
        KeyTCounterpartyTypeFormData
      >(column, translateColumnsCounterpartyType),
    cell: ({ row }) => CellStatus(row.getValue('status')),
  },
];
