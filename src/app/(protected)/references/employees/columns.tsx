'use client';

import { ColumnDef } from '@tanstack/react-table';

import { TUserFormData } from '@/schemas/user-form-schema';

import { phoneFormat } from '@/lib/utils';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { DataSheet } from '@/components/data-table/data-sheet';
import { UserForm } from '@/components/data-table/forms/user-form';

export const columns: ColumnDef<TUserFormData>[] = [
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
    cell: ({ row }) => {
      return <div>{phoneFormat(row.getValue('phoneNumber'))}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Статус" />
    ),
  },
];
