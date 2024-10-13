import { Roles } from "../types/Roles";
import WithAuth from "../utils/WithAuth";
import { Suspense, lazy } from "react";

const Clans = lazy(() => import("../screens/Clans/Clans"));

export default {
  path: "/clans",
  element: (
    <WithAuth
      excludedRoles={[Roles.Guest]}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Clans />
      </Suspense>
    </WithAuth>
  )
};
