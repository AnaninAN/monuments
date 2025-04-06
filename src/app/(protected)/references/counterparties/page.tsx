import withAuth from '@/hoc/with-auth';

import { menu } from '@/consts/menu';
import { translateColumnsCounterparty } from '@/lib/data-table/translate-colums-header';
import { columns } from './columns';

import { getAllCounterparties } from '@/data/counterparty';

import { CounterpartyForm } from '@/components/data-table/forms/counterparty-form';
import { ThreeTable } from '@/components/data-table/three-table';

async function CounterpartiesPage() {
  const counterparties = await getAllCounterparties();

  if (!counterparties) return null;

  return (
    <ThreeTable
      title={menu['COUNTERPARTIES'].title}
      columns={columns}
      data={counterparties}
      FormComponent={CounterpartyForm}
      filter="name"
      translateColumns={translateColumnsCounterparty}
    />
  );
}

export default withAuth(
  CounterpartiesPage,
  menu['COUNTERPARTIES'].roles,
  menu['COUNTERPARTIES'].title
);
