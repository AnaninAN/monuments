import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Api } from '@/services/api-client';
import {
  TWarehouseFormData,
  WarehouseFormSchema,
} from '@/schemas/warehouse-form-schema';
import { warehouse } from '@/actions/warehouse';

const handleWarehouseSubmit = async (
  values: TWarehouseFormData,
  id?: number,
  onSuccess?: () => void
) => {
  try {
    const data = await warehouse(values, id);

    if (data?.error) {
      toast.error(data.error);
      return;
    }

    if (data?.success) {
      onSuccess?.();
      toast.success(data.success);
    }
  } catch (error) {
    toast.error('Произошла ошибка при сохранении склада!');
    console.error('Ошибка отправки склада:', error);
  }
};

export const useWarehouseData = (id?: number) => {
  const form = useForm<TWarehouseFormData>({
    resolver: zodResolver(WarehouseFormSchema),
    defaultValues: {
      name: '',
      shortName: '',
      comment: '',
      status: 'ACTIVE',
    },
  });

  useEffect(() => {
    if (id) {
      const fetchWarehouseData = async () => {
        try {
          const data = await Api.warehouses.fetchWarehouseById(id);
          form.setValue('name', data.name);
          form.setValue('shortName', data.shortName);
          form.setValue('status', data.status);
          form.setValue('comment', data.comment);
        } catch (error) {
          console.error('Ошибка при получении данных об складе:', error);
          toast.error('Ошибка при загрузке данных склада!');
        }
      };
      fetchWarehouseData();
    }
  }, [form, id]);

  return { form, handleWarehouseSubmit };
};
