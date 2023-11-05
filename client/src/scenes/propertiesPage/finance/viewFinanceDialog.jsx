import React from "react";
import {
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const FinanceDetailsDialog = ({ open, handleClose, selectedFinance }) => {
  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Finance Details
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        {selectedFinance ? (
          <div>
            <Typography variant="h6">Owner Name: {selectedFinance.name}</Typography>
            <Typography>Property Name: {selectedFinance.property}</Typography>
            <Typography>Property Type: {selectedFinance.paymentType}</Typography>
            <Typography>Amount: Php {selectedFinance.amount}</Typography>
            <Typography>Payment Type: Php {selectedFinance.paymentType}</Typography>
            <Typography>Date: {new Date(selectedFinance.date).toLocaleDateString()}</Typography>
            <Typography>Receipt: {selectedFinance.receipt}</Typography>
            <Typography>
                { selectedFinance.image ? (
                <img
                    src={selectedFinance.image}
                    alt="uploaded"
                    style={{ width: "100%", height: "auto" }}
                />
                ) : (
                    <img
                      src="https://files.jotform.com/jotformapps/payment-receipt-template-5fd30596666e2866e04390d48ec89876.png?v=1698993498" // Replace this with the path to your alternative image
                      alt="property"
                      style={{ width: "100%", height: "auto" }}
                    />
                )}
            </Typography>
          </div>
        ) : (
          <Typography>No finance selected</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FinanceDetailsDialog;
