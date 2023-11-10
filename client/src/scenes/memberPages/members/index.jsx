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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FlexBetween from "components/FlexBetween";
import { Search } from "@mui/icons-material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useTheme } from "@mui/material/styles";
import { fetchUsers, handleEditUser, useUserData } from "api/usersApi";

const Members = () => {
  const userData = useUserData();
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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

export default Members;

   /* <TableContainer component={Card} style={{ background: "none" }}>
        <Table>
          <TableHead>
            <TableRow style={{ background: "#333" }}>
              <TableCell style={{ fontWeight: 'bold', color: 'white' }}>First Name</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: 'white' }}>Last Name</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: 'white' }}>Email</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: 'white' }}>User Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {handleSearch().map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.fname}</TableCell>
                <TableCell>{user.lname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.userType}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */