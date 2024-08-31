import { FC, PropsWithChildren } from "react";

import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";

import styles from "./NavBar.module.scss";
import useCurrentUser from "../../store/useCurrentUser";
import { Roles } from "../../types/Roles";

interface NavLinkProps {
  to: string;
  canAccess?: Roles[];
}

const NavLink: FC<PropsWithChildren<NavLinkProps>> = ({to, children, canAccess = []}) => {
  const location = useLocation();
  const {user} = useCurrentUser();

  const isCurrentPage = to === "/" ? to === location.pathname : location.pathname.startsWith("/" + to.replace(/^\//, ""));

  return (
    canAccess.length > 0 && !canAccess.includes(user?.permission ?? Roles.Guest) ? null :
    <li className={classNames(styles.link, {[styles.linkActive]: isCurrentPage})}>
      <Link to={to}>
        {children}
      </Link>
    </li>
  );
}

export default NavLink;