import React, { useState, useEffect } from "react";
import signUpImage from "../../../assets/undraw_sign_up_n6im.svg"
import {
  Alert,
  IconButton,
  useTheme,
} from "@mui/material";
import { LightModeOutlined, DarkModeOutlined, ExitToApp, DeleteForever } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { setMode } from "state";  
import { useDispatch } from "react-redux";

const Settings = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [userData, setUserData] = useState({ fname: "" });
  const [confirmDelete, setConfirmDelete] = useState(false);

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./signin";
  };

  const handleDeleteAccount = () => {
    setConfirmDelete(true); // Step 2
  };

  const confirmDeleteAction = async () => {
    // Perform the deletion action from the database here
    // You can make a fetch request to your server to delete the account
    // After successful deletion, clear local storage and navigate to the sign-in page
    // Example: const deleteResponse = await fetch(deleteEndpoint, deleteOptions);
    // Handle the response and perform actions accordingly

    window.localStorage.clear();
    window.location.href = "./signin";
  };


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
          setUserData({ fname: data.data.fname });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div style={{ display: "flex", flex: 1, flexGrow: 2, flexDirection: "row" }}>
    <div style={{ flex: 1, display: window.innerWidth > 768 ? 'block' : 'none', alignItems: 'center', justifyContent: 'center', 
                  paddingTop: "10px",
                  paddingLeft: "80px",
                  paddingRight: "0px",
                  paddingBottom: "80px"}}>
      <img src={signUpImage} alt="Sign Up" style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
            <div style={{ flex: 1, padding: "40px", fontSize: "16px" }}>
              <b> Welcome to Settings Page {userData.fname}! </b>
              <br />
              <br />
              <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlined sx={{ fontSize: "25px" }} />
                ) : (
                  <LightModeOutlined sx={{ fontSize: "25px" }} />
                )}
                 Dark Mode/Light Mode 
              </IconButton>
              <br />
              <IconButton onClick={logOut} style={{ textAlign: "left" }}>
                <ExitToApp fontSize="large" />
                Log Out
              </IconButton>
              <br />  
              <IconButton onClick={handleDeleteAccount} style={{ textAlign: "left" }}>
                <DeleteForever fontSize="large" />
                Delete Account
              </IconButton>
              <br />
                {confirmDelete && (
                  <alert>
                  
                    <div>
                    <p>Are you sure you want to delete your account?</p>
                    <button onClick={confirmDeleteAction}>Yes, delete</button>
                    <button onClick={() => setConfirmDelete(false)}>Cancel</button>
                  </div>
                
                  </alert>
                
                )}
            </div>
          </div>
  );
};

export default Settings;
