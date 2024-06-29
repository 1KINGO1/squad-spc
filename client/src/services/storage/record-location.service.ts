const localStorageKey = "record-location";

interface RecordLocation {
  listId?: number;
  clanId?: number;
}

export const getRecordLocation = (): RecordLocation => {
  const data = JSON.parse(localStorage.getItem(localStorageKey) || "{}");

  return {
    listId: data.listId ?? undefined,
    clanId: data.clanId ?? undefined
  };
}

export const setRecordLocation = (listId?: number | null, clanId?: number | null) => {
  localStorage.setItem(localStorageKey, JSON.stringify({listId: listId ?? undefined, clanId: clanId ?? undefined}));
}