import { create } from 'zustand';

interface StopPropagationState {
  submit: boolean;
}

interface StopPropagationActions {
  setSubmit: (newFlag: boolean) => void;
}

export const useStopPropagationStore = create<
  StopPropagationState & StopPropagationActions
>((set) => ({
  submit: false,
  setSubmit: (newFlag) => set({ submit: newFlag }),
}));
