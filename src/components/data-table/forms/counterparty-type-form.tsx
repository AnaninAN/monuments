'use client';

import { useRouter } from 'next/navigation';

import { TCounterpartyTypeFormData } from '@/schemas/counterparty-type-form-schema';
import { translateColumnsCounterpartyType } from '@/lib/data-table/translate-colums-header';
import { useLoadingSelectStore } from '@/store/loading-select';
import { useTransitionNoErrors } from '@/hooks/use-transition-no-errors';
import { useCounterpartyTypeData } from '@/hooks/data-table/use-counterparty-type-data';

import { Form } from '@/components/ui/form';
import { FormHeader } from '@/components/data-table/forms/form-header';
import {
  FormFieldInput,
  FormFieldTextarea,
} from '@/components/data-table/forms/form-field';
import { LoadingFormHeader } from '@/components/loading/loading-form-header';

export const CounterpartyTypeForm = ({ id }: { id?: number }) => {
  const router = useRouter();
  const { form, handleCounterpartyTypeSubmit, isLoading } =
    useCounterpartyTypeData(id);
  const { setloadingCounterpartyTypes } = useLoadingSelectStore();
  const { isPending, startTransitionNoErrors } = useTransitionNoErrors(form);

  const onSubmit = (values: TCounterpartyTypeFormData) => {
    startTransitionNoErrors(() => {
      handleCounterpartyTypeSubmit(values, id, () => {
        router.refresh();
        if (!id) form.reset();
        setloadingCounterpartyTypes(true);
      });
    });
  };

  if (isLoading) {
    return <LoadingFormHeader />;
  }

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
            isPending={isPending}
          />
        </div>
      </form>
    </Form>
  );
};
