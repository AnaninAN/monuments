import { create } from 'zustand';

interface MaterialSelectState {
  loadingUnits: boolean;
  loadingMaterialGroups: boolean;
  loadingWarehouses: boolean;
}

interface MaterialSelectActions {
  setLoadingUnits: (newFlag: boolean) => void;
  setLoadingMaterialGroups: (newFlag: boolean) => void;
  setLoadingWarehouses: (newFlag: boolean) => void;
}

export const useMaterialSelectStore = create<
  MaterialSelectState & MaterialSelectActions
>((set) => ({
  loadingUnits: true,
  loadingMaterialGroups: true,
  loadingWarehouses: true,
  setLoadingUnits: (newFlag) => set({ loadingUnits: newFlag }),
  setLoadingMaterialGroups: (newFlag) =>
    set({ loadingMaterialGroups: newFlag }),
  setLoadingWarehouses: (newFlag) => set({ loadingWarehouses: newFlag }),
}));
