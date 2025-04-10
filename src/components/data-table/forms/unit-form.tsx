'use client';

import { TUnitFormData } from '@/schemas/unit-form-schema';
import { translateColumnsUnit } from '@/lib/data-table/translate-colums-header';
import { useTransitionNoErrors } from '@/hooks/use-transition-no-errors';
import { useUnitData } from '@/hooks/data-table/use-unit-data';
import { useLoadingSelectStore } from '@/store/loading-select';

import { Form } from '@/components/ui/form';
import { FormHeader } from '@/components/data-table/forms/form-header';
import {
  FormFieldInput,
  FormFieldTextarea,
} from '@/components/data-table/forms/form-field';
import { LoadingFormHeader } from '@/components/loading/loading-form-header';
import { useDataTableStore } from '@/store/data-table';

interface UnitFormProps {
  id?: number;
}

export const UnitForm = ({ id }: UnitFormProps) => {
  const { setCountDataTable } = useDataTableStore();
  const { form, handleUnitSubmit, isLoading } = useUnitData(id);
  const { setLoadingUnits } = useLoadingSelectStore();
  const { isPending, startTransitionNoErrors } = useTransitionNoErrors(form);

  const onSubmit = (values: TUnitFormData) => {
    startTransitionNoErrors(() => {
      handleUnitSubmit(values, id, (count) => {
        setCountDataTable(count);
        if (!id) form.reset();
        setLoadingUnits(true);
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
          title="ед. измерения"
        />
        <div className="flex">
          <FormFieldInput
            form={form}
            name="name"
            placeholder="Введите ед. измерения"
            translate={translateColumnsUnit}
            isPending={isPending}
          />
        </div>
        <div className="grid gap-2">
          <FormFieldTextarea
            form={form}
            name="comment"
            placeholder="Введите комментарий"
            translate={translateColumnsUnit}
            isPending={isPending}
          />
        </div>
      </form>
    </Form>
  );
};
