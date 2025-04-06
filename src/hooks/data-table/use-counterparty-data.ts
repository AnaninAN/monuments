import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import {
  CounterpartyFormSchema,
  TCounterpartyFormData,
} from '@/schemas/counterparty-form-schema';
import { counterparty } from '@/actions/counterparty';
import { useLoadingSelectStore } from '@/store/loading-select';
import { CounterpartyType } from '@prisma/client';
import { getAllCounterpartyTypes } from '@/data/counterparty-type';
import { getCounterpartyById } from '@/data/counterparty';

const handleCounterpartySubmit = async (
  values: TCounterpartyFormData,
  id?: number,
  onSuccess?: () => void
) => {
  try {
    const data = await counterparty(values, id);

    if (data?.error) {
      toast.error(data.error);
      return;
    }

    if (data?.success) {
      onSuccess?.();
      toast.success(data.success);
    }
  } catch (error) {
    toast.error('Произошла ошибка при сохранении контрагента!');
    console.error('Ошибка отправки контрагента:', error);
  }
};

export const useCounterpartyData = (id?: number) => {
  const [counterpartyTypes, setCounterpartyTypes] = useState<
    CounterpartyType[]
  >([]);
  const { loadingCounterpartyTypes, setloadingCounterpartyTypes } =
    useLoadingSelectStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TCounterpartyFormData>({
    resolver: zodResolver(CounterpartyFormSchema),
    defaultValues: {
      name: '',
      comment: '',
      status: 'ACTIVE',
      counterpartyType: {
        name: '',
      },
      counterpartyTypeId: 0,
    },
  });

  useEffect(() => {
    if (loadingCounterpartyTypes) {
      const fetchCounterpartyTypesData = async () => {
        try {
          const data = await getAllCounterpartyTypes();
          setCounterpartyTypes(data);
        } catch (error) {
          console.error(
            'Ошибка при получении данных об типах контрагентов:',
            error
          );
          toast.error('Ошибка при загрузке типов контрагентов!');
        } finally {
          setloadingCounterpartyTypes(false);
        }
      };
      fetchCounterpartyTypesData();
    }
  }, [loadingCounterpartyTypes, setloadingCounterpartyTypes]);

  const fetchCounterpartyData = useCallback(async () => {
    try {
      setIsLoading(true);

      const data = await getAllCounterpartyTypes();
      setCounterpartyTypes(data);

      if (id) {
        const data = await getCounterpartyById(id);

        form.setValue('name', data?.name ?? '');
        form.setValue('comment', data?.comment ?? '');
        form.setValue('status', data?.status ?? 'ACTIVE');
        form.setValue(
          'counterpartyType.name',
          data?.counterpartyType.name ?? ''
        );
      }
    } catch (error) {
      console.error(
        'Ошибка при получении данных об типах контрагентов:',
        error
      );
      toast.error('Ошибка при загрузке типов контрагентов!');
    } finally {
      setIsLoading(false);
    }
  }, [form, id]);

  useEffect(() => {
    fetchCounterpartyData();
  }, [fetchCounterpartyData]);

  return { form, handleCounterpartySubmit, counterpartyTypes, isLoading };
};
