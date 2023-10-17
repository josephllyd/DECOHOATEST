import React, { useState, useEffect } from "react";
import {
  Fab,
  IconButton,
  InputBase,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { Search } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

const Finance = () => {
  const theme = useTheme();
  const [users, setUsers] = useState([]); // call the users
  const [user, setUser] = useState({ _id: "", name: "" }); // set the users
  const [property, setProperty] = useState([]);
  const [paymentType, setpaymentType] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [receipt, setReceipt] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddFinanceDialogOpen, setIsAddFinanceDialogOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [image, setImage] = useState(null);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !property || !amount || !paymentType || !date || !receipt) {
      alert("All fields are required");
      return;
    }

    const newFinance = {
      user,
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
      const addPropertyEndpoint = "/addFinance";
      const addPropertyUrl = `${baseUrl}${addPropertyEndpoint}`;
      const response = await fetch(addPropertyUrl, {
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
        alert("Property added successfully");
        handleCloseAddFinanceDialog();
      } else {
        alert("Failed to add property");
      }
    } catch (error) {
      console.error("Error adding property: ", error);
      alert("An error occurred while adding property");
    }
  };

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

  const fetchProperties = () => {
    const currentHostname = window.location.hostname;
    let baseUrl = "";
    if (currentHostname === "localhost") {
      baseUrl = "http://localhost:5000"; // Local environment
    } else {
      baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
    }

    const getPropertiesEndpoint = "/getProperties";
    const getPropertiesUrl = `${baseUrl}${getPropertiesEndpoint}`;

    fetch(getPropertiesUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.properties, "properties");
        setProperties(data.properties); // Use setProperties to update the state
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  };

  
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleOpenAddFinanceDialog = () => {
    setIsAddFinanceDialogOpen(true);
  };

  const handleCloseAddFinanceDialog = () => {
    setIsAddFinanceDialogOpen(false);
    setUser({ _id: "", name: "" }); // Reset user
    setProperty(""); // Reset property
    setpaymentType(""); // Reset paymentType
    setAmount(""); // Reset amount
    setDate(""); // Reset date
    setReceipt(""); // Reset receipt
    setImage(null); // Reset image
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
      </div>

        {/*ADD FINANCE DIALOG*/}
        <Dialog open={isAddFinanceDialogOpen} onClose={handleCloseAddFinanceDialog}>
          <DialogTitle>Add Finance Data</DialogTitle>
          <DialogContent>
              <form onSubmit={handleSubmit}>
                <TextField
                  select
                  label="User"
                  name="user"
                  SelectProps={{
                    native: true,
                  }}
                  value={user._id} // Adjust the value
                  onChange={(e) => setUser({ 
                    _id: e.target.value, 
                    name: e.currentTarget.textContent 
                  })} // Adjust the setUser function
                  fullWidth
                  required
                >
                  <option value=""></option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {`${user.fname} ${user.lname}`}
                    </option>
                  ))}
                </TextField><br/><br/>
                <FormControl fullWidth required>
                  <InputLabel>Property Category</InputLabel>
                  <Select
                    value={property}
                    onChange={(e) => setProperty(e.target.value)}
                  >
                    <MenuItem value="Townhouse Unit">TownHouse</MenuItem>
                    <MenuItem value="2 Bedroom Unit">2 Bedroom Unit</MenuItem>
                    <MenuItem value="3 Bedroom Unit">3 Bedroom Unit</MenuItem>
                    <MenuItem value="1 Bedroom Unit">1 Bedroom Unit</MenuItem>
                    <MenuItem value="Studio Unit">Studio Unit</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                </FormControl><br/><br/>
                <TextField
                  label="Amount"
                  name="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  fullWidth required
                /><br/><br/>
                <TextField
                  label="Payment Type"
                  name="paymentType"
                  value={paymentType}
                  onChange={(e) => setpaymentType(e.target.value)}
                  fullWidth required
                /><br/><br/>
                <TextField
                  label="Date"
                  name="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  fullWidth required
                /><br/><br/>
                <TextField
                  label="Receipt"
                  name="receipt"
                  value={receipt}
                  onChange={(e) => setReceipt(e.target.value)}
                  fullWidth required
                /><br/><br/>
                <InputLabel>Upload receipt file: </InputLabel><br/>
                <input  label="Add image" type="file" 
                  onChange={handleImageChange} 
                />
          
            <DialogActions>
              <Button onClick={handleCloseAddFinanceDialog}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Add 
              </Button>
            </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
    </div>
  );
};

export default Finance;
