import {
  AppBar,
  Box,
} from "@mui/material";
import UserInfo from "./UserInfo";
import NavBarList from "./NavBarList";

import styles from "./NavBar.module.scss";

const NavBar = () => {
  return (
    <AppBar position="static" id={styles.appBar}>
      <Box className={styles.listWrapper}>
        <NavBarList />
        <UserInfo />
      </Box>
    </AppBar>
  );
};

export default NavBar;