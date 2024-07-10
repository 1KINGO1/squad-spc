import Groups from "../screens/Groups/Groups";
import WithAuth from "../utils/WithAuth";

export default {
  path: "/groups",
  element: <WithAuth><Groups /></WithAuth>
}