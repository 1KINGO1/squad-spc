import { create } from "zustand"

interface RecordsLocationState {
  listId: number | null,
  setListId: (listId: number) => void
  clanId: number | null,
  setClanId: (clanId: number) => void,
  clear: () => void
}

const useRecordsLocation = create<RecordsLocationState>((set) => ({
  listId: null,
  setListId: (listId: number) => set({ listId }),
  clanId: null,
  setClanId: (clanId: number) => set({ clanId }),
  clear: () => set({ listId: null, clanId: null })
}))

export default useRecordsLocation;