import React, { useState, useEffect } from "react";
import { Fab, IconButton, InputBase, useTheme } from "@mui/material";
import { Search } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import FlexBetween from "components/FlexBetween";
import AddFinanceDialog from "./addFinanceDialog";
import FinanceTable from "./financeTable";
import { fetchFinance, addFinance } from "api/financeApi";
import { fetchUsers } from "api/usersApi";

const Finance = () => {
  const theme = useTheme();
  const [isAddFinanceDialogOpen, setIsAddFinanceDialogOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ _id: "", name: "" }); 
  const [name, setName] = useState("");
  const [property, setProperty] = useState("");
  const [paymentType, setpaymentType] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [receipt, setReceipt] = useState("");
  const [image, setImage] = useState("");
  const [finance, setFinance] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState({ userType: "", id: "" , fname: ""});
  
  const handleOpenAddFinanceDialog = () => {
    setIsAddFinanceDialogOpen(true);
  };

  const handleCloseAddFinanceDialog = () => {
    setIsAddFinanceDialogOpen(false);
    setUser({ _id: "", name: "" });
    setName("");
    setProperty("");
    setpaymentType("");
    setAmount("");
    setDate("");
    setReceipt("");
  };

    useEffect(() => {
      fetchFinance(setFinance);
      fetchUsers(setUsers);
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
            setUserData({ 
              fname: data.data.fname, 
              id: data.data._id,
              role: data.data.userType });
          }
          
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      
  
      fetchData();
    }, []);

    useEffect(() => {
      if (userData.id) { // Check if userData is populated
        if (userData.role === 'admin') {
          fetchFinance(setFinance);
        } else {
          fetchFinance(setFinance, userData.id);
        }
      }
    }, [userData]);

    useEffect(() => {
      console.log("Current User:", userData);
      console.log("Finance Records:", finance);
    }, [userData, finance]);

    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    
  
    // Function to handle sorting
    const handleSort = (column) => {
      if (column === sortColumn) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortColumn(column);
        setSortOrder("asc");
      }
    }
    const handleSearchAndSort = () => {
      let filteredFinanceData = finance;
      if (userData.role !== 'admin') {
        filteredFinanceData = finance.filter(item => item.userId === userData.id);
      }
    
      if (searchQuery) {
        const lowerCaseQuery = searchQuery.toLowerCase();
        filteredFinanceData = filteredFinanceData.filter((item) => {
          // Check for undefined values before calling toLowerCase()
          return (
            (item.name && item.name.toLowerCase().includes(lowerCaseQuery)) ||
            (item.property && item.property.toLowerCase().includes(lowerCaseQuery)) ||
            (item.paymentType && item.paymentType.toLowerCase().includes(lowerCaseQuery)) ||
            (item.amount && item.amount.toString().toLowerCase().includes(lowerCaseQuery)) ||
            (item.date && item.date.toLowerCase().includes(lowerCaseQuery))
          );
        });
      }
    
      if (sortColumn) {
        filteredFinanceData.sort((a, b) => {
          const valueA = a[sortColumn];
          const valueB = b[sortColumn];
          return sortOrder === 'asc' ? (valueA < valueB ? -1 : 1) : (valueA > valueB ? -1 : 1);
        });
      }
      return filteredFinanceData;
    };
    

    
    
  const filteredFinance = handleSearchAndSort();


  return (
    <div style={{ flex: 1, padding: "20px", fontSize: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",}}>
        <Fab variant="extended" size="small" color="primary"  
          style={{ background: `#F2643D`, padding: "20px" }}
          onClick={handleOpenAddFinanceDialog}
        >
          <AddIcon /> Finance
        </Fab>
        <FlexBetween
          backgroundColor={theme.palette.background.alt}
          borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem"
        >
          <InputBase
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton>
            <Search />
          </IconButton>
        </FlexBetween>
      </div> <br/>
      <AddFinanceDialog
        isAddFinanceDialogOpen={isAddFinanceDialogOpen}
        handleOpenAddFinanceDialog={handleOpenAddFinanceDialog}
        handleCloseAddFinanceDialog={handleCloseAddFinanceDialog}
        users={users}
        user={user}
        setUser={setUser}
        name={name}
        setName={setName}
        property={property}
        setProperty={setProperty}
        paymentType={paymentType}
        setpaymentType={setpaymentType}
        amount={amount}
        setAmount={setAmount}
        date={date}
        setDate={setDate}
        receipt={receipt}
        setReceipt={setReceipt}
        image={image}
        setImage={setImage}
        addFinance={addFinance}
      />
      <FinanceTable 
       finance={filteredFinance}
       users={users}
       handleSearchAndSort={handleSort}
       sortColumn={sortColumn}
       sortOrder={sortOrder}
       searchQuery={searchQuery}
       setSearchQuery={setSearchQuery}
      />
    </div>
  );
};

export default Finance;