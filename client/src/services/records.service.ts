import config from "../config";
import axiosWithAuth from "../utils/axiosWithAuth";

interface GetRecordsArgs {
  listId: number;
  clanId: number;
}
export async function getRecords({ listId, clanId }: GetRecordsArgs) {
  const { data } = await axiosWithAuth(config.paths.records.index(listId, clanId));
  return data
}