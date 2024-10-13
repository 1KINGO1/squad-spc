import { Roles } from "../types/Roles";
import WithAuth from "../utils/WithAuth";
import { lazy, Suspense } from "react";

const Users = lazy(() => import("../screens/Users/Users"));

export default {
  path: "/users",
  element: (
    <WithAuth
      allowedRoles={[Roles.Admin, Roles.Root]}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Users />
      </Suspense>
    </WithAuth>
  )
}
