import { Roles } from "../types/Roles";
import WithAuth from "../utils/WithAuth";
import { Suspense, lazy } from "react";

const Groups = lazy(() => import("../screens/Groups/Groups"));

export default {
  path: "/groups",
  element: (
    <WithAuth
      allowedRoles={[Roles.Admin, Roles.Root]}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Groups />
      </Suspense>
    </WithAuth>
  )
}
