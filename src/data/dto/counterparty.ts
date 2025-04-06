import { Counterparty, CounterpartyType } from '@prisma/client';

export type CounterpartyWithAdd = Counterparty & {
  counterpartyType: Pick<CounterpartyType, 'name'>;
};
