import { MaterialGroup } from '@prisma/client';

import { axiosInstance } from './instance';

export const fetchAllMaterialGroups = async () => {
  const { data } = await axiosInstance.get<MaterialGroup[]>('/materialgroups');

  return data;
};

export const fetchMaterialGroupById = async (
  id: number | undefined
): Promise<MaterialGroup> => {
  const { data } = await axiosInstance.get<MaterialGroup>(
    `/materialgroups/${id}`
  );

  return data;
};
