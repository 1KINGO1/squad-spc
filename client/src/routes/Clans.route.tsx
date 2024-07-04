import Clans from "../screens/Clans/Clans";
import WithAuth from "../utils/WithAuth";

export default {
  path: "/clans",
  element: <WithAuth><Clans /></WithAuth>,
}