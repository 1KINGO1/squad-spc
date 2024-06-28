import { create } from "zustand"

import * as pinnedClanService from "../services/storage/clan-pin.service";
import Clan from "../types/models/Clans";

interface PinnedClansState {
  pinnedClanIds: number[];
  pinClan: (clan: Clan) => void;
  unpinClan: (clan: Clan) => void;
}

const usePinnedClans = create<PinnedClansState>((set) => ({
  pinnedClanIds: pinnedClanService.getPinnedClans(),
  pinClan: (clan: Clan) => {
    pinnedClanService.pinClan(clan);
    set(state => ({ pinnedClanIds: [...state.pinnedClanIds, clan.id] }));
  },
  unpinClan: (clan: Clan) => {
    pinnedClanService.unpinClan(clan);
    set(state => ({ pinnedClanIds: state.pinnedClanIds.filter(id => id !== clan.id) }));
  }
}))

export default usePinnedClans;