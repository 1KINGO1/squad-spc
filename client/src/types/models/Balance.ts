import User from "./User";

export default interface Balance {
  id: number;
  balance: number;
  user: User;
}
