'use client';

import { ColumnDef } from '@tanstack/react-table';

import { KeyTUserFormData, TUserFormData } from '@/schemas/user-form-schema';
import { translateColumnsEmployees } from '@/lib/data-table/translate-colums-header';
import { dataTableColumnHeader } from '@/lib/data-table/data-table-column-header';

import { DataSheet } from '@/components/data-table/data-sheet';
import { UserForm } from '@/components/data-table/forms/user-form';
import { CellStatus } from '@/components/data-table/cell-status';

export const columns: ColumnDef<TUserFormData>[] = [
  {
    accessorKey: 'idInt',
    header: ({ column }) =>
      dataTableColumnHeader<TUserFormData, KeyTUserFormData>(
        column,
        translateColumnsEmployees,
        true
      ),
    cell: ({ row }) => (
      <div className="pl-3">
        <DataSheet
          id={row.getValue('idInt')}
          trigger={row.getValue('idInt')}
          className="bg-white p-1 text-blue-700 rounded-md hover:text-white hover:bg-blue-700 cursor-pointer"
          FormComponent={UserForm}
        />
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) =>
      dataTableColumnHeader<TUserFormData, KeyTUserFormData>(
        column,
        translateColumnsEmployees,
        true
      ),
  },
  {
    accessorKey: 'lastname',
    header: ({ column }) =>
      dataTableColumnHeader<TUserFormData, KeyTUserFormData>(
        column,
        translateColumnsEmployees,
        true
      ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) =>
      dataTableColumnHeader<TUserFormData, KeyTUserFormData>(
        column,
        translateColumnsEmployees,
        true
      ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) =>
      dataTableColumnHeader<TUserFormData, KeyTUserFormData>(
        column,
        translateColumnsEmployees
      ),
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) =>
      dataTableColumnHeader<TUserFormData, KeyTUserFormData>(
        column,
        translateColumnsEmployees
      ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) =>
      dataTableColumnHeader<TUserFormData, KeyTUserFormData>(
        column,
        translateColumnsEmployees
      ),
    cell: ({ row }) => <CellStatus value={row.getValue('status')} />,
  },
];
