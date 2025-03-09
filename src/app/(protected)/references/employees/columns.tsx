'use client';

import { ColumnDef } from '@tanstack/react-table';

import { TUserFormData } from '@/schemas/user-form-schema';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { DataSheet } from '@/components/data-table/data-sheet';
import { UserForm } from '@/components/data-table/forms/user-form';

export const columns: ColumnDef<TUserFormData>[] = [
  {
    accessorKey: 'idInt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="№" sort />
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <DataSheet
          id={row.getValue('idInt')}
          trigger={row.getValue('idInt')}
          FormComponent={UserForm}
        />
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Имя" sort />
    ),
  },
  {
    accessorKey: 'lastname',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Фамилия" sort />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" sort />
    ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Роль" />
    ),
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Номер телефона" />
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Статус" />
    ),
  },
];
