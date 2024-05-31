import { FC } from "react";
import NavBarItem from "./NavBarItem";
import CastleIcon from "@mui/icons-material/Castle";
import styles from "./NavBar.module.scss";
import ListIcon from "@mui/icons-material/List";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import { Box, CircularProgress, Divider, List } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import useCurrentUser from "../../store/useCurrentUser";

const NavBarList: FC = () => {

  const { user } = useCurrentUser();

  return (
    <List className={styles.listWrapper}>
      {user?.username ? (
        <>
          <NavBarItem
            icon={<CastleIcon className={styles.listItemIcon}/>}
            title="Clans"
            path="clans"
          />
          <NavBarItem
            icon={<ListIcon className={styles.listItemIcon} />}
            title="Lists"
            path="lists"
          />
          <NavBarItem
            icon={<PeopleAltIcon className={styles.listItemIcon} />}
            title="Permissions"
            path="permissions"
          />
          <NavBarItem
            icon={<PersonIcon className={styles.listItemIcon} />}
            title="Users"
            path="users"
          />
          <Divider className={styles.divider} />
          <NavBarItem
            icon={<SettingsIcon className={styles.listItemIcon} />}
            title="Settings"
            path="settings"
          />
        </>
      ) : (
        <Box className={styles.loading}>
          <CircularProgress />
        </Box>
      )}
    </List>
  );
};

export default NavBarList;