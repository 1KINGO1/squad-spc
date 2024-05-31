import { Box, Button, Typography } from "@mui/material";
import styles from "./Clans.module.scss";
import ClanEditDialog from "./ChanEditDialog";
import { useState } from "react";

const ClanItem = () => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Box className={styles.clanItem}>
        <Typography className={styles.clanItemTitle}>
          Ukraine Gaming Alliance
        </Typography>

        <Box className={styles.clanItemControlPanel}>
          <Button variant="contained" onClick={() => setIsDialogOpen(true)}>Edit</Button>
          <Button variant="contained" color="error">Remove</Button>
          <ClanEditDialog open={isDialogOpen} setOpen={setIsDialogOpen}/>
        </Box>
      </Box>
    </>
  )
}

export default ClanItem;