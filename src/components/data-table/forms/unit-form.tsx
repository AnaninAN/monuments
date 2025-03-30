'use client';

import { useRouter } from 'next/navigation';

import { Form } from '@/components/ui/form';
import { FormHeader } from '@/components/data-table/forms/form-header';
import {
  FormFieldInput,
  FormFieldTextarea,
} from '@/components/data-table/forms/form-field';

import { TUnitFormData } from '@/schemas/unit-form-schema';
import { translateColumnsUnits } from '@/lib/data-table/translate-colums-header';
import { useTransitionNoErrors } from '@/hooks/use-transition-no-errors';
import { useUnitData } from '@/hooks/data-table/use-unit-data';

import { useLoadingSelectStore } from '@/store/loading-select';

interface UnitFormProps {
  id?: number;
}

export const UnitForm = ({ id }: UnitFormProps) => {
  const router = useRouter();
  const { form, handleUnitSubmit } = useUnitData(id);
  const { setLoadingUnits } = useLoadingSelectStore();
  const { isPending, startTransitionNoErrors } = useTransitionNoErrors(form);

  const onSubmit = (values: TUnitFormData) => {
    startTransitionNoErrors(() => {
      handleUnitSubmit(values, id, () => {
        router.refresh();
        if (!id) form.reset();
        setLoadingUnits(true);
      });
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
        <div className="grid gap-2">
          <FormFieldTextarea
            form={form}
            name="comment"
            placeholder="Введите комментарий"
            translate={translateColumnsUnits}
            isPending={isPending}
          />
        </div>
      </form>
    </Form>
  );
};
