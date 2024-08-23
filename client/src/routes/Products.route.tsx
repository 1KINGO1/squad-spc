import Products from "../screens/Products/Products";
import { Roles } from "../types/Roles";
import WithAuth from "../utils/WithAuth";

export default {
  path: "/products",
  element: (
    <WithAuth
      allowedRoles={[Roles.Root]}
    >
      <Products />
    </WithAuth>
  )
};