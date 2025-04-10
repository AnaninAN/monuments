import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import {
  CounterpartyFormSchema,
  TCounterpartyFormData,
} from '@/schemas/counterparty-form-schema';
import { counterpartyAction } from '@/actions/counterparty';
import { useLoadingSelectStore } from '@/store/loading-select';
import { CounterpartyType } from '@prisma/client';
import { getAllCounterpartyTypesData } from '@/data/counterparty-type';
import { getCounterpartyByIdData } from '@/data/counterparty';

const handleCounterpartySubmit = async (
  values: TCounterpartyFormData,
  id?: number,
  onSuccess?: (count: number) => void
) => {
  try {
    const data = await counterpartyAction(values, id);

    if (data?.error) {
      toast.error(data.error);
      return;
    }

    if (data?.success) {
      onSuccess?.(data.count ?? 0);
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
      legalAddress: '',
      phone: '',
      email: '',
      INN: '',
      KPP: '',
      OGRN: '',
    },
  });

  useEffect(() => {
    if (loadingCounterpartyTypes) {
      const fetchCounterpartyTypesData = async () => {
        try {
          const data = await getAllCounterpartyTypesData();
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

      const data = await getAllCounterpartyTypesData();
      setCounterpartyTypes(data);

      if (id) {
        const data = await getCounterpartyByIdData(id);

        form.setValue('name', data?.name ?? '');
        form.setValue('comment', data?.comment ?? '');
        form.setValue('status', data?.status ?? 'ACTIVE');
        form.setValue('counterpartyTypeId', data?.counterpartyTypeId ?? 0);
        form.setValue(
          'counterpartyType.name',
          data?.counterpartyType.name ?? ''
        );
        form.setValue('legalAddress', data?.legalAddress ?? '');
        form.setValue('phone', data?.phone ?? '');
        form.setValue('email', data?.email ?? '');
        form.setValue('INN', data?.INN ?? '');
        form.setValue('KPP', data?.KPP ?? '');
        form.setValue('OGRN', data?.OGRN ?? '');
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
