import { User } from '@prisma/client';

import { axiosInstance } from './instance';

export const fetchUserByIdInt = async (
  id: number | undefined
): Promise<User> => {
  const { data } = await axiosInstance.get<User>(`/users/${id}`);

  return data;
};
