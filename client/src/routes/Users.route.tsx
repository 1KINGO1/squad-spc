import Users from "../screens/Users/Users";
import { Roles } from "../types/Roles";
import WithAuth from "../utils/WithAuth";

export default {
  path: "/users",
  element: (
    <WithAuth 
      allowedRoles={[Roles.Admin, Roles.Root]}
    >
      <Users />
    </WithAuth>
  )
}