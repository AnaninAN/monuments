'use client';

import { ColumnDef } from '@tanstack/react-table';

import {
  KeyTCounterpartyFormData,
  TCounterpartyFormData,
} from '@/schemas/counterparty-form-schema';
import { translateColumnsCounterparties } from '@/lib/data-table/translate-colums';
import { dataTableColumnHeader } from '@/lib/data-table/data-table-column-header';

import { DataSheet } from '@/components/data-table/data-sheet';
import { CounterpartyForm } from '@/components/data-table/forms/counterpaty-form';
import { CellStatus } from '@/lib/data-table/cell-status';

export const columns: ColumnDef<TCounterpartyFormData>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) =>
      dataTableColumnHeader<TCounterpartyFormData, KeyTCounterpartyFormData>(
        column,
        translateColumnsCounterparties,
        true
      ),
    cell: ({ row }) => (
      <div className="pl-3">
        <DataSheet
          id={row.getValue('id')}
          trigger={row.getValue('id')}
          className="bg-white p-1 text-blue-700 rounded-md hover:text-white hover:bg-blue-700 cursor-pointer"
          FormComponent={CounterpartyForm}
        />
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) =>
      dataTableColumnHeader<TCounterpartyFormData, KeyTCounterpartyFormData>(
        column,
        translateColumnsCounterparties,
        true
      ),
  },
  {
    accessorKey: 'counterpartyType.name',
    header: ({ column }) =>
      dataTableColumnHeader<TCounterpartyFormData, KeyTCounterpartyFormData>(
        column,
        translateColumnsCounterparties
      ),
  },
  {
    accessorKey: 'comment',
    header: ({ column }) =>
      dataTableColumnHeader<TCounterpartyFormData, KeyTCounterpartyFormData>(
        column,
        translateColumnsCounterparties
      ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) =>
      dataTableColumnHeader<TCounterpartyFormData, KeyTCounterpartyFormData>(
        column,
        translateColumnsCounterparties
      ),
    cell: ({ row }) => <CellStatus value={row.getValue('status')} />,
  },
];
