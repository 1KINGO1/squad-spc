export default interface Record {
  id: number;
  username: string;
  steam_id: string;
  group: {
    id: number;
    name: string;
  };
  author: {
    id: number;
    username: string;
  }
  create_date: Date;
  expire_date: string | null;
}