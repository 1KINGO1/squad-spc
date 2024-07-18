import Groups from "../screens/Groups/Groups";
import { Roles } from "../types/Roles";
import WithAuth from "../utils/WithAuth";

export default {
  path: "/groups",
  element: (
    <WithAuth
      allowedRoles={[Roles.Admin, Roles.Root]}
    >
      <Groups />
    </WithAuth>
  )
}