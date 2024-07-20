import Records from "../screens/Records/Records";
import { Roles } from "../types/Roles";
import WithAuth from "../utils/WithAuth";

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