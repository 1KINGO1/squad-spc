import useCurrentUser from "../../store/useCurrentUser";
import { Roles } from "../../types/Roles";

const useIsAdmin = () => {
  const {user} = useCurrentUser();

  return [Roles.Admin, Roles.Root].includes(user?.permission ?? Roles.Guest);
}

export default useIsAdmin;