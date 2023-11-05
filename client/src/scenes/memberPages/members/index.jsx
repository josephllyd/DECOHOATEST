import { Fab, IconButton, InputBase, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FlexBetween from "components/FlexBetween";
import { Search } from "@mui/icons-material";
import { useTheme } from '@mui/material/styles';

const Members = () => {
  const theme = useTheme();
  const [users, setUsers] = useState([]);

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

  return (
    <div style={{ flex: 1, padding: "20px", fontSize: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Fab variant="extended" size="small" color="primary" style={{ background: `#F2643D`, padding: "20px" }} onClick={() => { }}>
          <AddIcon /> Finance
        </Fab>
        <FlexBetween
          backgroundColor={theme.palette.background.alt}
          borderRadius="9px"
          gap="3rem"
          padding="0.1rem 1.5rem"
        >
          <InputBase
            placeholder="Search..."
            value={{}}
            onChange={() => { }}
          />
          <IconButton>
            <Search />
          </IconButton>
        </FlexBetween>
      </div>
      <br />
      <TableContainer component={Card} style={{ background: "none" }}>
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
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.fname}</TableCell>
                <TableCell>{user.lname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.userType}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Members;
