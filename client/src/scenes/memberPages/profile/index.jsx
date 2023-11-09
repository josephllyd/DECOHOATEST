  import { useState, useEffect } from "react";
  import { useTheme } from "@mui/material/styles";
  import { fetchUsers, handleEditUser, useUserData, componentDidMount } from "api/usersApi";
  import { CardMedia } from "@mui/material";

  const Profile = () => {
    const userData = useUserData();
    const theme = useTheme();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(userData || { photo: '', fname: '', lname: '', email: '' });


    useEffect(() => {
      fetchUsers(setUsers);
    }, []);


    return (
      <div style={{ flex: 1, padding: "20px", fontSize: "20px" }}>
        {userData && (
          <div style={{ fontSize: 13 }}>

            <CardMedia component="img" height="140" width="50" image={userData.photo} alt="user photo" /> <br/>
            <strong>First Name: </strong>{userData.fname} <br/>
            <strong>Last Name: </strong> {userData.lname} <br/>
            <strong> Email: </strong>{userData.email} <br/>
          </div>
        )}
      </div>
    );
  };

  export default Profile;
