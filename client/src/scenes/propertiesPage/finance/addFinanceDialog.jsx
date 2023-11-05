import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import UploadImage from "components/UploadImage";
import { fetchUsers } from "api/usersApi";

const AddFinanceDialog = (props) => {
  const {
    isAddFinanceDialogOpen,
    handleCloseAddFinanceDialog,
    users,
    user,
    setUser,
    name,
    setName,
    property,
    setProperty,
    paymentType,
    setpaymentType,
    amount,
    setAmount,
    date,
    setDate,
    receipt,
    setReceipt,
    image,
    setImage,
    handleImageChange,
    addFinance,
  } = props;

  return (
    <Dialog open={isAddFinanceDialogOpen} onClose={handleCloseAddFinanceDialog}>
        <DialogTitle>Add Finance Data</DialogTitle>
          <DialogContent>
            <form onSubmit={(e) => addFinance(e, user, name, property, amount, paymentType, date, receipt, image)}>
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
                <TextField
                  label="Property Name"
                  name="name"
                  type="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth required
                /><br/><br/>
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
                  label="Receipt Name"
                  name="receipt"
                  value={receipt}
                  onChange={(e) => setReceipt(e.target.value)}
                  fullWidth required
                /><br/><br/>
                <UploadImage  
                    value={image}
                    onImageChange={(url) => setImage(url)}
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
  );
};

export default AddFinanceDialog;