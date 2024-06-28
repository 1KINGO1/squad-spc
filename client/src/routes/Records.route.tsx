import React from "react";

import Records from "../screens/Records/Records";

export default {
  path: "/records",
  element: <Records />,
  children: [
    {
      path: ":id",
      element: <Records />
    }
  ],
}