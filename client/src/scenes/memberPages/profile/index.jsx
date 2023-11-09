import { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, IconButton, InputBase } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { fetchUsers, handleEditUser, useUserData } from "api/usersApi";

const Profile = () => {
  const userData = useUserData();
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  

  useEffect(() => {
    fetchUsers(setUsers); 
  }, []);

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
        >
        </div>
      </div>
      <br />

      {users.map((user) => (
        <Card key={user.id} style={{ marginBottom: "20px" }}>
          <CardMedia component="img" height="140" image={user.photo} alt="user photo" />
          <CardContent>
            <div>
              <strong>First Name: </strong> {user.fname}
            </div>
            <div>
              <strong>Last Name: </strong> {user.lname}
            </div>
            <div>
              <strong>Email: </strong> {user.email}
            </div>
            <div>
              <strong>Role: </strong> {user.role}
            </div>
            <IconButton
              onClick={() => {
                // Your user editing logic here
                const newData = {}; // Define your updated data
                handleEditUser(user.id, newData);
              }}
            >
              <AddIcon /> Edit
            </IconButton>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Profile;
