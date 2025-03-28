'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Form } from '@/components/ui/form';
import { FormHeader } from '@/components/data-table/forms/form-header';
import {
  FormFieldInput,
  FormFieldTextarea,
} from '@/components/data-table/forms/form-field';

import {
  CounterpartyTypeFormSchema,
  TCounterpartyTypeFormData,
} from '@/schemas/counterparty-type-form-schema';
import { counterpartyType } from '@/actions/counterparty-type';
import { Api } from '@/services/api-client';
import { translateColumnsCounterpartyType } from '@/lib/data-table/translate-colums-header';
import { useCounterpartySelectStore } from '@/store/counterparty-select';
import { useTransitionNoErrors } from '@/hooks/use-transition-no-errors';

export const CounterpartyTypeForm = ({ id }: { id?: number }) => {
  const form = useForm<TCounterpartyTypeFormData>({
    resolver: zodResolver(CounterpartyTypeFormSchema),
    defaultValues: {
      name: '',
      comment: '',
      status: 'ACTIVE',
    },
  });

  const router = useRouter();
  const { setloadingCounterpartyTypes } = useCounterpartySelectStore();

  const { isPending, startTransitionNoErrors } = useTransitionNoErrors(form);

  useEffect(() => {
    if (id) {
      (async function () {
        const data = await Api.counterpartyTypes.fetchCounterpartyTypeById(id);

        form.setValue('name', data.name);
        form.setValue('comment', data.comment);
        form.setValue('status', data.status);
      })();
    }
  }, [form, id]);

  const onSubmit = (values: TCounterpartyTypeFormData) => {
    startTransitionNoErrors(() => {
      counterpartyType(values, id)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            router.refresh();
            form.reset();
            setloadingCounterpartyTypes(true);
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
          title="кат. контрагента"
        />
        <div className="grid gap-2">
          <FormFieldInput
            form={form}
            name="name"
            placeholder="Введите наименование типа контрагента"
            translate={translateColumnsCounterpartyType}
            isPending={isPending}
          />
        </div>
        <div className="grid gap-2">
          <FormFieldTextarea
            form={form}
            name="comment"
            placeholder="Введите комментарий"
            translate={translateColumnsCounterpartyType}
          />
        </div>
      </form>
    </Form>
  );
};
