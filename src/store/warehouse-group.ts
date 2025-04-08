import { create } from 'zustand';

import { EntityGroup } from '@/data/dto/entity-group';

interface WarehouseGroupState {
  warehouseGroups: EntityGroup[] | [];
}

interface WarehouseGroupActions {
  setWarehouseGroups: (warehouseGroups: EntityGroup[]) => void;
}

export const useWarehouseGroupStore = create<
  WarehouseGroupState & WarehouseGroupActions
>((set) => ({
  warehouseGroups: [],
  setWarehouseGroups: (warehouseGroups) => set({ warehouseGroups }),
}));

export type WarehouseGroupStoreType = ReturnType<typeof useWarehouseGroupStore>;
