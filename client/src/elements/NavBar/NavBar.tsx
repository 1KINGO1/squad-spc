import { FC } from "react";

import { Avatar, Button, Spin } from "antd";

import styles from "./NavBar.module.scss";
import NavLink from "./NavLink";
import UserTag from "../../components/UserTag";
import config from "../../config";
import useCurrentUser from "../../store/useCurrentUser";
import { Roles } from "../../types/Roles";

const NavBar: FC = () => {

  const { user } = useCurrentUser();

  const isLoading = user == null;

  const changeAccountHandler = () => {
    window.location.replace(config.apiBaseUrl + config.paths.auth.login);
  };

  return (
    <div className={styles.wrapper}>
      <Spin spinning={isLoading} className={styles.loading} delay={200}>
        <div className={styles.top}>
          <div className={styles.user}>
            <Avatar size={60} src={user?.avatar_url} className={styles.userAvatar}>
              {isLoading ? "L" : user?.username[0].toUpperCase()}
            </Avatar>
            <div>
              <p className={styles.userName}>
                {isLoading ? "Loading" : user?.username}
              </p>
              <UserTag role={user?.permission ?? null} />
            </div>
          </div>
          <div className={styles.userControls}>
            <Button type="primary" onClick={changeAccountHandler}>Change account</Button>
          </div>
        </div>
        <div className={styles.bottom}>
          <nav className={styles.linksWrapper}
               style={{ display: !isLoading && ![Roles.Guest].includes(user?.permission) ? "block" : "none" }}>
            <ul>
              <NavLink to="/" canAccess={[Roles.Root, Roles.Admin, Roles.ClanLeader]}>
                Home
              </NavLink>
              <NavLink to="/clans" canAccess={[Roles.Root, Roles.Admin, Roles.ClanLeader]}>
                Clans
              </NavLink>
              <NavLink to="/records" canAccess={[Roles.Root, Roles.Admin, Roles.ClanLeader]}>
                Records
              </NavLink>
              <NavLink to="/groups" canAccess={[Roles.Root, Roles.Admin]}>
                Groups
              </NavLink>
              <NavLink to="/users" canAccess={[Roles.Root, Roles.Admin]}>
                Users
              </NavLink>
              <NavLink to="/products" canAccess={[Roles.Root, Roles.Admin]}>
                Products
              </NavLink>
              <NavLink to="/config" canAccess={[Roles.Root]}>
                Config
              </NavLink>
            </ul>
          </nav>
        </div>
      </Spin>
    </div>
  );
};

export default NavBar;