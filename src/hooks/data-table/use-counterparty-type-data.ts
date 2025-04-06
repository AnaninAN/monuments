import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import {
  CounterpartyTypeFormSchema,
  TCounterpartyTypeFormData,
} from '@/schemas/counterparty-type-form-schema';
import { counterpartyType } from '@/actions/counterparty-type';
import { getCounterpartyTypeById } from '@/data/counterparty-type';

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
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TCounterpartyTypeFormData>({
    resolver: zodResolver(CounterpartyTypeFormSchema),
    defaultValues: {
      name: '',
      comment: '',
      status: 'ACTIVE',
    },
  });

  const fetchCounterpartyTypeData = useCallback(async () => {
    try {
      setIsLoading(true);

      if (id) {
        const data = await getCounterpartyTypeById(id);

        form.setValue('name', data?.name ?? '');
        form.setValue('comment', data?.comment ?? '');
        form.setValue('status', data?.status ?? 'ACTIVE');
      }
    } catch (error) {
      console.error('Ошибка при получении данных об типе контрагента:', error);
      toast.error('Ошибка при загрузке данных типа контрагента!');
    } finally {
      setIsLoading(false);
    }
  }, [form, id]);

  useEffect(() => {
    fetchCounterpartyTypeData();
  }, [fetchCounterpartyTypeData]);

  return { form, handleCounterpartyTypeSubmit, isLoading };
};
