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
  expiration_date: string | null;
}