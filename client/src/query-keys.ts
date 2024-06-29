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
  }
}

export default queryKeys;