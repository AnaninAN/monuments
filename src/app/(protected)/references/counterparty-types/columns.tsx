'use client';

import { ColumnDef } from '@tanstack/react-table';

import { TCounterpartyTypeFormData } from '@/schemas/counterparty-type-form-schema';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { DataSheet } from '@/components/data-table/data-sheet';
import { CounterpartyTypeForm } from '@/components/data-table/forms/counterpaty-type-form';

export const columns: ColumnDef<TCounterpartyTypeFormData>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="№" sort />
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <DataSheet
          id={row.getValue('id')}
          trigger={row.getValue('id')}
          FormComponent={CounterpartyTypeForm}
        />
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Наименование" sort />
    ),
  },
  {
    accessorKey: 'comment',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Комментарий" />
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Статус" />
    ),
  },
];
