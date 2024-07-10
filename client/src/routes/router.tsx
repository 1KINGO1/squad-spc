import React from "react";

import { createBrowserRouter } from "react-router-dom";


import ClansRoute from "./Clans.route";
import GroupsRoute from "./Groups.route";
import HomeRoute from "./Home.route";
import RecordsRoute from "./Records.route";
import UsersRoute from "./Users.route";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      HomeRoute,
      ClansRoute,
      RecordsRoute,
      UsersRoute,
      GroupsRoute
    ]
  },
]);

export default router;