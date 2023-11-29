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
//import { handleEditFinanceSubmit } from "api/financeApi";

const EditFinanceDialog = (props) => {
  const {
    isEditFinanceDialogOpen,
    handleCloseEditFinanceDialog,
    users,
    editedUser,
    setEditedUser,
    editedName,
    setEditedName,
    editedProperty,
    setEditedProperty,
    editedPaymentType,
    setEditedPaymentType,
    editedAmount,
    setEditedAmount,
    editedDate,
    setEditedDate,
    editedReceipt,
    setEditedReceipt,
    editedImage,
    setEditedImage,
    handleEditFinanceSubmit,
    finance,
    setFinance,
  } = props;

  return (
    <Dialog open={isEditFinanceDialogOpen} onClose={handleCloseEditFinanceDialog}>
      <DialogTitle>Edit Finance Data</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => handleEditFinanceSubmit(
            e,
            editedUser,
            editedName,
            editedProperty,
            editedAmount,
            editedPaymentType,
            editedDate,
            editedReceipt,
            editedImage,
            finance,
            setFinance,
            )}>
        {/*<TextField
            select
            label="User"
            name="user"
            SelectProps={{
                native: true,
            }}
            value={editedUser?._id} // Add optional chaining here
            onChange={(e) =>
                setEditedUser({
                _id: e.target.value,
                name: e.currentTarget.textContent,
                })
            }
            fullWidth
            required
            >
            <option value=""></option>
            {users.map((editedUser) => (
                <option key={editedUser._id} value={editedUser._id}>
                {`${editedUser.fname} ${editedUser.lname}`}
                </option>
            ))}
        </TextField>

          <br />
            <br /> */}
          <TextField
            label="Property Name"
            name="name"
            type="name"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            fullWidth
            required
          />
          <br />
          <br />
          <FormControl fullWidth required>
            <InputLabel>Property Category</InputLabel>
            <Select value={editedProperty} 
                    onChange={(e) => 
                    setEditedProperty(e.target.value)
            }>
              <MenuItem value="Townhouse Unit">TownHouse</MenuItem>
              <MenuItem value="2 Bedroom Unit">2 Bedroom Unit</MenuItem>
              <MenuItem value="3 Bedroom Unit">3 Bedroom Unit</MenuItem>
              <MenuItem value="1 Bedroom Unit">1 Bedroom Unit</MenuItem>
              <MenuItem value="Studio Unit">Studio Unit</MenuItem>
              {/* Add more options as needed */}
            </Select>
          </FormControl>
          <br />
          <br />
          <TextField
            label="Amount"
            name="amount"
            type="number"
            value={editedAmount}
            onChange={(e) => setEditedAmount(e.target.value)}
            fullWidth
            required
          />
          <br />
          <br />
          <TextField
            label="Payment Type"
            name="paymentType"
            value={editedPaymentType}
            onChange={(e) => setEditedPaymentType(e.target.value)}
            fullWidth
            required
          />
          <br />
          <br />
        {/*  <TextField
            label="Date"
            name="date"
            type="date"
            value={editedDate}
            onChange={(e) => setEditedDate(e.target.value)}
            fullWidth
            required
          />
          <br />
          <br /> */}  
          <TextField
            label="Receipt Name"
            name="receipt"
            value={editedReceipt}
            onChange={(e) => setEditedReceipt(e.target.value)}
            fullWidth
            required
          />
          <br />
          <br />
          <UploadImage value={editedImage} 
            onImageChange={(url) => 
            setEditedImage(url)} />
          <DialogActions>
            <Button onClick={handleCloseEditFinanceDialog}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditFinanceDialog;
