'use client';

import { ColumnDef } from '@tanstack/react-table';

import { KeyTUserFormData, TUserFormData } from '@/schemas/user-form-schema';
import { translateColumnsUser } from '@/lib/data-table/translate-colums-header';
import {
  ColumnsType,
  dataTableColumns,
} from '@/lib/data-table/data-table-colums';

import { UserForm } from '@/components/data-table/forms/user-form';

const columnsUser: ColumnsType<KeyTUserFormData> = [
  { key: 'name', sort: true },
  { key: 'lastname', sort: true },
  { key: 'email', sort: true },
  { key: 'role', sort: false },
  { key: 'phoneNumber', sort: false },
  { key: 'status', sort: false },
];

export const columns: ColumnDef<TUserFormData>[] = dataTableColumns({
  key: 'idInt',
  columns: columnsUser,
  translateColumns: translateColumnsUser,
  delRowDataTableAction: undefined,
  FormComponent: UserForm,
});
