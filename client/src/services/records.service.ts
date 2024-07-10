import config from "../config";
import Record from "../types/models/Record";
import axiosWithAuth from "../utils/axiosWithAuth";

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

interface DeleteRecord {
  recordId: number;
}
export async function deleteRecord(body: DeleteRecord): Promise<Record> {
  const { data } = await axiosWithAuth.delete(config.paths.records.delete(body.recordId));
  return data
}