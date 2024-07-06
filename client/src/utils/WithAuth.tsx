import { FC, PropsWithChildren } from "react";

import { Navigate} from "react-router-dom";

import useCurrentUser from "../store/useCurrentUser";
import { Roles } from "../types/Roles";

const WithAuth: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useCurrentUser();

  if (!user) {
    return (<>Loading...</>);
  }

  if ([Roles.Guest].includes(user.permission)) {
    return (<Navigate to={"/"} replace/>)
  }

  return (
    <>
      {children}
    </>
  );
};

export default WithAuth;