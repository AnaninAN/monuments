import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { TUnitFormData, UnitFormSchema } from '@/schemas/unit-form-schema';
import { Api } from '@/services/api-client';
import { unit } from '@/actions/unit';

const handleUnitSubmit = async (
  values: TUnitFormData,
  id?: number,
  onSuccess?: () => void
) => {
  try {
    const data = await unit(values, id);

    if (data?.error) {
      toast.error(data.error);
      return;
    }

    if (data?.success) {
      onSuccess?.();
      toast.success(data.success);
    }
  } catch (error) {
    toast.error('Произошла ошибка при сохранении единицы измерения!');
    console.error('Ошибка отправки единицы измерения:', error);
  }
};

export const useUnitData = (id?: number) => {
  const form = useForm<TUnitFormData>({
    resolver: zodResolver(UnitFormSchema),
    defaultValues: {
      name: '',
      status: 'ACTIVE',
      comment: '',
    },
  });

  useEffect(() => {
    if (id) {
      const fetchUnitData = async () => {
        try {
          const data = await Api.units.fetchUnitById(id);
          form.setValue('name', data.name);
          form.setValue('status', data.status);
          form.setValue('comment', data.comment);
        } catch (error) {
          console.error(
            'Ошибка при получении данных об единице измерения:',
            error
          );
          toast.error('Ошибка при загрузке данных единицы измерения!');
        }
      };
      fetchUnitData();
    }
  }, [form, id]);

  return { form, handleUnitSubmit };
};
