import withAuth from '@/hoc/with-auth';

import { menu } from '@/consts/menu';
import { translateColumnsEmployees } from '@/lib/data-table/translate-colums';
import { columns } from './columns';

import { getAllUsers } from '@/data/user';

import { DataTable } from '@/components/data-table/data-table';
import { UserForm } from '@/components/data-table/forms/user-form';

async function EmployeesPage() {
  const users = await getAllUsers();
  if (!users) return null;

  return (
    <DataTable
      columns={columns}
      data={users}
      FormComponent={UserForm}
      title={menu['USERS'].title}
      filter="email"
      translateColumns={translateColumnsEmployees}
    />
  );
}

export default withAuth(
  EmployeesPage,
  menu['USERS'].roles,
  menu['USERS'].title
);
