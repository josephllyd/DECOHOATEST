import React, { useState, useEffect } from "react";
import { Fab, IconButton, InputBase, useTheme, Card } from "@mui/material";
import { Search } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import FlexBetween from "components/FlexBetween";
import AddFinanceDialog from "./addFinanceDialog";
import FinanceTable from "./financeTable";

const Finance = () => {
  const theme = useTheme();
  const [isAddFinanceDialogOpen, setIsAddFinanceDialogOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ _id: "", name: "" }); // Initialize here
  const [name, setName] = useState("");
  const [property, setProperty] = useState("");
  const [paymentType, setpaymentType] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [receipt, setReceipt] = useState("");
  const [finance, setFinance] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCloseAddFinanceDialog = () => {
    setIsAddFinanceDialogOpen(false);
    setUser({ _id: "", name: "" }); // Reset user
    setName("");
    setProperty(""); // Reset property
    setpaymentType(""); // Reset paymentType
    setAmount(""); // Reset amount
    setDate(""); // Reset date
    setReceipt(""); // Reset receipt
   // setImage(null); // Reset image
  };

  const handleOpenAddFinanceDialog = () => {
    setIsAddFinanceDialogOpen(true);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !name || !property || !amount || !paymentType || !date || !receipt) {
      alert("All fields are required");
      return;
    }

    const newFinance = {
      user,
      name,
      property,
      amount,
      paymentType,
      date,
      receipt,
      token: localStorage.getItem("token"),
    };

    try {
      const currentHostname = window.location.hostname;
      let baseUrl = "";
      if (currentHostname === "localhost") {
        baseUrl = "http://localhost:5000"; // Local environment
      } else {
        baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
      }
      const addFinanceEndpoint = "/addFinance";
      const addFinanceUrl = `${baseUrl}${addFinanceEndpoint}`;
      const response = await fetch(addFinanceUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(newFinance),
      });

      const data = await response.json();

      if (data.status === "ok") {
        alert("Finance added successfully");
        handleCloseAddFinanceDialog();
      } else {
        alert("Failed to add finance");
      }
    } catch (error) {
      console.error("Error adding finance: ", error);
      alert("An error occurred while adding finance");
    }
  };

  //to fetch user in dropdown list of the users
    useEffect(() => {
      fetchFinance();
    }, []);

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
          setUsers(data.users); // setting users here
        });
    }, []);

  const fetchFinance = () => {
    const currentHostname = window.location.hostname;
    let baseUrl = "";
    if (currentHostname === "localhost") {
      baseUrl = "http://localhost:5000"; // Local environment
    } else {
      baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
    }

    const getFinanceEndpoint = "/getFinance";
    const getFinanceUrl = `${baseUrl}${getFinanceEndpoint}`;

    fetch(getFinanceUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.finance, "finance");
        setFinance(data.finance); // Use setFinance to update the state
      })
      .catch((error) => {
        console.error("Error fetching finance:", error);
      });
  };


  return (
    <div style={{ flex: 1, padding: "40px", fontSize: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Fab
          variant="extended"
          size="small"
          color="primary"
          onClick={handleOpenAddFinanceDialog}
          style={{ background: `#F2643D`, padding: "20px" }}
        >
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
       // handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
      />
      <FinanceTable finance={finance} />
    </div>
  );
};

export default Finance;
