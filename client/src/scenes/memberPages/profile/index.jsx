import { useState, useEffect } from "react";
import { useTheme, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { fetchUsers, handleEditUser, useUserData, componentDidMount } from "api/usersApi";
import { CardMedia } from "@mui/material";

const Profile = () => {
  const userData = useUserData();
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(userData || { photo: '', fname: '', lname: '', email: '' });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchUsers(setUsers);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditProfile = () => {
    handleEditUser(selectedUser.id, selectedUser, setUsers);
    setOpen(false);
  };

  return (
    <div style={{ flex: 1, padding: "40px", fontSize: "20px", 
      display: "flex", flexDirection: "column", alignItems: "center", alignContent:"center" }}>
      {userData && (
        <div style={{ fontSize: 15 }}>
          <CardMedia
            component="img"
            height="140"
            width="140"
            image={userData.photo}
            alt="user photo"
            style={{ objectFit: "cover", borderRadius: "10%", marginBottom: "20px", maxWidth: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
          />
          <strong>First Name: </strong>{userData.fname} <br />
          <strong>Last Name: </strong> {userData.lname} <br />
          <strong> Email: </strong> {userData.email} <br />
          <strong> Role: </strong> {userData.role} <br />
          <Button variant="outlined" onClick={handleOpen} style={{ marginTop: "20px" }}>
            Edit
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Details</DialogTitle>
            <DialogContent>
              <TextField
                label="First Name"
                value={selectedUser.fname}
                onChange={(e) => setSelectedUser({ ...selectedUser, fname: e.target.value })}
              /><br/><br/>
              <TextField
                label="Last Name"
                value={selectedUser.lname}
                onChange={(e) => setSelectedUser({ ...selectedUser, lname: e.target.value })}
              /><br/><br/>  
              <TextField
                label="Email"
                value={selectedUser.email}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleEditProfile}>Save</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default Profile;
