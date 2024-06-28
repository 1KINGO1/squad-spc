import { FC } from "react";

import { Avatar, Button, Spin } from "antd";

import styles from "./NavBar.module.scss";
import NavLink from "./NavLink";
import UserTag from "../../components/UserTag";
import useCurrentUser from "../../store/useCurrentUser";

const NavBar: FC = () => {

  const { user } = useCurrentUser();

  const isLoading = user == null;

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
              <UserTag role={user?.permission || null} />
            </div>
          </div>
          <div className={styles.userControls}>
            <Button type="primary">Change account</Button>
          </div>
        </div>
        <div className={styles.bottom}>
          <nav className={styles.linksWrapper}>
            <ul>
              <NavLink to="/clans">
                Clans
              </NavLink>
              <NavLink to="/records">
                Records
              </NavLink>
              <NavLink to="/users">
                Users
              </NavLink>
              <NavLink to="/limits">
                Limits
              </NavLink>
              <NavLink to="/settings">
                Settings
              </NavLink>
              <NavLink to="/something">
                Something
              </NavLink>
            </ul>
          </nav>
        </div>
      </Spin>
    </div>
  );
};

export default NavBar;