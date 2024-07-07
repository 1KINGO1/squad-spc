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
  created_date: string;
  expire_date: string | null;
}