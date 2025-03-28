'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MaterialGroup, Unit, Warehouse } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Form } from '@/components/ui/form';
import { FormHeader } from '@/components/data-table/forms/form-header';
import {
  FormFieldInput,
  FormFieldSelect,
  FormFieldTextarea,
} from '@/components/data-table/forms/form-field';
import { UnitForm } from '@/components/data-table/forms/unit-form';

import {
  MaterialFormSchema,
  TMaterialFormData,
} from '@/schemas/material-form-schema';
import { material } from '@/actions/material';
import { Api } from '@/services/api-client';
import { translateColumnsMaterials } from '@/lib/data-table/translate-colums-header';
import { useMaterialSelectStore } from '@/store/material-select';
import { useTransitionNoErrors } from '@/hooks/use-transition-no-errors';

export const MaterialForm = ({ id }: { id?: number }) => {
  const form = useForm<TMaterialFormData>({
    resolver: zodResolver(MaterialFormSchema),
    defaultValues: {
      name: '',
      comment: '',
      article: '',
      minBalance: undefined,
      priceIn: undefined,
      materialGroupId: 0,
      materialGroup: {
        name: '',
      },
      unitId: 0,
      unit: {
        name: '',
      },
      warehouseId: null,
      warehouse: { name: '' },
    },
  });

  const router = useRouter();
  const {
    loadingUnits,
    loadingMaterialGroups,
    loadingWarehouses,
    setLoadingMaterialGroups,
    setLoadingUnits,
    setLoadingWarehouses,
  } = useMaterialSelectStore();

  const [materialGroups, setMaterialGroups] = useState<MaterialGroup[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  const { isPending, startTransitionNoErrors } = useTransitionNoErrors(form);

  useEffect(() => {
    if (loadingMaterialGroups) {
      (async function () {
        const data = await Api.materialGroups.fetchAllMaterialGroups();
        setMaterialGroups(data);
      })();
      setLoadingMaterialGroups(false);
    }

    if (loadingUnits) {
      (async function () {
        const data = await Api.units.fetchAllUnits();
        setUnits(data);
      })();
      setLoadingUnits(false);
    }

    if (loadingWarehouses) {
      (async function () {
        const data = await Api.warehouses.fetchAllWarehouses();
        setWarehouses(data);
      })();
      setLoadingWarehouses(false);
    }
  }, [
    loadingMaterialGroups,
    loadingUnits,
    loadingWarehouses,
    setLoadingMaterialGroups,
    setLoadingUnits,
    setLoadingWarehouses,
  ]);

  useEffect(() => {
    if (id) {
      (async function () {
        const data = await Api.materials.fetchMaterialById(id);

        form.setValue('name', data.name);
        form.setValue('comment', data.comment);
        form.setValue('article', data.article);
        form.setValue('priceIn', data.priceIn);
        form.setValue('minBalance', data.minBalance);
        form.setValue('materialGroup.name', data.materialGroup.name);
        form.setValue('unit.name', data.unit.name);
        form.setValue('warehouse.name', data.warehouse?.name);
      })();
    }

    return () => {
      setLoadingMaterialGroups(true);
      setLoadingUnits(true);
      setLoadingWarehouses(true);
    };
  }, [
    form,
    id,
    setLoadingMaterialGroups,
    setLoadingUnits,
    setLoadingWarehouses,
  ]);

  const onSubmit = async (values: TMaterialFormData) => {
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

    const newValues: typeof values = {
      ...values,
      materialGroupId: newMaterialGroupId,
      unitId: newUnitId,
      warehouseId: newWarehouseId,
    };

    startTransitionNoErrors(() => {
      material(newValues, id)
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
          isPending={isPending}
          title="материал"
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
            />
          </div>
        </div>
      </form>
    </Form>
  );
};
