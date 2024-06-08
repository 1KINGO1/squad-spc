import { FC, PropsWithChildren } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.scss";
import classNames from "classnames";

interface NavLinkProps {
  to: string;
}

const NavLink: FC<PropsWithChildren<NavLinkProps>> = ({to, children}) => {

  let location = useLocation();

  const isCurrentPage = location.pathname === '/' + to.replace(/^\//, "");

  console.log(to, location.pathname, isCurrentPage);

  return (
    <li className={classNames(styles.link, {[styles.linkActive]: isCurrentPage})}>
      <Link to={to}>
        {children}
      </Link>
    </li>

  );
}

export default NavLink;