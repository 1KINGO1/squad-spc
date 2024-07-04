import Records from "../screens/Records/Records";
import WithAuth from "../utils/WithAuth";

export default {
  path: "/records",
  element: <WithAuth><Records /></WithAuth>,
  children: [
    {
      path: ":id",
      element: <WithAuth><Records /></WithAuth>
    }
  ],
}