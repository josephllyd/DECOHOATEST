import React, { useEffect, useState } from "react";
import {
  Fab,
  InputBase,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  MenuItem,
  Popover,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FlexBetween from "components/FlexBetween";
import { Search } from "@mui/icons-material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useTheme } from "@mui/material/styles";
import { fetchUsers, handleEditUser, useUserData, editUser } from "api/usersApi";
import UploadImage from "components/UploadImage";

const Members = () => {
  const userData = useUserData();
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [image, setImage] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedfname, setEditedfname] = useState("");
  const [editedlname, setEditedlname] = useState("");
  const [editedemail, setEditedemail] = useState("");
  const [editedpassword, setEditedpassword] = useState("");
  const [editedUserType, setEditedUserType] = useState("");
  const [editedImage, setEditedImage] = useState("");

  const handleOpenEditDialog = (selectedUser) => {
    setIsEditDialogOpen(true);
    if (selectedUser) {
      setEditedfname(selectedUser.fname || "");
      setEditedlname(selectedUser.lname || "");
      setEditedemail(selectedUser.email || "");
      setEditedpassword(selectedUser.password || "");
      setEditedUserType(selectedUser.userType || "");
      setEditedImage(selectedUser.image || "");
      setSelectedUser(selectedUser);
    }
  };

  const closeEditPropertyDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleEditUser = async () => {
    const editedUser = {
      fname: editedfname,
      lname: editedlname,
      email: editedemail,
      password: editedpassword,
      userType: editedUserType,
      image: editedImage,
      //token: localStorage.getItem("token"),
    };
  
    try {
      const response = await editUser(selectedUser._id, editedUser, localStorage.getItem("token"));
      console.log("Edit User Response:", response);
      setIsEditDialogOpen(false);
      fetchUsers(setUsers);
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };


  useEffect(() => {
    fetchUsers(setUsers);
  }, []);

  const handleCardClick = (event, user) => {
    console.log("Clicked User:", user);
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };
  

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  useEffect(() => {
    const currentHostname = window.location.hostname;
    let baseUrl = "";
    if (currentHostname === "localhost") {
      baseUrl = "http://localhost:5000"; // Local environment
    } else {
      baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
    }

    const getUsersEndpoint = "/getUsers";
    const getUsersUrl = `${baseUrl}${getUsersEndpoint}`;

    fetch(getUsersUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.users, "users");
        setUsers(data.users);
      });
  }, []);

  const handleSearch = () => {
    const filteredUsers = users.filter((user) => {
      const firstName = user.fname ? user.fname.toLowerCase() : '';
      const lastName = user.lname ? user.lname.toLowerCase() : '';
      const email = user.email ? user.email.toLowerCase() : '';
      const userType = user.userType ? user.userType.toLowerCase() : '';
      return (
        firstName.includes(searchQuery.toLowerCase()) ||
        lastName.includes(searchQuery.toLowerCase()) ||
        email.includes(searchQuery.toLowerCase()) ||
        userType.includes(searchQuery.toLowerCase())
      );
    });
    return filteredUsers;
  };

  const handleDeleteUser = () => {
    if (!selectedUser || !selectedUser._id) {
      console.error("Invalid user or user ID");
      return;
    }

    const confirmation = window.confirm("Are you sure you want to delete this vehicle?");
    
    if (confirmation) {
      const currentHostname = window.location.hostname;
      let baseUrl = "";
      if (currentHostname === "localhost") {
        baseUrl = "http://localhost:5000"; // Local environment
      } else {
        baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
      }
    
      const deleteUserEndpoint = `/deleteUser/${selectedUser._id}`;
      const deleteUserUrl = `${baseUrl}${deleteUserEndpoint}`;
    
      fetch(deleteUserUrl, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log(data); 
          fetchUsers(setUsers);
         // setSelectedUser(null);
        })
        .catch((error) => {
          console.error("Error:", error.message);
      });
    }
  };

  /*const editUser = async (currentUserId, editedUser) => {
    try {
      const currentHostname = window.location.hostname;
      let baseUrl = "";
      if (currentHostname === "localhost") {
        baseUrl = "http://localhost:5000"; // Local environment
      } else {
        baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
      }
  
      const editUserEndpoint = `/editCurrentUser/${currentUserId}`;
      const editUserUrl = `${baseUrl}${editUserEndpoint}`;
  
      const response = await fetch(editUserUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(editedUser),
      });
  
      const data = await response.json();
  
      if (data.status === "ok") {
        alert("User upemaild successfully");
      } else {
        alert("Failed to upemail User");
      }
    } catch (error) {
      console.error("Error updating User: ", error);
      alert("An error occurred while updating User");
    }
  }; */
  
  return (
    <div style={{ flex: 1, padding: "20px", fontSize: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Fab variant="extended" size="small" color="primary" style={{ background: `#F2643D`, padding: "20px" }} onClick={() => { }}>
          <AddIcon /> Member
        </Fab>
        <FlexBetween
          backgroundColor={theme.palette.background.alt}
          borderRadius="9px"
          gap="3rem"
          padding="0.1rem 1.5rem"
        >
          <InputBase
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton onClick={handleSearch}>
            <Search />
          </IconButton>
        </FlexBetween>
      </div>
      <br />
      <Grid container spacing={2}>
        {handleSearch().map((user) => (
          <Grid item key={user.id} xs={12} sm={4} md={2}>
            <Card style={{ marginBottom: "20px", fontSize: 13 }}>
              <CardMedia component="img" height="140" image={user.image} alt="user image" />
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
                  <strong>Role: </strong> {user.userType}
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
            <MenuItem onClick={() => handleOpenEditDialog(selectedUser.id)}>Edit User</MenuItem>
            <MenuItem onClick={() => handleDeleteUser(selectedUser._id)}>Delete</MenuItem>
            <MenuItem onClick={() => handleOpenEditDialog(selectedUser.id)}>Edit User</MenuItem>
            <MenuItem onClick={() => handleEditUser(selectedUser.id, {})}>View User</MenuItem>
          </div>
        )}
      </Popover>
      {/*Edit property diaglog*/}
      <Dialog
        open={isEditDialogOpen}
        onClose={closeEditPropertyDialog}
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>Edit Member Detail</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditUser}>
                <TextField
                    label="First Name"
                    name="name"
                    type="name"
                    value={editedfname}
                    onChange={(e) => setEditedfname(e.target.value)}
                    fullWidth required
                /><br/><br/>
                <TextField
                    label="Last Name"
                    name="name"
                    type="name"
                    value={editedlname}
                    onChange={(e) => setEditedlname(e.target.value)}
                    fullWidth required
                /><br/><br/>
                <TextField
                    label="Email"
                    name="email"
                    value={editedemail}
                    onChange={(e) => setEditedemail(e.target.value)}
                    fullWidth required
                /><br/><br/>
                <FormControl fullWidth required>
                  <InputLabel>User Type</InputLabel>
                  <Select
                    value={editedUserType}
                    onChange={(e) => setEditedUserType(e.target.value)}
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </FormControl><br/><br/>
                <UploadImage 
                    value={image}
                    onImageChange={(url) => setImage(url)}
                />
            <DialogActions>
              <Button onClick={closeEditPropertyDialog} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save Changes
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Members;
