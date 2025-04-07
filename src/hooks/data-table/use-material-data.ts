import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Unit, Warehouse } from '@prisma/client';

import {
  MaterialFormSchema,
  TMaterialFormData,
} from '@/schemas/material-form-schema';
import { material } from '@/actions/material';
import { useLoadingSelectStore } from '@/store/loading-select';
import { getAllMaterialGroups } from '@/data/material-group';
import { getAllUnits } from '@/data/unit';
import { getAllWarehouses } from '@/data/warehouse';
import { getMaterialById } from '@/data/material';
import { EntityGroup } from '@/data/dto/entity-group';

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
    toast.error('Произошла ошибка при сохранении материала!');
    console.error('Ошибка отправки материала:', error);
  }
};

export const useMaterialData = (id?: number) => {
  const [materialGroups, setMaterialGroups] = useState<EntityGroup[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    setLoadingMaterialGroups,
    setLoadingUnits,
    setLoadingWarehouses,
    loadingMaterialGroups,
    loadingUnits,
    loadingWarehouses,
  } = useLoadingSelectStore();

  const form = useForm<TMaterialFormData>({
    resolver: zodResolver(MaterialFormSchema),
    defaultValues: {
      name: '',
      comment: '',
      article: '',
      minBalance: 0,
      priceIn: 0,
      materialGroupId: 1,
      materialGroup: {
        name: 'Материалы',
      },
      unitId: 0,
      unit: {
        name: '',
      },
      warehouseId: null,
      warehouse: {
        name: '',
      },
    },
  });

  useEffect(() => {
    if (loadingMaterialGroups) {
      const fetchMaterialGroups = async () => {
        try {
          const data = await getAllMaterialGroups();
          setMaterialGroups(data);
        } catch (error) {
          console.error('Ошибка при загрузке групп материалов:', error);
          toast.error('Ошибка при загрузке групп материалов!');
        } finally {
          setLoadingMaterialGroups(false);
        }
      };
      fetchMaterialGroups();
    }
  }, [loadingMaterialGroups, setLoadingMaterialGroups]);

  useEffect(() => {
    if (loadingUnits) {
      const fetchUnits = async () => {
        try {
          const data = await getAllUnits();
          setUnits(data);
        } catch (error) {
          console.error('Ошибка при загрузке единиц измерения:', error);
          toast.error('Ошибка при загрузке единиц измерения!');
        } finally {
          setLoadingUnits(false);
        }
      };
      fetchUnits();
    }
  }, [loadingUnits, setLoadingUnits]);

  useEffect(() => {
    if (loadingWarehouses) {
      const fetchWarehouses = async () => {
        try {
          const data = await getAllWarehouses();
          setWarehouses(data);
        } catch (error) {
          console.error('Ошибка при загрузке складов:', error);
          toast.error('Ошибка при загрузке складов!');
        } finally {
          setLoadingWarehouses(false);
        }
      };
      fetchWarehouses();
    }
  }, [loadingWarehouses, setLoadingWarehouses]);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);

      const [materialGroupsData, unitsData, warehousesData] = await Promise.all(
        [getAllMaterialGroups(), getAllUnits(), getAllWarehouses()]
      );

      setMaterialGroups(materialGroupsData);
      setUnits(unitsData);
      setWarehouses(warehousesData);

      if (id) {
        const materialData = await getMaterialById(id);

        form.setValue('name', materialData?.name ?? '');
        form.setValue('comment', materialData?.comment ?? '');
        form.setValue('article', materialData?.article ?? '');
        form.setValue('priceIn', materialData?.priceIn ?? 0);
        form.setValue('minBalance', materialData?.minBalance ?? 0);
        form.setValue(
          'materialGroup.name',
          materialData?.materialGroup.name ?? ''
        );
        form.setValue('unit.name', materialData?.unit.name ?? '');
        form.setValue('warehouse.name', materialData?.warehouse?.name ?? '');
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
      toast.error('Ошибка при загрузке данных!');
    } finally {
      setIsLoading(false);
    }
  }, [form, id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  return {
    form,
    handleMaterialSubmit,
    materialGroups,
    units,
    warehouses,
    transformFormData,
    isLoading,
  };
};
