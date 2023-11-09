import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Dialog,
  DialogContent,
  Typography,
  Menu,
  MenuItem,
  Popover,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useTheme } from "@mui/material/styles";
import { fetchUsers, handleEditUser, useUserData } from "api/usersApi";

const Profile = () => {
  const userData = useUserData();
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    fetchUsers(setUsers);
  }, []);

  const handleCardClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  return (
    <div style={{ flex: 1, padding: "20px", fontSize: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div
          style={{
            backgroundColor: theme.palette.background.alt,
            borderRadius: "9px",
            gap: "3rem",
            padding: "0.1rem 1.5rem",
          }}
        ></div>
      </div>
      <br />
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item key={user.id} xs={12} sm={4} md={2}>
            <Card style={{ marginBottom: "20px", fontSize: 13 }}>
              <CardMedia component="img" height="140" image={user.photo} alt="user photo" />
              <CardContent style={{ fontSize: 13 }}>
                <div>
                  <strong>First Name: </strong> {user.fname}
                </div>
                <div>
                  <strong>Last Name: </strong> {user.lname}
                </div>
                <div>
                  <strong>Email: </strong> {user.email}
                </div>
              </CardContent>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px", paddingLeft: "13px" }}>
                <div>
                  <strong>Role: </strong> {user.role}
                </div>
                <IconButton onClick={(e) => handleCardClick(e, user)}>
                  <MoreHorizIcon />
                </IconButton>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {selectedUser && (
          <div>
            <MenuItem onClick={() => handleEditUser(selectedUser.id, {})}>Edit</MenuItem>
            <MenuItem onClick={() => handleEditUser(selectedUser.id, {})}>Delete</MenuItem>
            <MenuItem onClick={() => handleEditUser(selectedUser.id, {})}>Disable User</MenuItem>
            <MenuItem onClick={() => handleEditUser(selectedUser.id, {})}>View User</MenuItem>
          </div>
        )}
      </Popover>
    </div>
  );
};

export default Profile;
