const queryKeys: {
  [key: string]: () => (string | number)[];
} = {
  clans(){
    return ["clans"];
  },
  lists(){
    return ["lists"];
  }
}

export default queryKeys;