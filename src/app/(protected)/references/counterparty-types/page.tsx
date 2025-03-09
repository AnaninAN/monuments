import withAuth from '@/hoc/with-auth';

import { getAllCounterpartyTypes } from '@/data/counterparty-type';
import { menu } from '@/consts/menu';

import { columns } from './columns';
import { DataTable } from '@/components/data-table/data-table';
import { CounterpartyTypeForm } from '@/components/data-table/forms/counterpaty-type-form';

async function CounterpartyTypesPage() {
  const counterpartyTypes = await getAllCounterpartyTypes();
  if (!counterpartyTypes) return null;

  return (
    <DataTable
      title={menu['COUNTERPARTY_TYPES'].title}
      columns={columns}
      data={counterpartyTypes}
      FormComponent={CounterpartyTypeForm}
    />
  );
}

export default withAuth(
  CounterpartyTypesPage,
  menu['COUNTERPARTY_TYPES'].roles
);
