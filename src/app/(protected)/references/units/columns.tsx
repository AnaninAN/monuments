'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { DataSheet } from '@/components/data-table/data-sheet';
import { UnitForm } from '@/components/data-table/forms/unit-form';
import { TUnitFormData } from '@/schemas/unit-form-schema';

export const columns: ColumnDef<TUnitFormData>[] = [
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
          FormComponent={UnitForm}
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
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Статус" />
    ),
  },
];
