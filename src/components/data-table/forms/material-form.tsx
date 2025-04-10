'use client';

import { TMaterialFormData } from '@/schemas/material-form-schema';
import { translateColumnsMaterial } from '@/lib/data-table/translate-colums-header';
import { useTransitionNoErrors } from '@/hooks/use-transition-no-errors';
import { useStopPropagationStore } from '@/store/stop-propagation';
import { useMaterialData } from '@/hooks/data-table/use-material-data';

import { Form } from '@/components/ui/form';
import { FormHeader } from '@/components/data-table/forms/form-header';
import {
  FormFieldInput,
  FormFieldSelect,
  FormFieldTextarea,
} from '@/components/data-table/forms/form-field';
import { UnitForm } from '@/components/data-table/forms/unit-form';
import { WarehouseForm } from '@/components/data-table/forms/warehouse-form';
import { LoadingForm } from '@/components/data-table/forms/loading-form';
import { FormComponentProps } from '@/types/types';

import { useDataTableStore } from '@/store/data-table';

export const MaterialForm = ({ id, closeSheet }: FormComponentProps) => {
  const { setCountDataTable } = useDataTableStore();
  const {
    form,
    materialGroups,
    units,
    warehouses,
    handleMaterialSubmit,
    transformFormData,
    isLoading,
  } = useMaterialData(id);
  const { submit, setSubmit } = useStopPropagationStore();
  const { isPending, startTransitionNoErrors } = useTransitionNoErrors(
    form,
    submit
  );

  const onSubmit = async (values: TMaterialFormData) => {
    const transformedValues = transformFormData(values);

    startTransitionNoErrors(() => {
      handleMaterialSubmit(transformedValues, id, (count) => {
        setCountDataTable(count);
        if (!id) closeSheet?.();
      });
    });
  };

  return (
    <LoadingForm isLoading={isLoading}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 px-8 py-2 relative"
        >
          <FormHeader
            id={id}
            form={form}
            isPending={isPending}
            title="материал"
            setSubmit={setSubmit}
          />
          <div className="space-y-4 px-8 py-2 overflow-auto h-[calc(100vh-190px)]">
            <div className="grid gap-2">
              <FormFieldInput
                form={form}
                name="name"
                placeholder="Введите наименование материала"
                translate={translateColumnsMaterial}
                isPending={isPending}
              />
            </div>
            <div className="grid gap-2">
              <FormFieldInput
                form={form}
                name="article"
                placeholder="Введите артикул материала"
                translate={translateColumnsMaterial}
                isPending={isPending}
              />
            </div>
            <div className="grid gap-2">
              <FormFieldSelect
                form={form}
                name="materialGroup.name"
                placeholder="Выберите группу"
                translate={translateColumnsMaterial}
                items={materialGroups}
                isPending={isPending}
              />
            </div>
            <div className="grid gap-2">
              <FormFieldSelect
                form={form}
                name="unit.name"
                placeholder="Выберите единицу измерения"
                translate={translateColumnsMaterial}
                items={units}
                isPending={isPending}
                ButtonOpenForm={UnitForm}
              />
            </div>
            <div className="grid gap-2">
              <FormFieldSelect
                form={form}
                name="warehouse.name"
                placeholder="Выберите склад хранения"
                translate={translateColumnsMaterial}
                items={warehouses}
                isPending={isPending}
                ButtonOpenForm={WarehouseForm}
              />
            </div>
            <div className="grid gap-2">
              <FormFieldInput
                form={form}
                name="priceIn"
                placeholder="Введите закупочную цену"
                translate={translateColumnsMaterial}
                isPending={isPending}
                type="number"
              />
            </div>
            <div className="grid gap-2">
              <FormFieldInput
                form={form}
                name="minBalance"
                placeholder="Введите минимальный остаток"
                translate={translateColumnsMaterial}
                isPending={isPending}
                type="number"
              />
            </div>
            <div className="grid gap-2">
              <FormFieldTextarea
                form={form}
                name="comment"
                placeholder="Введите комментарий"
                translate={translateColumnsMaterial}
                isPending={isPending}
              />
            </div>
          </div>
        </form>
      </Form>
    </LoadingForm>
  );
};
