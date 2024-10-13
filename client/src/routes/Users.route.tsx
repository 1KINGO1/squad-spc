import { Roles } from "../types/Roles";
import WithAuth from "../utils/WithAuth";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading";

const Users = lazy(() => import("../screens/Users/Users"));

export default {
  path: "/users",
  element: (
    <WithAuth
      allowedRoles={[Roles.Admin, Roles.Root]}
    >
      <Suspense fallback={<Loading/>}>
        <Users />
      </Suspense>
    </WithAuth>
  )
}
