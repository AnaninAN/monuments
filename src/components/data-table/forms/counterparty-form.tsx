'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { CounterpartyType } from '@prisma/client';
import { toast } from 'sonner';

import { Form } from '@/components/ui/form';
import { FormHeader } from '@/components/data-table/forms/form-header';
import {
  FormFieldInput,
  FormFieldSelect,
  FormFieldTextarea,
} from '@/components/data-table/forms/form-field';
import { CounterpartyTypeForm } from '@/components/data-table/forms/counterparty-type-form';

import {
  CounterpartyFormSchema,
  TCounterpartyFormData,
} from '@/schemas/counterparty-form-schema';
import { counterparty } from '@/actions/counterparty';
import { Api } from '@/services/api-client';
import { translateColumnsCounterparties } from '@/lib/data-table/translate-colums-header';
import { useCounterpartySelectStore } from '@/store/counterparty-select';
import { useTransitionNoErrors } from '@/hooks/use-transition-no-errors';

export const CounterpartyForm = ({ id }: { id?: number }) => {
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

  const router = useRouter();
  const { loadingCounterpartyTypes, setloadingCounterpartyTypes } =
    useCounterpartySelectStore();

  const [counterpartyTypes, setCounterpartyTypes] = useState<
    CounterpartyType[]
  >([]);

  const { isPending, startTransitionNoErrors } = useTransitionNoErrors(form);

  useEffect(() => {
    if (loadingCounterpartyTypes) {
      (async function fetchCounterpartyTypes() {
        const data = await Api.counterpartyTypes.fetchAllCounterpartyTypes();
        setCounterpartyTypes(data);
      })();
      setloadingCounterpartyTypes(false);
    }
  }, [loadingCounterpartyTypes, setloadingCounterpartyTypes]);

  useEffect(() => {
    if (id) {
      (async function () {
        const data = await Api.counterparties.fetchCounterpartiesById(id);

        form.setValue('name', data.name);
        form.setValue('comment', data.comment);
        form.setValue('status', data.status);
        form.setValue('counterpartyType.name', data.counterpartyType.name);
      })();
    }

    return () => {
      setloadingCounterpartyTypes(true);
    };
  }, [form, id, setloadingCounterpartyTypes]);

  const onSubmit = async (values: TCounterpartyFormData) => {
    const newCounterpartyTypeId =
      counterpartyTypes.find(
        (types) => types.name === values.counterpartyType.name
      )?.id || values.counterpartyTypeId;

    const newValues: typeof values = {
      ...values,
      counterpartyTypeId: newCounterpartyTypeId,
    };

    startTransitionNoErrors(() => {
      counterparty(newValues, id)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            router.refresh();
            if (!id) form.reset();
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
          title="контрагента"
        />
        <div className="grid gap-2">
          <FormFieldInput
            form={form}
            name="name"
            placeholder="Введите наименование контрагента"
            translate={translateColumnsCounterparties}
            isPending={isPending}
          />
        </div>
        <div className="grid gap-2">
          <FormFieldSelect
            form={form}
            name="counterpartyType.name"
            placeholder="Выберите тип контрагента"
            translate={translateColumnsCounterparties}
            items={counterpartyTypes}
            isPending={isPending}
            ButtonOpenForm={CounterpartyTypeForm}
          />
        </div>
        <div className="grid gap-2">
          <FormFieldTextarea
            form={form}
            name="comment"
            placeholder="Введите комментарий"
            translate={translateColumnsCounterparties}
          />
        </div>
      </form>
    </Form>
  );
};
