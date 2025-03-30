import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Api } from '@/services/api-client';
import {
  CounterpartyFormSchema,
  TCounterpartyFormData,
} from '@/schemas/counterparty-form-schema';
import { counterparty } from '@/actions/counterparty';
import { useLoadingSelectStore } from '@/store/loading-select';
import { CounterpartyType } from '@prisma/client';

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
    const fetchData = async () => {
      if (loadingCounterpartyTypes) {
        try {
          const data = await Api.counterpartyTypes.fetchAllCounterpartyTypes();
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
      }
    };
    fetchData();
  }, [loadingCounterpartyTypes, setloadingCounterpartyTypes]);

  useEffect(() => {
    if (id) {
      const fetchCounterpartyData = async () => {
        try {
          const data = await Api.counterparties.fetchCounterpartiesById(id);
          form.setValue('name', data.name);
          form.setValue('comment', data.comment);
          form.setValue('status', data.status);
          form.setValue('counterpartyType.name', data.counterpartyType.name);
        } catch (error) {
          console.error('Ошибка при получении данных об контрагенте:', error);
          toast.error('Ошибка при загрузке данных контрагента!');
        }
      };
      fetchCounterpartyData();
    }

    return () => {
      setloadingCounterpartyTypes(true);
    };
  }, [form, id, setloadingCounterpartyTypes]);

  return { form, handleCounterpartySubmit, counterpartyTypes };
};
