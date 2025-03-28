'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Form } from '@/components/ui/form';
import { FormHeader } from '@/components/data-table/forms/form-header';
import { FormFieldInput } from '@/components/data-table/forms/form-field';

import { Api } from '@/services/api-client';
import { TUnitFormData, UnitFormSchema } from '@/schemas/unit-form-schema';
import { unit } from '@/actions/unit';
import { translateColumnsUnits } from '@/lib/data-table/translate-colums-header';
import { useMaterialSelectStore } from '@/store/material-select';
import { useTransitionNoErrors } from '@/hooks/use-transition-no-errors';

export const UnitForm = ({ id }: { id?: number }) => {
  const form = useForm<TUnitFormData>({
    resolver: zodResolver(UnitFormSchema),
    defaultValues: {
      name: '',
      status: 'ACTIVE',
    },
  });

  const router = useRouter();
  const { setLoadingUnits } = useMaterialSelectStore();

  const { isPending, startTransitionNoErrors } = useTransitionNoErrors(form);

  useEffect(() => {
    if (id) {
      (async function () {
        const data = await Api.units.fetchUnitById(id);

        form.setValue('name', data.name);
        form.setValue('status', data.status);
      })();
    }
  }, [form, id]);

  const onSubmit = (values: TUnitFormData) => {
    startTransitionNoErrors(() => {
      unit(values, id)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            router.refresh();
            form.reset();
            setLoadingUnits(true);
            toast.success(data.success);
          }
        })
        .catch(() => toast.error('Что-то пошло не так!'));
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-8 py-2"
      >
        <FormHeader
          id={id}
          form={form}
          status
          isPending={isPending}
          title="ед. измерения"
        />
        <div className="flex">
          <FormFieldInput
            form={form}
            name="name"
            placeholder="Введите ед. измерения"
            translate={translateColumnsUnits}
            isPending={isPending}
          />
        </div>
      </form>
    </Form>
  );
};
