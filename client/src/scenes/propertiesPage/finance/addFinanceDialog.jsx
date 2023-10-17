import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

const AddFinanceDialog = ({ isOpen, onClose, handleSubmit, financeData, setFinanceData, users, properties }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ fontWeight: "bold" }}>Add Finance Report</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Select
            labelId="user-label"
            id="user"
            value={financeData.user}
            onChange={(e) => setFinanceData({ ...financeData, user: e.target.value })}
            fullWidth
            required
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
          <Select
            labelId="property-label"
            id="property"
            value={financeData.property}
            onChange={(e) => setFinanceData({ ...financeData, property: e.target.value })}
            fullWidth
            required
          >
            {properties.map((property) => (
              <MenuItem key={property.id} value={property.id}>
                {property.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Amount"
            type="number"
            name="amount"
            value={financeData.amount}
            onChange={(e) => setFinanceData({ ...financeData, amount: e.target.value })}
            fullWidth
            required
          />
          <TextField
            label="Payment Type"
            type="text"
            name="paymentType"
            value={financeData.paymentType}
            onChange={(e) => setFinanceData({ ...financeData, paymentType: e.target.value })}
            fullWidth
            required
          />
          <TextField
            label="Date"
            type="date"
            name="date"
            value={financeData.date}
            onChange={(e) => setFinanceData({ ...financeData, date: e.target.value })}
            fullWidth
            required
          />
          <TextField
            label="Receipt"
            type="text"
            name="receipt"
            value={financeData.receipt}
            onChange={(e) => setFinanceData({ ...financeData, receipt: e.target.value })}
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary" onClick={handleSubmit}>
          Add Finance Data
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFinanceDialog;
