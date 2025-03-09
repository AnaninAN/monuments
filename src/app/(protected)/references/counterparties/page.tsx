import withAuth from '@/hoc/with-auth';

import { getAllCounterparties } from '@/data/counterparty';
import { menu } from '@/consts/menu';

import { columns } from './columns';
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
    />
  );
}

export default withAuth(CounterpartiesPage, menu['COUNTERPARTIES'].roles);
