import React, { useEffect, useState } from "react";
import { Card, CardMedia, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";
import resHome from "../../assets/resHomes.jpg";
import occup from "../../assets/occup.jpg";
import fam from "../../assets/fam.jpg";
import amne from "../../assets/amne.jpg"
import { fetchSupport } from "../../api/supportApi";
import { fetchFinance } from "api/financeApi";
import { fetchUpdates } from "api/updatesApi";

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [supportData, setSupportData] = useState([]);
  const [financeData, setfinanceData] = useState([]);
  const [updateData, setUpdateData] = useState([]);

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
      fetchSupport(setSupportData);
      fetchFinance(setfinanceData);
      fetchUpdates(setUpdateData);
  }, []);
  const sortedSupportData = supportData.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  const limitedSupportData = sortedSupportData.slice(0, 3);
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const sortedFinanceData = financeData.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  const limitedFinanceData = sortedFinanceData.slice(0, 2);
  const formatDateFinance = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const sortedUpdateData = updateData.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  const limitedUpdateData = sortedUpdateData.slice(0, 10);
  const formatDateUpdate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };



  return (
    
  <div>
    <div style={{ display: "flex", flex: 1,  flexDirection: "column", 
      paddingTop: "0px", paddingLeft: "40px", paddingRight: "40px", paddingBottom: "0px" }}>  
        <h4 style={{ margin: "0px" }}>
          <b>Welcome to the Dashboard {userData.fname} !</b>
        </h4>
    </div>
    <div style={{ display: "flex", flex: 1, flexGrow: 2, flexDirection: "row" }} >
      <div style={{ display: "flex", flex: 1, padding: "10px", flexGrow: 3,  paddingLeft: "40px", 
        flexDirection: "column",flexWrap: "wrap", alignItems: "stretch" }}>
        <div style={{ display: "flex", flex: 1, flexDirection: "row", padding: "10px", flexWrap: "wrap" }}>
          <Card style={{ display: "flex", flex: 1, padding: "5px", margin: "10px", 
            flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: 'transparent'  }}>
            <CardMedia component="img" height="140" src={resHome} alt="image" style={{padding: "5px"}} />
            <p style={{margin: "0px", marginTop: "10px"}}>100 Residential Homes</p>
          </Card>
          <Card style={{ display: "flex", flex: 1, padding: "5px", margin: "10px", 
            flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: 'transparent'   }}>
            <CardMedia component="img" height="140" image={fam} alt="image" style={{padding: "5px"}}/>
            <p style={{margin: "0px", marginTop: "10px"}}> 72 Homeowners</p>
          </Card>
          <Card style={{ display: "flex", flex: 1, padding: "5px", margin: "10px", 
            flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: 'transparent'   }}>
            <CardMedia component="img" height="140" image={occup} alt="image" style={{padding: "5px"}} />
            <p style={{margin: "0px", marginTop: "10px"}}>382 Total Population</p>
          </Card>
          <Card style={{ display: "flex", flex: 1, padding: "5px", margin: "10px", 
            flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: 'transparent'   }}>
            <CardMedia component="img" height="140" image={amne} alt="image" style={{padding: "5px"}}/>
            <p style={{margin: "0px", marginTop: "10px"}}>8 Amazing Amneties</p>
          </Card>
        </div>
        <div style={{padding: "10px"}}>
          <h5>Maintenance Requests</h5>
          <TableContainer component={Paper} sx={{ backgroundColor: "transparent", boxShadow: 'none'}}>
              <Table sx={{ border: 'none' }}>
                <TableBody sx={{ border: 'none' }}>
                  {limitedSupportData.map((request) => (
                    <TableRow key={request._id} sx={{ border: 'none' }} >
                      <TableCell style={{ padding: "10px", border: 'none', color: 'white', justifyContent: "center", alignItems: "center" }}>
                        <img src={request.image} alt="support" style={{ width: "30px", height: "30px", marginLeft: "15px" }} />
                      </TableCell>
                      <TableCell style={{ padding: "10px", border: 'none' }}>{request.supportType}</TableCell>
                      <TableCell style={{ padding: "10px", border: 'none' }}>{request.supportSubj}</TableCell>
                      <TableCell style={{ padding: '10px', border: 'none' }}>{formatDate(request.date)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </TableContainer>
        </div>
        <div style={{padding: "10px"}}>
          <h5>Payment History</h5> 
          <div style={{ display: "flex", flex: 1, flexDirection: "row", padding: "0px", flexWrap: "wrap" }}>
            <Card style={{ display: "flex", flex: 1,  flexDirection: "column", margin: "0px", marginRight: "15px", flexGrow: 1, padding: "10px", backgroundColor: 'transparent'}}>
              {limitedFinanceData.map((finance) => (
                <TableRow key={finance._id} sx={{ border: 'none' }} >
                 <TableCell style={{ padding: "10px", border: 'none', color: 'white', justifyContent: "center", alignItems: "center" }}>
                   <img src={finance.image} alt="Php" style={{ width: "30px", height: "30px", marginLeft: "15px" }} />
                 </TableCell>
                 <TableCell style={{ padding: "10px", border: 'none' }}>{finance.name}<br/>{formatDateFinance(finance.date)}</TableCell>
                 <TableCell style={{ padding: "10px", border: 'none' }}>Php {finance.amount}</TableCell>
                 
               </TableRow>   
              ))}
            </Card>
            <Card style={{ display: "flex", flex: 1, margin: "0px", flexGrow: 1, padding: "10px" }}>yeah</Card>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flex: 1, padding: "10px", flexGrow: 1, paddingRight: "40px" }}>
        <Card style={{ display: "flex", flexDirection: "column", flex: 1, padding: "5px", margin: "10px", 
          justifyContent: "center", backgroundColor: 'transparent' }}>
          <h5 style={{ display: "flex", margin: "10px", justifyContent: "center", alignItems: "center"}}>Announcements</h5>
          <div style={{ display: "flex", flex: 1, flexDirection: "row", padding: "0px", flexWrap: "wrap", alignContent: "flex-start" }}>
              {limitedUpdateData.map((update) => (
                <TableRow key={update._id} sx={{ border: 'none' }} >
                 <TableCell style={{ padding: "10px", border: 'none', color: 'white', justifyContent: "center", alignItems: "center" }}>
                   <img src={update.image} alt="Php" style={{ width: "30px", height: "30px", marginLeft: "15px" }} />
                 </TableCell>
                 <TableCell style={{ padding: "10px", border: 'none' }}>{update.updateType}<br/>{formatDateUpdate(update.date)}</TableCell>
               </TableRow>   
              ))}
         
          </div>
        </Card>
      </div>
    </div>  
  </div>
  );
};

export default Dashboard;
