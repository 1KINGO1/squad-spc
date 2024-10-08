import { Roles } from "../types/Roles";
import WithAuth from "../utils/WithAuth";
import Purchases from "../screens/Purchases/Purchases";

export default {
  path: "/purchases",
  element: (
    <WithAuth
      allowedRoles={[Roles.Admin, Roles.Root]}
    >
      <Purchases />
    </WithAuth>
  )
}
