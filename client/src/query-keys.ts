import { GetAllPurchasesParams } from "./services/purchases.service";

const queryKeys: {
  [key: string]: (...args: any[]) => (any)[];
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
  },
  userBalance(steamId: string){
    return ["balance", "steamId" + steamId];
  },
  products(){
    return ["products"]
  },
  activePurchases(){
    return ["activePurchases"];
  },
  allPurchases(params: GetAllPurchasesParams){
    return ["allPurchases", params];
  }
}

export default queryKeys;
