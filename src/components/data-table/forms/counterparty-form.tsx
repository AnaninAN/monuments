'use client';

import { useRouter } from 'next/navigation';

import { TCounterpartyFormData } from '@/schemas/counterparty-form-schema';
import { translateColumnsCounterparty } from '@/lib/data-table/translate-colums-header';
import { useTransitionNoErrors } from '@/hooks/use-transition-no-errors';
import { useStopPropagationStore } from '@/store/stop-propagation';
import { useCounterpartyData } from '@/hooks/data-table/use-counterparty-data';

import { Form } from '@/components/ui/form';
import { FormHeader } from '@/components/data-table/forms/form-header';
import {
  FormFieldInput,
  FormFieldSelect,
  FormFieldTextarea,
} from '@/components/data-table/forms/form-field';
import { CounterpartyTypeForm } from '@/components/data-table/forms/counterparty-type-form';
import { LoadingFormHeader } from '@/components/loading/loading-form-header';

interface CounterpartyFormProps {
  id?: number;
}

export const CounterpartyForm = ({ id }: CounterpartyFormProps) => {
  const router = useRouter();
  const { form, handleCounterpartySubmit, counterpartyTypes, isLoading } =
    useCounterpartyData(id);
  const { submit, setSubmit } = useStopPropagationStore();
  const { isPending, startTransitionNoErrors } = useTransitionNoErrors(
    form,
    submit
  );

  const transformFormData = (
    values: TCounterpartyFormData
  ): TCounterpartyFormData => {
    const newCounterpartyTypeId =
      counterpartyTypes.find(
        (types) => types.name === values.counterpartyType.name
      )?.id || values.counterpartyTypeId;

    return {
      ...values,
      counterpartyTypeId: newCounterpartyTypeId,
    };
  };

  const onSubmit = async (values: TCounterpartyFormData) => {
    const transformedValues = transformFormData(values);

    startTransitionNoErrors(() => {
      handleCounterpartySubmit(transformedValues, id, () => {
        router.refresh();
        if (!id) form.reset();
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
          title="контрагента"
          setSubmit={setSubmit}
        />
        <div className="grid gap-2">
          <FormFieldInput
            form={form}
            name="name"
            placeholder="Введите наименование контрагента"
            translate={translateColumnsCounterparty}
            isPending={isPending}
          />
        </div>
        <div className="grid gap-2">
          <FormFieldSelect
            form={form}
            name="counterpartyType.name"
            placeholder="Выберите тип контрагента"
            translate={translateColumnsCounterparty}
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
            translate={translateColumnsCounterparty}
            isPending={isPending}
          />
        </div>
      </form>
    </Form>
  );
};
