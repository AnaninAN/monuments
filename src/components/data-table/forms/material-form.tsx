'use client';

import { useRouter } from 'next/navigation';

import { Form } from '@/components/ui/form';
import { FormHeader } from '@/components/data-table/forms/form-header';
import {
  FormFieldInput,
  FormFieldSelect,
  FormFieldTextarea,
} from '@/components/data-table/forms/form-field';
import { UnitForm } from '@/components/data-table/forms/unit-form';
import { WarehouseForm } from '@/components/data-table/forms/warehouse-form';

import { TMaterialFormData } from '@/schemas/material-form-schema';
import { translateColumnsMaterials } from '@/lib/data-table/translate-colums-header';
import { useTransitionNoErrors } from '@/hooks/use-transition-no-errors';
import { useStopPropagationStore } from '@/store/stop-propagation';
import { useMaterialData } from '@/hooks/data-table/use-material-data';

interface MaterialFormProps {
  id?: number;
}

export const MaterialForm = ({ id }: MaterialFormProps) => {
  const router = useRouter();
  const { form, materialGroups, units, warehouses, handleMaterialSubmit } =
    useMaterialData(id);
  const { submit, setSubmit } = useStopPropagationStore();
  const { isPending, startTransitionNoErrors } = useTransitionNoErrors(
    form,
    submit
  );

  const transformFormData = (values: TMaterialFormData): TMaterialFormData => {
    const newMaterialGroupId =
      materialGroups.find((groups) => groups.name === values.materialGroup.name)
        ?.id || values.materialGroupId;
    const newUnitId =
      units.find((units) => units.name === values.unit.name)?.id ||
      values.unitId;
    const newWarehouseId =
      warehouses.find(
        (warehouses) => warehouses.name === values.warehouse?.name
      )?.id || values?.warehouseId;

    return {
      ...values,
      materialGroupId: newMaterialGroupId,
      unitId: newUnitId,
      warehouseId: newWarehouseId,
    };
  };

  const onSubmit = async (values: TMaterialFormData) => {
    const transformedValues = transformFormData(values);

    startTransitionNoErrors(() => {
      handleMaterialSubmit(transformedValues, id, () => {
        router.refresh();
        if (!id) form.reset();
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
              translate={translateColumnsMaterials}
              isPending={isPending}
            />
          </div>
          <div className="grid gap-2">
            <FormFieldInput
              form={form}
              name="article"
              placeholder="Введите артикул материала"
              translate={translateColumnsMaterials}
              isPending={isPending}
            />
          </div>
          <div className="grid gap-2">
            <FormFieldSelect
              form={form}
              name="materialGroup.name"
              placeholder="Выберите группу"
              translate={translateColumnsMaterials}
              items={materialGroups}
              isPending={isPending}
            />
          </div>
          <div className="grid gap-2">
            <FormFieldSelect
              form={form}
              name="unit.name"
              placeholder="Выберите единицу измерения"
              translate={translateColumnsMaterials}
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
              translate={translateColumnsMaterials}
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
              translate={translateColumnsMaterials}
              isPending={isPending}
              type="number"
            />
          </div>
          <div className="grid gap-2">
            <FormFieldInput
              form={form}
              name="minBalance"
              placeholder="Введите минимальный остаток"
              translate={translateColumnsMaterials}
              isPending={isPending}
              type="number"
            />
          </div>
          <div className="grid gap-2">
            <FormFieldTextarea
              form={form}
              name="comment"
              placeholder="Введите комментарий"
              translate={translateColumnsMaterials}
              isPending={isPending}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};
