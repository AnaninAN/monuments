import { Unit } from '@prisma/client';

import { axiosInstance } from './instance';

export const fetchUnitById = async (id: number | undefined): Promise<Unit> => {
  const { data } = await axiosInstance.get<Unit>(`/units/${id}`);

  return data;
};
