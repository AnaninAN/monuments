import { Counterparty, CounterpartyType } from '@prisma/client';

export type CounterpartyWithType = Counterparty & {
  counterpartyType: Pick<CounterpartyType, 'name'>;
};
