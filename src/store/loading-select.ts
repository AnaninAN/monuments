import { create } from 'zustand';

interface LoadingSelectState {
  loadingUnits: boolean;
  loadingMaterialGroups: boolean;
  loadingWarehouseGroups: boolean;
  loadingWarehouses: boolean;
  loadingCounterpartyTypes: boolean;
}

interface LoadingSelectActions {
  setLoadingUnits: (newFlag: boolean) => void;
  setLoadingMaterialGroups: (newFlag: boolean) => void;
  setLoadingWarehouseGroups: (newFlag: boolean) => void;
  setLoadingWarehouses: (newFlag: boolean) => void;
  setloadingCounterpartyTypes: (newFlag: boolean) => void;
}

export const useLoadingSelectStore = create<
  LoadingSelectState & LoadingSelectActions
>((set) => ({
  loadingUnits: false,
  loadingMaterialGroups: false,
  loadingWarehouses: false,
  loadingCounterpartyTypes: false,
  loadingWarehouseGroups: false,
  setLoadingUnits: (newFlag) => set({ loadingUnits: newFlag }),
  setLoadingMaterialGroups: (newFlag) =>
    set({ loadingMaterialGroups: newFlag }),
  setLoadingWarehouses: (newFlag) => set({ loadingWarehouses: newFlag }),
  setloadingCounterpartyTypes: (newFlag) =>
    set({ loadingCounterpartyTypes: newFlag }),
  setLoadingWarehouseGroups: (newFlag) =>
    set({ loadingWarehouseGroups: newFlag }),
}));
