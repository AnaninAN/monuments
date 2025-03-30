import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { MaterialGroup, Unit, Warehouse } from '@prisma/client';

import { Api } from '@/services/api-client';
import {
  MaterialFormSchema,
  TMaterialFormData,
} from '@/schemas/material-form-schema';
import { material } from '@/actions/material';
import { useLoadingSelectStore } from '@/store/loading-select';

const handleMaterialSubmit = async (
  values: TMaterialFormData,
  id?: number,
  onSuccess?: () => void
) => {
  try {
    const data = await material(values, id);

    if (data?.error) {
      toast.error(data.error);
      return;
    }

    if (data?.success) {
      onSuccess?.();
      toast.success(data.success);
    }
  } catch (error) {
    toast.error('Произошла ошибка при сохранении склада!');
    console.error('Ошибка отправки склада:', error);
  }
};

export const useMaterialData = (id?: number) => {
  const [materialGroups, setMaterialGroups] = useState<MaterialGroup[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  const {
    loadingUnits,
    loadingMaterialGroups,
    loadingWarehouses,
    setLoadingMaterialGroups,
    setLoadingUnits,
    setLoadingWarehouses,
  } = useLoadingSelectStore();

  const form = useForm<TMaterialFormData>({
    resolver: zodResolver(MaterialFormSchema),
    defaultValues: {
      name: '',
      comment: '',
      article: '',
      minBalance: 0,
      priceIn: 0,
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

  useEffect(() => {
    const fetchData = async () => {
      if (loadingMaterialGroups) {
        try {
          const data = await Api.materialGroups.fetchAllMaterialGroups();
          setMaterialGroups(data);
        } catch (error) {
          console.error(
            'Ошибка при получении данных об группах материалов:',
            error
          );
          toast.error('Ошибка при загрузке групп материалов!');
        } finally {
          setLoadingMaterialGroups(false);
        }
      }

      if (loadingUnits) {
        try {
          const data = await Api.units.fetchAllUnits();
          setUnits(data);
        } catch (error) {
          console.error(
            'Ошибка при получении данных об единицах измерения:',
            error
          );
          toast.error('Ошибка при загрузке единиц измерения!');
        } finally {
          setLoadingUnits(false);
        }
      }

      if (loadingWarehouses) {
        try {
          const data = await Api.warehouses.fetchAllWarehouses();
          setWarehouses(data);
        } catch (error) {
          console.error('Ошибка при получении данных об складах:', error);
          toast.error('Ошибка при загрузке складов!');
        } finally {
          setLoadingWarehouses(false);
        }
      }
    };

    fetchData();
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
      const fetchMaterialData = async () => {
        try {
          const data = await Api.materials.fetchMaterialById(id);
          form.setValue('name', data.name);
          form.setValue('comment', data.comment);
          form.setValue('article', data.article);
          form.setValue('priceIn', data.priceIn);
          form.setValue('minBalance', data.minBalance);
          form.setValue('materialGroup.name', data.materialGroup.name);
          form.setValue('unit.name', data.unit.name);
          form.setValue('warehouse.name', data.warehouse?.name);
        } catch (error) {
          console.error('Ошибка при получении данных об материале:', error);
          toast.error('Ошибка при загрузке данных материала!');
        }
      };
      fetchMaterialData();
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

  return { form, handleMaterialSubmit, materialGroups, units, warehouses };
};
