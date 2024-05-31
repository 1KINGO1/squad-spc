import { Box, Dialog, TextField, Typography } from '@mui/material';
import styles from './Clans.module.scss';

interface ClanEditDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ClanEditDialog = ({ open, setOpen }: ClanEditDialogProps) => {
  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <Box className={styles.editDialogWrapper}>
        <Typography variant="h5" color="white" align="center">
          Ukraine Gaming Alliance
        </Typography>
        <TextField
          className={styles.editDialogNameInput}
          hiddenLabel
          fullWidth
          placeholder="Clan Name"
          defaultValue="Ukraine Gaming Alliance"
          variant="filled"
        />
      </Box>
    </Dialog>
  );
};

export default ClanEditDialog;
