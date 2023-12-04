import { Card, CardMedia } from "@mui/material";
import React, { useEffect, useState } from "react";
import resHome from "../../assets/resHomes.jpg";
import occup from "../../assets/occup.jpg";
import fam from "../../assets/fam.jpg";
import amne from "../../assets/amne.jpg"

const Dashboard = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const currentHostname = window.location.hostname;
    let baseUrl = "";
    if (currentHostname === "localhost") {
      baseUrl = "http://localhost:5000"; // Local environment
    } else {
      baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
    }

    const userDataEndpoint = "/userData";
    const userDataUrl = `${baseUrl}${userDataEndpoint}`;

    fetch(userDataUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setUserData(data.data);
        if (data.data === 'token expired') {
          alert("Token expired! Log in again.");
          window.localStorage.clear();
          window.location.href = "./signin";
        }
      });
  }, []);

  return (
    
  <div>
    <div style={{ display: "flex", flex: 1,  flexDirection: "column", paddingTop: "0px", paddingLeft: "40px", paddingRight: "40px", paddingBottom: "0px" }}>
        <h2><b>Welcome {userData.fname} !</b></h2>
        <h4 style={{margin: "0px"}}><b>Dashboard</b></h4>
    </div>
    <div style={{ display: "flex", flex: 1, flexGrow: 2, flexDirection: "row" }} >
      <div style={{ display: "flex", flex: 1, padding: "10px", flexGrow: 3,  paddingLeft: "40px", flexDirection: "column",flexWrap: "wrap", alignItems: "stretch" }}>
        <div style={{ display: "flex", flex: 1, flexDirection: "row", padding: "10px", flexWrap: "wrap" }}>
          <Card style={{ display: "flex", flex: 1, padding: "5px", margin: "10px", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <CardMedia component="img" height="140" src={resHome} alt="image" />
            <p style={{margin: "0px", marginTop: "10px"}}>100 Residential Homes</p>
          </Card>
          <Card style={{ display: "flex", flex: 1, padding: "5px", margin: "10px", flexDirection: "column", justifyContent: "center", alignItems: "center"  }}>
            <CardMedia component="img" height="140" image={fam} alt="image" />
            <p style={{margin: "0px", marginTop: "10px"}}> 72 Homeowners</p>
          </Card>
          <Card style={{ display: "flex", flex: 1, padding: "5px", margin: "10px", flexDirection: "column", justifyContent: "center", alignItems: "center"  }}>
            <CardMedia component="img" height="140" image={occup} alt="image" />
            <p style={{margin: "0px", marginTop: "10px"}}>382 Total Population</p>
          </Card>
          <Card style={{ display: "flex", flex: 1, padding: "5px", margin: "10px", flexDirection: "column", justifyContent: "center", alignItems: "center"  }}>
            <CardMedia component="img" height="140" image={amne} alt="image" />
            <p style={{margin: "0px", marginTop: "10px"}}>8 Amazing Amneties</p>
          </Card>
        </div>
        <div >
          <h5>Maintenance Requests</h5>
          <div style={{ display: "flex", flex: 1, flexDirection: "row", padding: "10px", flexWrap: "wrap" }}>
            <CardMedia/>
            <p>Name</p>
            <p>Subject</p>
            <p>Date</p>
          </div>
        </div>
        <div>
          <h5>Payment History</h5> 
        </div>
      </div>
      <div style={{ display: "flex", flex: 1, padding: "10px", flexGrow: 1, paddingRight: "40px" }}>
        <Card style={{ display: "flex", flex: 1, padding: "5px", margin: "10px", justifyContent: "center"}}>
          <h5 style={{margin: "10px"}}>Announcements</h5>
        </Card>
      </div>
    </div>  
  </div>
  );
};

export default Dashboard;
