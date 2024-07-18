import { FC, PropsWithChildren } from "react";

import { Navigate} from "react-router-dom";

import useCurrentUser from "../store/useCurrentUser";
import { Roles } from "../types/Roles";

interface WithAuthProps {
  allowedRoles?: Roles[];
  excludedRoles?: Roles[];
}

const WithAuth: FC<PropsWithChildren<WithAuthProps>> = ({ children, allowedRoles, excludedRoles }) => {
  const { user } = useCurrentUser();

  if (!user) {
    return (<>Loading...</>);
  }

  if (allowedRoles) {
    if (!allowedRoles.includes(user.permission)) {
      return (<Navigate to={"/"} replace/>)
    }
  }
  else if (excludedRoles) {
    if (excludedRoles.includes(user.permission)) {
      return (<Navigate to={"/"} replace/>)
    }
  }

  return (
    <>
      {children}
    </>
  );
};

export default WithAuth;