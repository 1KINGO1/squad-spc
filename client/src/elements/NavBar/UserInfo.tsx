import { FC } from "react";
import styles from "./NavBar.module.scss";
import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
import useCurrentUser from "../../store/useCurrentUser";
import { Roles } from "../../types/Roles";

const UserInfo: FC = () => {
  const { user } = useCurrentUser();

  return (
    <Box className={styles.userInfoWrapper}>
      <Avatar alt={user?.username + 'Avatar'}
              src={user?.avatar_url}
              style={{ visibility: !!user?.username ? 'visible' : 'hidden'}}
      />
      <Box style={{ visibility: !!user?.username ? 'visible' : 'hidden'}}>
        <Typography id={styles.username}>
          {user?.username || "Loading"}
        </Typography>
        <Typography id={styles.userRole}>
          {user?.permission ? Roles[user?.permission] : "Loading"}
        </Typography>
      </Box>

      {!user?.username ? <Box className={styles.loading}>
        <CircularProgress/>
      </Box> : null}
    </Box>
  );
};

export default UserInfo;