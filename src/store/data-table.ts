import { create } from 'zustand';

type DataTableState<TData> = {
  dataTable: TData[] | [];
};

type DataTableActions<TData> = {
  setDataTable: (dataTable: TData[]) => void;
};

export const useDataTableStore = <TData>(initialData: TData[]) => {
  return create<DataTableState<TData> & DataTableActions<TData>>((set) => ({
    dataTable: initialData,
    setDataTable: (dataTable: TData[]) => set({ dataTable }),
  }));
};
