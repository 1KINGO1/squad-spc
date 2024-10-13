import { Roles } from "../types/Roles";
import WithAuth from "../utils/WithAuth";
import { lazy, Suspense } from "react";

const Records = lazy(() => import("../screens/Records/Records"));

const RecordsRoute = (
  <WithAuth excludedRoles={[Roles.Guest]}>
    <Suspense fallback={<div>Loading...</div>}>
      <Records />
    </Suspense>
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
