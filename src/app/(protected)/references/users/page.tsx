import withAuth from '@/hoc/with-auth';

import { menu } from '@/consts/menu';
import { translateColumnsEmployee } from '@/lib/data-table/translate-colums-header';
import { columns } from './columns';

import { getAllUsers } from '@/data/user';

import { UserForm } from '@/components/data-table/forms/user-form';
import { ThreeTable } from '@/components/data-table/three-table';

async function EmployeesPage() {
  const users = await getAllUsers();
  if (!users) return null;

  return (
    <ThreeTable
      columns={columns}
      data={users}
      FormComponent={UserForm}
      title={menu['USERS'].title}
      filter="email"
      translateColumns={translateColumnsEmployee}
    />
  );
}

export default withAuth(
  EmployeesPage,
  menu['USERS'].roles,
  menu['USERS'].title
);
