import React, { FC, useEffect } from "react";

import { createBrowserRouter, Navigate } from "react-router-dom";

import ClansRoute from "./Clans.route";
import GroupsRoute from "./Groups.route";
import HomeRoute from "./Home.route";
import RecordsRoute from "./Records.route";
import UsersRoute from "./Users.route";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import ConfigRoute from "./Config.route";
import ProductsRoute from "./Products.route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      HomeRoute,
      ClansRoute,
      RecordsRoute,
      UsersRoute,
      GroupsRoute,
      ConfigRoute,
      ProductsRoute
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  }
]);

export default router;