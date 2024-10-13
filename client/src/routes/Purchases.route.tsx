import { Roles } from "../types/Roles";
import WithAuth from "../utils/WithAuth";
import { lazy, Suspense } from "react";

const Purchases = lazy(() => import("../screens/Purchases/Purchases"));

export default {
  path: "/purchases",
  element: (
    <WithAuth
      allowedRoles={[Roles.Admin, Roles.Root]}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Purchases />
      </Suspense>
    </WithAuth>
  )
}
