import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { Component } from "react";
import {Card} from "@mui/material";

export default class Members extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
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
        this.setState({ users: data.users });
      });
  }

  render() {
    return (
      <div  style={{ flex: 1, padding: "20px", fontSize: "20px" }}>
        <h2>Members</h2>
        <TableContainer component={Card}  style={{ background: "none" }}>
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
              {this.state.users.map((user, index) => (
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
  }
}
