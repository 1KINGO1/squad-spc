import { User } from "../../users/entity/User.entity";
import { CreateRecordDto } from "../dtos/create-record.dto";

export interface CreateRecordOptions extends CreateRecordDto{
  clanId: number;
  listId: number;
  user: User;
}