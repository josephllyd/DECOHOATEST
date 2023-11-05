import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import FinanceDetailsDialog from "./viewFinanceDialog";
import EditFinanceDialog from "./editFinanceDialog";
import { fetchUsers } from "api/usersApi";
import { handleEditFinanceSubmit, deleteFinance } from "api/financeApi";
import jsPDF from "jspdf";

const FinanceOptionsDialog = ({ selectedFinance, onCloseFinanceOptions, fetchFinance }) => {
  const [openFinanceDetails, setOpenFinanceDetails] = useState(false);
  const [isEditFinanceDialogOpen, setIsEditFinanceDialogOpen] = useState(false); 
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState({ _id: "", name: "" }); 
  const [editedName, setEditedName] = useState("");
  const [editedProperty, setEditedProperty] = useState("");
  const [editedPaymentType, setEditedPaymentType] = useState("");
  const [editedAmount, setEditedAmount] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedReceipt, setEditedReceipt] = useState("");
  const [editedImage, setEditedImage] = useState("");
  const [finance, setFinance] = useState([]);

  useEffect(() => {
    fetchUsers(setUsers);
  }, []);

  const handleOption1Click = () => {
    setOpenFinanceDetails(true);
  };

  const handleCloseFinanceDetails = () => {
    setOpenFinanceDetails(false);
  };

  const openEditFinanceDialog = (
  //  selectedFinance, 
    setEditedUser, 
    setEditedName, 
    setEditedProperty, 
    setEditedAmount, 
    setEditedPaymentType, 
    setEditedDate, 
    setEditedReceipt, 
    setEditedImage, 
    setIsEditFinanceDialogOpen
    ) => {
    setIsEditFinanceDialogOpen(true);
  
    if (selectedFinance) {
      setEditedUser(selectedFinance.user);
      setEditedName(selectedFinance.name);
      setEditedProperty(selectedFinance.property);
      setEditedAmount(selectedFinance.amount);
      setEditedPaymentType(selectedFinance.paymentType);
      setEditedDate(selectedFinance.date);
      setEditedReceipt(selectedFinance.receipt);
      setEditedImage(selectedFinance.image);
    }
  };
  
  const handleCloseEditFinanceDialog = () => {
    setIsEditFinanceDialogOpen(false); 
  };

  const handleDeleteFinance = () => {
    deleteFinance(selectedFinance, fetchFinance, setFinance); 
  };

  const handleOption3Click = () => {
    generatePDFReport();
  };

  const generatePDFReport = () => {
    if (!selectedFinance) {
      return;
    }

    const doc = new jsPDF();
    doc.text(`Finance Report`, 10, 10);
    doc.text(`Owner Name: ${selectedFinance.name}`, 10, 20);
    doc.text(`Property Name: ${selectedFinance.property}`, 10, 30);
    doc.text(`Amount: Php ${selectedFinance.amount}`, 10, 40);
    doc.text(`Payment Type: ${selectedFinance.paymentType}`, 10, 50);
    doc.text(`Date: ${new Date(selectedFinance.date).toLocaleDateString()}`, 10, 60);
    doc.text(`Receipt: ${selectedFinance.receipt}`, 10, 70);
    doc.addImage(`${selectedFinance.image}`, `JPEG`, 15, 60, 180, 180);

    // Save the PDF with a unique name, e.g., finance_report_123.pdf
    const fileName = `finance_report_${selectedFinance._id}.pdf`;
    doc.save(fileName);
  };

  return (
    <div>
      <Dialog open={selectedFinance !== null} onClose={onCloseFinanceOptions}>
        <DialogTitle sx={{ fontWeight: 'bold' , padding: '20px' }}>Finance Options</DialogTitle>
        <List sx={{ pt: 0 }}>
          <ListItem disableGutters>
            <ListItemButton onClick={handleOption1Click}>
              <ListItemText primary="View Finance" />
            </ListItemButton>
          </ListItem>
          <ListItem disableGutters>
            <ListItemButton onClick={() => 
                openEditFinanceDialog(
                  //  selectedFinance, 
                    setEditedUser, 
                    setEditedName, 
                    setEditedProperty, 
                    setEditedAmount, 
                    setEditedPaymentType, 
                    setEditedDate, 
                    setEditedReceipt, 
                    setEditedImage, 
                    setIsEditFinanceDialogOpen
                )}>
              <ListItemText primary="Edit Finance" />
            </ListItemButton>
          </ListItem>
          <ListItem disableGutters>
            <ListItemButton onClick={handleDeleteFinance}>
              <ListItemText primary="Delete Finance" />
            </ListItemButton>
          </ListItem>
          <ListItem disableGutters>
            <ListItemButton onClick={handleOption3Click}>
              <ListItemText primary="Generate Report" />
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
      <FinanceDetailsDialog
        open={openFinanceDetails}
        handleClose={handleCloseFinanceDetails}
        selectedFinance={selectedFinance}
      />
       <EditFinanceDialog
        isEditFinanceDialogOpen={isEditFinanceDialogOpen}
        handleCloseEditFinanceDialog={handleCloseEditFinanceDialog}
        users={users}
        editedUser = {editedUser} 
        setEditedUser = {setEditedUser}
        editedProperty = {editedProperty}
        setEditedProperty={setEditedProperty}
        editedName = {editedName}
        setEditedName={setEditedName}
        editedPaymentType = {editedPaymentType}
        setEditedPaymentType = {setEditedPaymentType}
        editedAmount = {editedAmount}
        setEditedAmount = {setEditedAmount}
        editedDate = {editedDate}
        setEditedDate = {setEditedDate}
        editedReceipt = {editedReceipt}
        setEditedReceipt = {setEditedReceipt}
        editedImage = {editedImage}
        setEditedImage = {setEditedImage}
        handleEditFinanceSubmit = {handleEditFinanceSubmit}
        // Pass the necessary props here
      />
    </div>
  );
};

export default FinanceOptionsDialog;
