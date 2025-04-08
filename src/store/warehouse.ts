import { create } from 'zustand';

import { WarehouseWithAdd } from '@/data/dto/warehouse';

interface WarehouseState {
  warehouses: WarehouseWithAdd[] | [];
}

interface WarehouseActions {
  setWarehouses: (warehouses: WarehouseWithAdd[]) => void;
}

export const useWarehouseStore = create<WarehouseState & WarehouseActions>(
  (set) => ({
    warehouses: [],
    setWarehouses: (warehouses) => set({ warehouses }),
  })
);
