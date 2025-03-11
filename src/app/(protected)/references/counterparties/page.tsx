import withAuth from '@/hoc/with-auth';

import { menu } from '@/consts/menu';
import { translateColumnsCounterparties } from '@/lib/data-table/translate-colums';
import { columns } from './columns';

import { getAllCounterparties } from '@/data/counterparty';

import { DataTable } from '@/components/data-table/data-table';
import { CounterpartyForm } from '@/components/data-table/forms/counterpaty-form';

async function CounterpartiesPage() {
  const counterparties = await getAllCounterparties();

  if (!counterparties) return null;

  return (
    <DataTable
      title={menu['COUNTERPARTIES'].title}
      columns={columns}
      data={counterparties}
      FormComponent={CounterpartyForm}
      filter="name"
      translateColumns={translateColumnsCounterparties}
    />
  );
}

export default withAuth(
  CounterpartiesPage,
  menu['COUNTERPARTIES'].roles,
  menu['COUNTERPARTIES'].title
);
