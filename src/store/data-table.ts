import { create } from 'zustand';

interface DataTableState {
  selectedIdGroup: number;
  selectedNameGroup: string;
  countDataTable: number;
  countGroup: number;
}

interface DataTableActions {
  setSelectedIdGroup: (newIdGroup: number) => void;
  setSelectedNameGroup: (newNameGroup: string) => void;
  setCountGroup: (newCountGroup: number) => void;
  setCountDataTable: (newCountDataTable: number) => void;
}

export const useDataTableStore = create<DataTableState & DataTableActions>(
  (set) => ({
    selectedIdGroup: 1,
    selectedNameGroup: '',
    countGroup: 0,
    countDataTable: 0,
    setSelectedIdGroup: (newIdGroup) => set({ selectedIdGroup: newIdGroup }),
    setSelectedNameGroup: (newNameGroup) =>
      set({ selectedNameGroup: newNameGroup }),
    setCountGroup: (newCountGroup) => set({ countGroup: newCountGroup }),
    setCountDataTable: (newCountDataTable) =>
      set({ countDataTable: newCountDataTable }),
  })
);
