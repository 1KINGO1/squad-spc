import Clan from "../../types/Clans";

const localStorageKey = 'pinnedClans';

// returns id of clans
export function getPinnedClans(): number[] {
  const pinnedClans = localStorage.getItem(localStorageKey) || '[]';

  try {
    return JSON.parse(pinnedClans);
  }
  catch (e) {
    return [];
  }
}

export function pinClan({ id }: Clan): void {
  const pinnedClans = getPinnedClans();
  if (!pinnedClans.includes(id)) pinnedClans.push(id);
  localStorage.setItem(localStorageKey, JSON.stringify(pinnedClans));
}

export function unpinClan({ id }: Clan): void {
  const pinnedClans = getPinnedClans();
  const updatedPinnedClans = pinnedClans.filter((clanId: number) => clanId !== id);
  localStorage.setItem(localStorageKey, JSON.stringify(updatedPinnedClans));
}