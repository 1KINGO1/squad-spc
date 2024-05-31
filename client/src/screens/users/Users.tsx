import TableContainer from "@mui/material/TableContainer";
import { Button, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import styles from './Users.module.scss';
import { Roles } from "../../types/Roles";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";

const Users = () => {
  return (
    <TableContainer component={Paper} id={styles.tableWrapper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="center">SteamID</TableCell>
            <TableCell align="center">Group</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>KINGO</TableCell>
            <TableCell align="center">76561198990669262</TableCell>
            <TableCell align="center">
              <Select value={Roles.Guest}>
                <MenuItem value={Roles.Guest} selected>Guest</MenuItem>
                <MenuItem value={Roles.ClanLeaders}>ClanLeader</MenuItem>
                <MenuItem value={Roles.Admin}>Admin</MenuItem>
                <MenuItem value={Roles.Root} disabled>Root</MenuItem>
              </Select>
            </TableCell>
            <TableCell align="right">
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Users;