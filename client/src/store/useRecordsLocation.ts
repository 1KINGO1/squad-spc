import { create } from "zustand"

interface RecordsLocationState {
  listId: number,
  setListId: (listId: number) => void
  clanId: number,
  setClanId: (clanId: number) => void,
  clear: () => void
}

const useRecordsLocation = create<RecordsLocationState>((set) => ({
  listId: 0,
  setListId: (listId: number) => set({ listId }),
  clanId: 0,
  setClanId: (clanId: number) => set({ clanId }),
  clear: () => set({ listId: 0, clanId: 0 })
}))

export default useRecordsLocation;