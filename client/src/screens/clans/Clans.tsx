import { Box } from "@mui/material";
import styles from './Clans.module.scss';
import ClanItem from "./ClanItem";
const Clans = () => {
  return (
    <Box className={styles.clansWrapper}>
      <ClanItem />
      <ClanItem />
      <ClanItem />
      <ClanItem />
      <ClanItem />
      <ClanItem />
      <ClanItem />
    </Box>
  )
}

export default Clans;