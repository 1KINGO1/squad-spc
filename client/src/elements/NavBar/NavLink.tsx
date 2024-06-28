import { FC, PropsWithChildren } from "react";

import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";

import styles from "./NavBar.module.scss";

interface NavLinkProps {
  to: string;
}

const NavLink: FC<PropsWithChildren<NavLinkProps>> = ({to, children}) => {

  const location = useLocation();

  const isCurrentPage = location.pathname.startsWith("/" + to.replace(/^\//, ""));

  return (
    <li className={classNames(styles.link, {[styles.linkActive]: isCurrentPage})}>
      <Link to={to}>
        {children}
      </Link>
    </li>

  );
}

export default NavLink;