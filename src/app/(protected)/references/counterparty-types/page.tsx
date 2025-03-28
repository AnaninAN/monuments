import withAuth from '@/hoc/with-auth';

import { menu } from '@/consts/menu';
import { translateColumnsCounterpartyType } from '@/lib/data-table/translate-colums-header';
import { columns } from './columns';

import { getAllCounterpartyTypes } from '@/data/counterparty-type';

import { DataTable } from '@/components/data-table/data-table';
import { CounterpartyTypeForm } from '@/components/data-table/forms/counterparty-type-form';

async function CounterpartyTypesPage() {
  const counterpartyTypes = await getAllCounterpartyTypes();
  if (!counterpartyTypes) return null;

  return (
    <DataTable
      title={menu['COUNTERPARTY_TYPES'].title}
      columns={columns}
      data={counterpartyTypes}
      FormComponent={CounterpartyTypeForm}
      filter="name"
      translateColumns={translateColumnsCounterpartyType}
    />
  );
}

export default withAuth(
  CounterpartyTypesPage,
  menu['COUNTERPARTY_TYPES'].roles,
  menu['COUNTERPARTY_TYPES'].title
);
