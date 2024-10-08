import Products from "../screens/Products/Products";
import { Roles } from "../types/Roles";
import WithAuth from "../utils/WithAuth";
import { FC } from "react";
import useConfig from "../hooks/config/useConfig";

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
