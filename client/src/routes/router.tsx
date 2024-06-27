import { createBrowserRouter } from "react-router-dom";
import React from "react";

import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";

import ClansRoute from "./Clans.route";
import HomeRoute from "./Home.route";
import RecordsRoute from "./Records.route";
import UsersRoute from "./Users.route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      HomeRoute,
      ClansRoute,
      RecordsRoute,
      UsersRoute
    ]
  },
]);

export default router;