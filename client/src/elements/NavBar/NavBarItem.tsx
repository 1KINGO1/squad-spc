import styles from "./NavBar.module.scss";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { FC, ReactNode } from "react";

interface NavBarItemProps {
  icon: ReactNode;
  title: string;
  path: string;
}

const NavBarItem: FC<NavBarItemProps> = ({ icon, title, path }) => {
  return (
    <ListItem disablePadding className={styles.listItem}>
      <ListItemButton>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
};

export default NavBarItem;