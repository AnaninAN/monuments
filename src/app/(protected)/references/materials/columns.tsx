'use client';

import { ColumnDef } from '@tanstack/react-table';

import {
  KeyTMaterialFormData,
  TMaterialFormData,
} from '@/schemas/material-form-schema';
import { translateColumnsMaterials } from '@/lib/data-table/translate-colums-header';
import { dataTableColumnHeader } from '@/lib/data-table/data-table-column-header';

import { DataSheet } from '@/components/data-table/data-sheet';
import { MaterialForm } from '@/components/data-table/forms/material-form';

export const columns: ColumnDef<TMaterialFormData>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) =>
      dataTableColumnHeader<TMaterialFormData, KeyTMaterialFormData>(
        column,
        translateColumnsMaterials,
        true
      ),
    cell: ({ row }) => (
      <div className="pl-3">
        <DataSheet
          id={row.getValue('id')}
          trigger={row.getValue('id')}
          className="bg-white p-1 text-blue-700 rounded-md hover:text-white hover:bg-blue-700 cursor-pointer"
          FormComponent={MaterialForm}
        />
      </div>
    ),
  },
  {
    accessorKey: 'image',
    header: ({ column }) =>
      dataTableColumnHeader<TMaterialFormData, KeyTMaterialFormData>(
        column,
        translateColumnsMaterials
      ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) =>
      dataTableColumnHeader<TMaterialFormData, KeyTMaterialFormData>(
        column,
        translateColumnsMaterials,
        true
      ),
  },
  {
    accessorKey: 'article',
    header: ({ column }) =>
      dataTableColumnHeader<TMaterialFormData, KeyTMaterialFormData>(
        column,
        translateColumnsMaterials,
        true
      ),
  },
  {
    accessorKey: 'unit.name',
    header: ({ column }) =>
      dataTableColumnHeader<TMaterialFormData, KeyTMaterialFormData>(
        column,
        translateColumnsMaterials
      ),
  },
  {
    accessorKey: 'warehouse.name',
    header: ({ column }) =>
      dataTableColumnHeader<TMaterialFormData, KeyTMaterialFormData>(
        column,
        translateColumnsMaterials
      ),
  },
  {
    accessorKey: 'priceIn',
    header: ({ column }) =>
      dataTableColumnHeader<TMaterialFormData, KeyTMaterialFormData>(
        column,
        translateColumnsMaterials,
        true
      ),
  },
  {
    accessorKey: 'minBalance',
    header: ({ column }) =>
      dataTableColumnHeader<TMaterialFormData, KeyTMaterialFormData>(
        column,
        translateColumnsMaterials,
        true
      ),
  },
];
