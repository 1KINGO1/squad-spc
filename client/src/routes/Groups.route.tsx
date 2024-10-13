import { Roles } from "../types/Roles";
import WithAuth from "../utils/WithAuth";
import { Suspense, lazy } from "react";
import Loading from "../components/Loading";

const Groups = lazy(() => import("../screens/Groups/Groups"));

export default {
  path: "/groups",
  element: (
    <WithAuth
      allowedRoles={[Roles.Admin, Roles.Root]}
    >
      <Suspense fallback={<Loading/>}>
        <Groups />
      </Suspense>
    </WithAuth>
  )
}
