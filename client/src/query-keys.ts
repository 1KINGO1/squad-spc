const queryKeys: {
  [key: string]: (...args: any[]) => (string | number)[];
} = {
  clans(){
    return ["clans"];
  },
  lists(){
    return ["lists"];
  },
  listClans(listId?: number){
    if (listId === undefined) return ["lists", "clans"];
    return ["lists", "clans", listId];
  },
  records(listId: number, clanId: number){
    return ["records", "listId" + listId, "clanId" + clanId];
  }
}

export default queryKeys;