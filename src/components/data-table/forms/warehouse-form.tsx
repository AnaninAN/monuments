'use client';

import { TWarehouseFormData } from '@/schemas/warehouse-form-schema';
import { translateColumnsWarehouse } from '@/lib/data-table/translate-colums-header';
import { useTransitionNoErrors } from '@/hooks/use-transition-no-errors';
import { useLoadingSelectStore } from '@/store/loading-select';
import { useWarehouseData } from '@/hooks/data-table/use-warehouse-data';

import { Form } from '@/components/ui/form';
import { FormHeader } from '@/components/data-table/forms/form-header';
import {
  FormFieldInput,
  FormFieldSelect,
  FormFieldTextarea,
} from '@/components/data-table/forms/form-field';
import { Spin } from '@/components/ui/spin';

import { useDataTableStore } from '@/store/data-table';

export function WarehouseForm({ id }: { id?: number }) {
  const { setCountDataTable } = useDataTableStore();
  const {
    form,
    handleWarehouseSubmit,
    isLoading,
    transformFormData,
    warehouseGroups,
  } = useWarehouseData(id);
  const { setLoadingWarehouses } = useLoadingSelectStore();
  const { isPending, startTransitionNoErrors } = useTransitionNoErrors(form);

  const onSubmit = (values: TWarehouseFormData) => {
    const transformedValues = transformFormData(values);

    startTransitionNoErrors(() => {
      handleWarehouseSubmit(transformedValues, id, (count) => {
        setCountDataTable(count);
        if (!id) form.reset();
        setLoadingWarehouses(true);
      });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-8 py-2 relative"
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
              translate={translateColumnsWarehouse}
              isPending={isPending}
            />
          </div>
          <div className="grid gap-2">
            <FormFieldInput
              form={form}
              name="shortName"
              placeholder="Введите краткое наименование склада"
              translate={translateColumnsWarehouse}
              isPending={isPending}
            />
          </div>
          <div className="grid gap-2">
            <FormFieldSelect
              form={form}
              name="warehouseGroup.name"
              placeholder="Выберите группу"
              translate={translateColumnsWarehouse}
              items={warehouseGroups}
              isPending={isPending}
            />
          </div>
          <div className="grid gap-2">
            <FormFieldTextarea
              form={form}
              name="comment"
              placeholder="Введите комментарий"
              translate={translateColumnsWarehouse}
              isPending={isPending}
            />
          </div>
        </div>
      </form>
      {isLoading && (
        <div className="space-y-4 px-8 py-2 w-full h-full bg-gray-100/50 absolute top-0 left-0">
          <Spin />
        </div>
      )}
    </Form>
  );
}
