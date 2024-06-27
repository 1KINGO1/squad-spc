import { Roles } from "../../../types/Roles";

const roleFilterOptions = Object
  .keys(Roles)
  .filter((key) => isNaN(Number(key)))
  .map((key) => (
    {
      label: key,
      value: Roles[key as keyof typeof Roles],
    }
  ));

export default roleFilterOptions;