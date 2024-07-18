import Clans from "../screens/Clans/Clans";
import { Roles } from "../types/Roles";
import WithAuth from "../utils/WithAuth";

export default {
  path: "/clans",
  element: (
    <WithAuth
      excludedRoles={[Roles.Guest]}
    >
      <Clans />
    </WithAuth>
  )
};