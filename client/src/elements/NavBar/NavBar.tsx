import { FC } from "react";
import { Avatar, Button, Spin } from "antd";

import styles from "./NavBar.module.scss";
import NavLink from "./NavLink";
import useCurrentUser from "../../store/useCurrentUser";
import UserTag from "../../components/UserTag";

const NavBar: FC = () => {

  const { user } = useCurrentUser();

  const isLoading = user == null;

  return (
    <Spin spinning={isLoading} className={styles.loading} delay={200}>
      <div className={styles.wrapper}>
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
              <NavLink to="/">
                Home
              </NavLink>
              <NavLink to="/clans">
                Clans
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
      </div>
    </Spin>
  );
};

export default NavBar;