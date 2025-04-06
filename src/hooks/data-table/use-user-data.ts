import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { TUserFormData, UserFormSchema } from '@/schemas/user-form-schema';
import { user } from '@/actions/user';
import { getUserByIdInt } from '@/data/user';

const handleUserSubmit = async (
  values: TUserFormData,
  id?: number,
  onSuccess?: () => void
) => {
  try {
    const data = await user(values, id);

    if (data?.error) {
      toast.error(data.error);
      return;
    }

    if (data?.success) {
      onSuccess?.();
      toast.success(data.success);
    }
  } catch (error) {
    toast.error('Произошла ошибка при сохранении пользователя!');
    console.error('Ошибка отправки пользователя:', error);
  }
};

export const useUserData = (id?: number) => {
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<TUserFormData>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      email: '',
      name: '',
      lastname: '',
      status: 'ACTIVE',
      role: 'OPERATOR',
      phoneNumber: '',
    },
  });

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);

      if (id) {
        const data = await getUserByIdInt(id);

        form.setValue('email', data?.email ?? '');
        form.setValue('name', data?.name ?? '');
        form.setValue('lastname', data?.lastname ?? '');
        form.setValue('status', data?.status ?? 'ACTIVE');
        form.setValue('role', data?.role ?? 'OPERATOR');
        form.setValue('phoneNumber', data?.phoneNumber ?? '');
      }
    } catch (error) {
      console.error('Ошибка при получении данных об пользователе:', error);
      toast.error('Ошибка при загрузке данных пользователя!');
    } finally {
      setIsLoading(false);
    }
  }, [form, id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { form, handleUserSubmit, isLoading };
};
