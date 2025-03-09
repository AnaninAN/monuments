import { CounterpartyType } from '@prisma/client';

import { axiosInstance } from './instance';

export const fetchAllCounterpartyTypes = async () => {
  const { data } = await axiosInstance.get<CounterpartyType[]>(
    '/counterpartytypes'
  );

  return data;
};

export const fetchCounterpartyTypeById = async (
  id: number | undefined
): Promise<CounterpartyType> => {
  const { data } = await axiosInstance.get<CounterpartyType>(
    `/counterpartytypes/${id}`
  );

  return data;
};
