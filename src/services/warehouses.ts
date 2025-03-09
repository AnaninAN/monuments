import { Warehouse } from '@prisma/client';

import { axiosInstance } from './instance';

export const fetchWarehouseById = async (
  id: number | undefined
): Promise<Warehouse> => {
  const { data } = await axiosInstance.get<Warehouse>(`/warehouses/${id}`);

  return data;
};
