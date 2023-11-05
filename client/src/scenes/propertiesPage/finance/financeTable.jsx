import React from "react";
import { useState } from "react";
import { 
  TableContainer, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  Card,
  TablePagination 
} from "@mui/material";
import FinanceOptionsDialog from "./financeOptionsDialog";
import { fetchFinance } from "api/financeApi";

const FinanceTable = ({ finance, users }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedFinance, setSelectedFinance] = useState(null);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedFinance = finance.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const openFinanceOptionsDialog = (selectedFinance) => {
    setSelectedFinance(selectedFinance);
  };

  const handleCloseFinanceOptions = () => {
    setSelectedFinance(null);
  };

  return (
    <div>
    <TableContainer component={Card} style={{ background: "none" }}>
         <Table>
            <TableHead>
              <TableRow style={{ background: "#333" }}>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>Owner Name</TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>Property Name</TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>Property Type</TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>Amount</TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>Payment Type</TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>Date</TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>Receipt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedFinance.map((finance, index) => (
                 <TableRow key={index} 
                    onClick={() => openFinanceOptionsDialog(finance)}
                    style={{ cursor: "pointer" }}>
                  <TableCell>
                    {users.find((user) => user._id === finance.user)?.fname}{" "}
                    {users.find((user) => user._id === finance.user)?.lname}
                  </TableCell>
                  <TableCell>{finance.name}</TableCell>
                  <TableCell>{finance.property}</TableCell>
                  <TableCell>Php {finance.amount}</TableCell>
                  <TableCell>{finance.paymentType}</TableCell>
                  <TableCell>{new Date(finance.date).toLocaleDateString()}</TableCell>
                  <TableCell>{finance.receipt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
    </TableContainer>
    <TablePagination
        component="div"
        count={finance.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[10, 20, 30, 50, 100]}
      />
      <FinanceOptionsDialog
        selectedFinance={selectedFinance}
        setSelectedFinance = {setSelectedFinance}
        onCloseFinanceOptions={handleCloseFinanceOptions}
        fetchFinance={fetchFinance} 
      />
    </div>
  );
};

export default FinanceTable;