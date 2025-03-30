import { create } from 'zustand';

interface LoadingSelectState {
  loadingUnits: boolean;
  loadingMaterialGroups: boolean;
  loadingWarehouses: boolean;
  loadingCounterpartyTypes: boolean;
}

interface LoadingSelectActions {
  setLoadingUnits: (newFlag: boolean) => void;
  setLoadingMaterialGroups: (newFlag: boolean) => void;
  setLoadingWarehouses: (newFlag: boolean) => void;
  setloadingCounterpartyTypes: (newFlag: boolean) => void;
}

export const useLoadingSelectStore = create<
  LoadingSelectState & LoadingSelectActions
>((set) => ({
  loadingUnits: true,
  loadingMaterialGroups: true,
  loadingWarehouses: true,
  loadingCounterpartyTypes: true,
  setLoadingUnits: (newFlag) => set({ loadingUnits: newFlag }),
  setLoadingMaterialGroups: (newFlag) =>
    set({ loadingMaterialGroups: newFlag }),
  setLoadingWarehouses: (newFlag) => set({ loadingWarehouses: newFlag }),
  setloadingCounterpartyTypes: (newFlag) =>
    set({ loadingCounterpartyTypes: newFlag }),
}));
