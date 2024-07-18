import Records from "../screens/Records/Records";
import WithAuth from "../utils/WithAuth";
import { Roles } from "../types/Roles";

const RecordsRoute = (
  <WithAuth excludedRoles={[Roles.Guest]}>
    <Records />
  </WithAuth>
)

export default {
  path: "/records",
  element: RecordsRoute,
  children: [
    {
      path: ":id",
      element: RecordsRoute
    }
  ],
}