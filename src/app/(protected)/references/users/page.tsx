'use client';

import { useState } from 'react';

import withAuth from '@/hoc/with-auth';

import { menu } from '@/consts/menu';
import { translateColumnsUser } from '@/lib/data-table/translate-colums-header';
import { columns } from './columns';
import { ThreeTable } from '@/components/data-table/three-table';
import { TUserFormData } from '@/schemas/user-form-schema';
import { useLoadingPageDataTable } from '@/hooks/use-loading-page-data-table';
import { TDataTable } from '@/types/types';
import { getAllUsersData } from '@/data/user';

import { UserForm } from '@/components/data-table/forms/user-form';

const UsersPage = () => {
  const [users, setUsers] = useState<TUserFormData[]>([]);

  const { isLoadingDataTable } = useLoadingPageDataTable<TUserFormData>({
    getDataTable: getAllUsersData,
    setDataTable: setUsers,
  });

  const dataTable: TDataTable<TUserFormData> = {
    data: users,
    FormComponent: UserForm,
    filter: 'name',
    translateColumns: translateColumnsUser,
    isLoadingDataTable,
    title: menu['USERS'].title,
  };

  return <ThreeTable columns={columns} dataTable={dataTable} />;
};

export default withAuth(UsersPage, menu['USERS'].roles, menu['USERS'].title);
