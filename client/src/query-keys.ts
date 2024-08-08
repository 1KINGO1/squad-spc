const queryKeys: {
  [key: string]: (...args: any[]) => (string | number)[];
} = {
  clans(){
    return ["clans"];
  },
  clanLimits(clanId: number){
    return ["clans", "limits", clanId];
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
  },
  groups(){
    return ["groups"];
  },
  permissions(){
    return ["permissions"];
  },
  users(){
    return ["users"];
  },
  config() {
    return ["config"];
  },
  configSettings(){
    return ["configSettings"];
  },
  balance(){
    return ["balance"];
  }
}

export default queryKeys;