import { create } from 'zustand';

interface CounterpartySelectState {
  loadingCounterpartyTypes: boolean;
}

interface CounterpartySelectActions {
  setloadingCounterpartyTypes: (newFlag: boolean) => void;
}

export const useCounterpartySelectStore = create<
  CounterpartySelectState & CounterpartySelectActions
>((set) => ({
  loadingCounterpartyTypes: true,
  setloadingCounterpartyTypes: (newFlag) =>
    set({ loadingCounterpartyTypes: newFlag }),
}));
