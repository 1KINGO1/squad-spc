import { Suspense, lazy } from "react";
import { Roles } from "../types/Roles";
import WithAuth from "../utils/WithAuth";
import Loading from "../components/Loading";

const Config = lazy(() => import("../screens/Config/Config"));

export default {
  path: "/config",
  element: (
    <WithAuth
      allowedRoles={[Roles.Root]}
    >
      <Suspense fallback={<Loading/>}>
        <Config />
      </Suspense>
    </WithAuth>
  )
};
