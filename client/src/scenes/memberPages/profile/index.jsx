import { useState, useEffect } from "react";
import {
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { CardMedia } from "@mui/material";
import UploadImage from "components/UploadImage";

const Profile = () => { 
  const theme = useTheme();
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState({
    fname: "",
    lname: "",
    email: "",
  });
  const [open, setOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const currentHostname = window.location.hostname;
      let baseUrl = "";
      if (currentHostname === "localhost") {
        baseUrl = "http://localhost:5000"; // Local environment
      } else {
        baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
      }

      const userDataEndpoint = "/userData";
      const userDataUrl = `${baseUrl}${userDataEndpoint}`;

      try {
        const response = await fetch(userDataUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            token: window.localStorage.getItem("token"),
          }),
        });

        const data = await response.json();
        console.log(data, "userData");

        if (data.data === "token expired") {
          alert("Token expired! Log in again.");
          window.localStorage.clear();
          window.location.href = "./signin";
        } else {
          setUser({ 
            image: data.data.image,
            fname: data.data.fname,
            lname: data.data.lname,
            email: data.data.email,
            userType: data.data.userType,
           }); 
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []); 

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditProfile = async () => {
    // Make API call to update user information
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/editUser/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(selectedUser),
      });

      if (response.ok) {
        // Update the local user state
        setUser(selectedUser);
        handleClose();
      } else {
        // Handle error
        console.error("Error updating user data");
      }
    } catch (error) {
      console.error("Error updating user data", error);
    }
  };

  const handlePasswordChange = async () => {
    // Make API call to update user password
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/editUser/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (response.ok) {
        // Password updated successfully
        setNewPassword("");
      } else {
        // Handle error
        console.error("Error updating password");
      }
    } catch (error) {
      console.error("Error updating password", error);
    }
  };

  return (
    <div style={{ flex: 1, padding: "40px", fontSize: "20px", display: "flex", flexDirection: "column", alignItems: "center", alignContent: "center" }}>
      {user && (
        <div style={{ fontSize: 15 }}>
          <CardMedia
            component="img"
            height="250"
            width="140"
            image={user.image}
            alt="user image"
            style={{ objectFit: "cover", borderRadius: "10%", marginBottom: "20px", maxWidth: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}

          />
          <strong>First Name: </strong>{user.fname} <br />
          <strong>Last Name: </strong> {user.lname} <br />
          <strong>Email: </strong> {user.email} <br />
          <strong>Role: </strong> {user.userType} <br />
          <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
            <Button variant="outlined" onClick={handleOpen}>
              Edit Profile
            </Button>
          </div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Details</DialogTitle>
            <DialogContent>
              <TextField label="First Name" value={selectedUser.fname} onChange={(e) => setSelectedUser({ ...selectedUser, fname: e.target.value })} />
              <br />
              <br />
              <TextField label="Last Name" value={selectedUser.lname} onChange={(e) => setSelectedUser({ ...selectedUser, lname: e.target.value })} />
              <br />
              <br />
              <TextField label="Email" value={selectedUser.email} onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} />
              <br />
              <br />
              <UploadImage label="Edit Image:" value={image} onImageChange={(url) => setImage(url)} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleEditProfile}>Save</Button>
            </DialogActions>
          </Dialog>
          <div style={{ marginTop: "20px" }}>
            <TextField label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <Button variant="outlined" onClick={handlePasswordChange} style={{ marginLeft: "10px" }}>
              Change Password
            </Button>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default Profile;
