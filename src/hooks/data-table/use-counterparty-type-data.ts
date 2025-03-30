import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Api } from '@/services/api-client';
import {
  CounterpartyTypeFormSchema,
  TCounterpartyTypeFormData,
} from '@/schemas/counterparty-type-form-schema';
import { counterpartyType } from '@/actions/counterparty-type';

const handleCounterpartyTypeSubmit = async (
  values: TCounterpartyTypeFormData,
  id?: number,
  onSuccess?: () => void
) => {
  try {
    const data = await counterpartyType(values, id);

    if (data?.error) {
      toast.error(data.error);
      return;
    }

    if (data?.success) {
      onSuccess?.();
      toast.success(data.success);
    }
  } catch (error) {
    toast.error('Произошла ошибка при сохранении типа контрагента!');
    console.error('Ошибка отправки типа контрагента:', error);
  }
};

export const useCounterpartyTypeData = (id?: number) => {
  const form = useForm<TCounterpartyTypeFormData>({
    resolver: zodResolver(CounterpartyTypeFormSchema),
    defaultValues: {
      name: '',
      comment: '',
      status: 'ACTIVE',
    },
  });

  useEffect(() => {
    if (id) {
      const fetchCounterpartyTypeData = async () => {
        try {
          const data =
            await Api.counterpartyTypes.fetchCounterpartyTypeById(id);
          form.setValue('name', data.name);
          form.setValue('comment', data.comment);
          form.setValue('status', data.status);
        } catch (error) {
          console.error(
            'Ошибка при получении данных об типе контрагента:',
            error
          );
          toast.error('Ошибка при загрузке данных типа контрагента!');
        }
      };
      fetchCounterpartyTypeData();
    }
  }, [form, id]);

  return { form, handleCounterpartyTypeSubmit };
};
