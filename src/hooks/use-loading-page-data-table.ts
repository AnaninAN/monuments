import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useDataTableStore } from '@/store/data-table';
import { Entity, EntityGroupWithAdd } from '@/types/types';

type UseLoadingPageDataTableProps<T> = {
  getDataTable: (idGroup?: number) => Promise<T[] | []>;
  setDataTable: Dispatch<SetStateAction<T[]>>;
  entity?: Entity;
  getDataGroup?: (entity: Entity) => Promise<EntityGroupWithAdd[] | []>;
  setDataGroup?: Dispatch<SetStateAction<EntityGroupWithAdd[]>>;
};

export const useLoadingPageDataTable = <T>({
  getDataTable,
  setDataTable,
  entity,
  getDataGroup,
  setDataGroup,
}: UseLoadingPageDataTableProps<T>) => {
  const [isLoadingDataTable, setIsLoadingDataTable] = useState(true);
  const [isLoadingDataGroup, setIsLoadingDataGroup] = useState(true);

  const {
    selectedIdGroup,
    countDataTable,
    countGroup,
    setCountDataTable,
    setCountGroup,
    setSelectedIdGroup,
  } = useDataTableStore();

  useEffect(() => {
    return () => {
      setCountDataTable(0);
      setCountGroup(0);
      setSelectedIdGroup(1);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsLoadingDataTable(true);
    const fetchDataTable = async () => {
      const dataTable = await getDataTable(selectedIdGroup);
      setDataTable(dataTable);
      setCountDataTable(dataTable.length);
      setIsLoadingDataTable(false);
    };
    fetchDataTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIdGroup, countDataTable]);

  useEffect(() => {
    if (entity && getDataGroup && setDataGroup) {
      setIsLoadingDataGroup(true);
      const fetchDataGroup = async () => {
        const groupData = await getDataGroup(entity);
        setDataGroup(groupData);
        setCountGroup(groupData.length);
        setIsLoadingDataGroup(false);
      };
      fetchDataGroup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countGroup]);

  return { isLoadingDataTable, isLoadingDataGroup };
};
