'use client';

import { ColumnDef } from '@tanstack/react-table';

import {
  KeyTWarehouseFormData,
  TWarehouseFormData,
} from '@/schemas/warehouse-form-schema';
import { translateColumnsWarehouses } from '@/lib/data-table/translate-colums';

import { DataSheet } from '@/components/data-table/data-sheet';
import { WarehouseForm } from '@/components/data-table/forms/warehouse-form';
import { dataTableColumnHeader } from '@/lib/data-table/data-table-column-header';
import { CellStatus } from '@/lib/data-table/cell-status';

export const columns: ColumnDef<TWarehouseFormData>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) =>
      dataTableColumnHeader<TWarehouseFormData, KeyTWarehouseFormData>(
        column,
        translateColumnsWarehouses,
        true
      ),
    cell: ({ row }) => (
      <div className="pl-3">
        <DataSheet
          id={row.getValue('id')}
          trigger={row.getValue('id')}
          className="bg-white p-1 text-blue-700 rounded-md hover:text-white hover:bg-blue-700 cursor-pointer"
          FormComponent={WarehouseForm}
        />
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) =>
      dataTableColumnHeader<TWarehouseFormData, KeyTWarehouseFormData>(
        column,
        translateColumnsWarehouses,
        true
      ),
  },
  {
    accessorKey: 'shortName',
    header: ({ column }) =>
      dataTableColumnHeader<TWarehouseFormData, KeyTWarehouseFormData>(
        column,
        translateColumnsWarehouses,
        true
      ),
  },
  {
    accessorKey: 'comment',
    header: ({ column }) =>
      dataTableColumnHeader<TWarehouseFormData, KeyTWarehouseFormData>(
        column,
        translateColumnsWarehouses
      ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) =>
      dataTableColumnHeader<TWarehouseFormData, KeyTWarehouseFormData>(
        column,
        translateColumnsWarehouses
      ),
    cell: ({ row }) => <CellStatus value={row.getValue('status')} />,
  },
];
