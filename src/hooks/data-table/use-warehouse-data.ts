'use client';

import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import {
  TWarehouseFormData,
  WarehouseFormSchema,
} from '@/schemas/warehouse-form-schema';
import { warehouseAction } from '@/actions/warehouse';

import { getAllEntityGroupsData } from '@/data/entity-group';
import { getWarehouseByIdData } from '@/data/warehouse';
import { EntityGroupWithAdd } from '@/types/types';

import { useLoadingSelectStore } from '@/store/loading-select';
import { useDataTableStore } from '@/store/data-table';

const handleWarehouseSubmit = async (
  values: TWarehouseFormData,
  id?: number,
  onSuccess?: (count: number) => void
) => {
  try {
    const data = await warehouseAction(values, id);

    if (data?.error) {
      toast.error(data.error);
      return;
    }

    if (data?.success) {
      onSuccess?.(data.count ?? 0);
      toast.success(data.success);
    }
  } catch (error) {
    toast.error('Произошла ошибка при сохранении склада!');
    console.error('Ошибка отправки склада:', error);
  }
};

export const useWarehouseData = (id?: number) => {
  const [warehouseGroups, setWarehouseGroups] = useState<EntityGroupWithAdd[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  const { selectedIdGroup, selectedNameGroup } = useDataTableStore();

  const { setLoadingWarehouseGroups, loadingWarehouseGroups } =
    useLoadingSelectStore();

  const form = useForm<TWarehouseFormData>({
    resolver: zodResolver(WarehouseFormSchema),
    defaultValues: {
      name: '',
      shortName: '',
      comment: '',
      status: 'ACTIVE',
      warehouseGroupId: selectedIdGroup,
      warehouseGroup: {
        name: selectedNameGroup || 'Склады',
      },
    },
  });

  useEffect(() => {
    if (loadingWarehouseGroups) {
      const fetchWarehouseGroups = async () => {
        try {
          const data = await getAllEntityGroupsData('warehouseGroup');
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
  }, [
    loadingWarehouseGroups,
    selectedIdGroup,
    setLoadingWarehouseGroups,
    warehouseGroups,
  ]);

  const fetchWarehouseData = useCallback(async () => {
    try {
      setIsLoading(true);

      const warehouseGroupsData =
        await getAllEntityGroupsData('warehouseGroup');
      setWarehouseGroups(warehouseGroupsData);

      if (id) {
        const data = await getWarehouseByIdData(id);

        form.setValue('name', data?.name ?? '');
        form.setValue('shortName', data?.shortName ?? '');
        form.setValue('status', data?.status ?? 'ACTIVE');
        form.setValue('comment', data?.comment ?? '');
        form.setValue('warehouseGroupId', data?.warehouseGroupId ?? 0);
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
