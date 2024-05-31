import { create } from 'zustand'
import User from '../types/User';

interface CurrentUserState {
  user: User | null;
  setUser: (user: User) => void;
}

const useCurrentUser = create<CurrentUserState>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
}))

export default useCurrentUser;