import { ExtendedUser } from '@/types/next-auth';
import { create } from 'zustand';

interface UserState {
  user: ExtendedUser | undefined;
}

interface UserActions {
  setUser: (user: ExtendedUser) => void;
}

export const useUserStore = create<UserState & UserActions>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
}));
