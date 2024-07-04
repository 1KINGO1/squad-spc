import Users from "../screens/Users/Users";
import WithAuth from "../utils/WithAuth";

export default {
  path: "/users",
  element: <WithAuth><Users /></WithAuth>
}