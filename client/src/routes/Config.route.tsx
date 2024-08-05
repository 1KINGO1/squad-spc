import { Roles } from "../types/Roles";
import WithAuth from "../utils/WithAuth";
import Config from "../screens/Config/Config";

export default {
  path: "/config",
  element: (
    <WithAuth
      allowedRoles={[Roles.Root]}
    >
      <Config />
    </WithAuth>
  )
};