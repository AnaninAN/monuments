import withAuth from '@/hoc/with-auth';

import { getAllUsers } from '@/data/user';
import { menu } from '@/consts/menu';

import { columns } from './columns';
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
      title={menu['EMPLOYEES'].title}
    />
  );
}

export default withAuth(EmployeesPage, menu['EMPLOYEES'].roles);
