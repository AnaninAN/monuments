import { axiosInstance } from './instance';
import { CounterpartyWithType } from './dto/counterparty';

export const fetchCounterpartiesById = async (
  id: number | undefined
): Promise<CounterpartyWithType> => {
  const { data } = await axiosInstance.get<CounterpartyWithType>(
    `/counterparties/${id}`
  );

  return data;
};
