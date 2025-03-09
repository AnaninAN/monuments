'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { DataSheet } from '@/components/data-table/data-sheet';
import { WarehouseForm } from '@/components/data-table/forms/warehouse-form';
import { TWarehouseFormData } from '@/schemas/warehouse-form-schema';

export const columns: ColumnDef<TWarehouseFormData>[] = [
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
          FormComponent={WarehouseForm}
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
    accessorKey: 'shortName',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Красткое наименование"
        sort
      />
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
