import config from "../config";
import axiosWithAuth from "../utils/axiosWithAuth";
import Record from "../types/models/Record";

interface GetRecordsArgs {
  listId: number;
  clanId: number;
}
export async function getRecords({ listId, clanId }: GetRecordsArgs) {
  const { data } = await axiosWithAuth(config.paths.records.index(listId, clanId));
  return data
}


interface CreateRecord {
  listId: number;
  clanId: number;
  username: string;
  steam_id: string;
  expire_date?: Date;
  group_id: number;
}
export async function createRecord(body: CreateRecord): Promise<Record> {
  const { data } = await axiosWithAuth.post(config.paths.records.create(body.listId, body.clanId), {
    username: body.username,
    steam_id: body.steam_id,
    expire_date: body.expire_date?.toISOString(),
    group_id: body.group_id
  });
  return data
}