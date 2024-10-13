import { Roles } from "../types/Roles";
import WithAuth from "../utils/WithAuth";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading";

const Purchases = lazy(() => import("../screens/Purchases/Purchases"));

export default {
  path: "/purchases",
  element: (
    <WithAuth
      allowedRoles={[Roles.Admin, Roles.Root]}
    >
      <Suspense fallback={<Loading/>}>
        <Purchases />
      </Suspense>
    </WithAuth>
  )
}
