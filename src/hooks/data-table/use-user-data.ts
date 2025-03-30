import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Api } from '@/services/api-client';
import { TUserFormData, UserFormSchema } from '@/schemas/user-form-schema';
import { user } from '@/actions/user';

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

  useEffect(() => {
    if (id) {
      const fetchUserData = async () => {
        try {
          const data = await Api.users.fetchUserByIdInt(id);
          form.setValue('email', data.email);
          form.setValue('name', data.name);
          form.setValue('lastname', data.lastname);
          form.setValue('role', data.role);
          form.setValue('status', data.status);
          form.setValue('phoneNumber', data.phoneNumber);
        } catch (error) {
          console.error('Ошибка при получении данных об пользователе:', error);
          toast.error('Ошибка при загрузке данных пользователя!');
        }
      };
      fetchUserData();
    }
  }, [form, id]);

  return { form, handleUserSubmit };
};
