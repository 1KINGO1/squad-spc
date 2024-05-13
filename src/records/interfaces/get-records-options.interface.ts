import { User } from "../../users/entity/User.entity";

export interface GetRecordsOptionsInterface {
  user: User,
  clanId: number,
  listId: number
}