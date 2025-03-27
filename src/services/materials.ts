import { axiosInstance } from './instance';
import { MaterialWithAdd } from './dto/material';

export const fetchMaterialById = async (
  id: number | undefined
): Promise<MaterialWithAdd> => {
  const { data } = await axiosInstance.get<MaterialWithAdd>(`/materials/${id}`);

  return data;
};
