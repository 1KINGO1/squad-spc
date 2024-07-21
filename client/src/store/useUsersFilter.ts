import { create } from "zustand"
import { Roles } from "../types/Roles";

interface UsersFilterState {
  roles: Roles[],
  setRoles: (roles: Roles[]) => void,
  searchValue: string,
  setSearchValue: (searchValue: string) => void,
  clear: () => void
}

const useUsersFilter = create<UsersFilterState>((set) => ({
  roles: [],
  setRoles: (roles: Roles[]) => set({ roles }),
  searchValue: "",
  setSearchValue: (searchValue: string) => set({ searchValue }),
  clear: () => set({ roles: [] })
}))

export default useUsersFilter;