import { create } from "zustand"

interface RecordsLocationState {
  listId: number,
  setListId: (listId: number) => void
  listsNotFoundError: boolean,
  setListsNotFoundError: (listsNotFoundError: boolean) => void,
  clanId: number,
  setClanId: (clanId: number) => void,
  clansNotFoundError: boolean,
  setClansNotFoundError: (clansNotFoundError: boolean) => void,
  clear: () => void
}

const useRecordsLocation = create<RecordsLocationState>((set) => ({
  listId: 0,
  setListId: (listId: number) => set({ listId }),
  listsNotFoundError: false,
  setListsNotFoundError: (listsNotFoundError: boolean) => set({ listsNotFoundError }),
  clanId: 0,
  setClanId: (clanId: number) => set({ clanId }),
  clansNotFoundError: false,
  setClansNotFoundError: (clansNotFoundError: boolean) => set({ clansNotFoundError }),
  clear: () => set({ listId: 0, clanId: 0 })
}))

export default useRecordsLocation;