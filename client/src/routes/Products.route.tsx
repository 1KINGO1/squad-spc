import { Roles } from "../types/Roles";
import WithAuth from "../utils/WithAuth";
import { lazy, Suspense } from "react";

const Products = lazy(() => import("../screens/Products/Products"));

export default {
  path: "/products",
  element: (
    <WithAuth
      allowedRoles={[Roles.Root]}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Products />
      </Suspense>
    </WithAuth>
  )
};
