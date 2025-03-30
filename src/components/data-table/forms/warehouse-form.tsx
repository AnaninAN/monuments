'use client';

import { useRouter } from 'next/navigation';

import { Form } from '@/components/ui/form';
import { FormHeader } from '@/components/data-table/forms/form-header';
import {
  FormFieldInput,
  FormFieldTextarea,
} from '@/components/data-table/forms/form-field';

import { TWarehouseFormData } from '@/schemas/warehouse-form-schema';
import { translateColumnsWarehouses } from '@/lib/data-table/translate-colums-header';
import { useTransitionNoErrors } from '@/hooks/use-transition-no-errors';
import { useLoadingSelectStore } from '@/store/loading-select';
import { useWarehouseData } from '@/hooks/data-table/use-warehouse-data';

export function WarehouseForm({ id }: { id?: number }) {
  const router = useRouter();
  const { form, handleWarehouseSubmit } = useWarehouseData(id);
  const { setLoadingWarehouses } = useLoadingSelectStore();
  const { isPending, startTransitionNoErrors } = useTransitionNoErrors(form);

  const onSubmit = (values: TWarehouseFormData) => {
    startTransitionNoErrors(() => {
      handleWarehouseSubmit(values, id, () => {
        router.refresh();
        if (!id) form.reset();
        setLoadingWarehouses(true);
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
          title="склад"
        />
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <FormFieldInput
              form={form}
              name="name"
              placeholder="Введите наименование склада"
              translate={translateColumnsWarehouses}
              isPending={isPending}
            />
          </div>
          <div className="grid gap-2">
            <FormFieldInput
              form={form}
              name="shortName"
              placeholder="Введите краткое наименование склада"
              translate={translateColumnsWarehouses}
              isPending={isPending}
            />
          </div>
          <div className="grid gap-2">
            <FormFieldTextarea
              form={form}
              name="comment"
              placeholder="Введите комментарий"
              translate={translateColumnsWarehouses}
              isPending={isPending}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
