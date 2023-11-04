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
    }, []);

  return (
    <div style={{ flex: 1, padding: "40px", fontSize: "20px" }}>
      <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}
      >
        <Fab
          variant="extended" size="small" color="primary"
          onClick={handleOpenAddFinanceDialog}
          style={{ background: `#F2643D`, padding: "20px" }}
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
        finance={finance}  
        users={users} 
      />
    </div>
  );
};

export default Finance;