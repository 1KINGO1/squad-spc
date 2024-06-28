import { FC } from "react";

import { Avatar } from "antd";

import ManageUser from "./components/ManageUser";
import styles from "./Users.module.scss";
import UserTag from "../../components/UserTag";
import { default as IUser } from "../../types/models/User";

interface UserProps {
  user: IUser
}

const User: FC<UserProps> = ({user}) => {
  return (
    <div className={styles.userWrapper}>
      <div className={styles.userInfoWrapper}>
        <Avatar src={user.avatar_url} className={styles.userAvatar}/>
        <div>
          <span className={styles.userName}>{user.username} <UserTag role={user.permission} /></span>
          <span className={styles.userSteamId}>{user.steam_id}</span>
        </div>
      </div>
      <div className={styles.usersControlsWrapper}>
        <ManageUser user={user}/>
      </div>
    </div>
  )
}

export default User;