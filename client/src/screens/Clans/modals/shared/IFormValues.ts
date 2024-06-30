export default interface IFormValues {
  name: string;
  tag: string;
  allowed_lists: number[];
  limits: {group: number, limit: number | undefined}[]
}