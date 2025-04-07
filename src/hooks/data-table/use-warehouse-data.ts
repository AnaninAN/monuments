'use client';

import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import {
  TWarehouseFormData,
  WarehouseFormSchema,
} from '@/schemas/warehouse-form-schema';
import { warehouse } from '@/actions/warehouse';

import { getAllWarehouseGroups } from '@/data/warehouse-group';
import { getWarehouseById } from '@/data/warehouse';

import { useLoadingSelectStore } from '@/store/loading-select';
import { EntityGroup } from '@/data/dto/entity-group';

const handleWarehouseSubmit = async (
  values: TWarehouseFormData,
  id?: number,
  onSuccess?: () => void
) => {
  try {
    const data = await warehouse(values, id);

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

export const useWarehouseData = (id?: number) => {
  const [warehouseGroups, setWarehouseGroups] = useState<EntityGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { setLoadingWarehouseGroups, loadingWarehouseGroups } =
    useLoadingSelectStore();

  const form = useForm<TWarehouseFormData>({
    resolver: zodResolver(WarehouseFormSchema),
    defaultValues: {
      name: '',
      shortName: '',
      comment: '',
      status: 'ACTIVE',
      warehouseGroupId: 1,
      warehouseGroup: {
        name: 'Склады',
      },
    },
  });

  useEffect(() => {
    if (loadingWarehouseGroups) {
      const fetchWarehouseGroups = async () => {
        try {
          const data = await getAllWarehouseGroups();
          setWarehouseGroups(data);
        } catch (error) {
          console.error('Ошибка при загрузке групп складов:', error);
          toast.error('Ошибка при загрузке групп складов!');
        } finally {
          setLoadingWarehouseGroups(false);
        }
      };
      fetchWarehouseGroups();
    }
  }, [loadingWarehouseGroups, setLoadingWarehouseGroups]);

  const fetchWarehouseData = useCallback(async () => {
    try {
      setIsLoading(true);

      const warehouseGroupsData = await getAllWarehouseGroups();

      setWarehouseGroups(warehouseGroupsData);

      if (id) {
        const data = await getWarehouseById(id);

        form.setValue('name', data?.name ?? '');
        form.setValue('shortName', data?.shortName ?? '');
        form.setValue('status', data?.status ?? 'ACTIVE');
        form.setValue('comment', data?.comment ?? '');
        form.setValue('warehouseGroup.name', data?.warehouseGroup.name ?? '');
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных склада:', error);
      toast.error('Ошибка при загрузке данных склада!');
    } finally {
      setIsLoading(false);
    }
  }, [form, id]);

  useEffect(() => {
    fetchWarehouseData();
  }, [fetchWarehouseData]);

  const transformFormData = (
    values: TWarehouseFormData
  ): TWarehouseFormData => {
    const newWarehouseGroupId =
      warehouseGroups.find(
        (groups) => groups.name === values.warehouseGroup.name
      )?.id || values.warehouseGroupId;

    return {
      ...values,
      warehouseGroupId: newWarehouseGroupId,
    };
  };

  return {
    form,
    handleWarehouseSubmit,
    isLoading,
    transformFormData,
    warehouseGroups,
  };
};
