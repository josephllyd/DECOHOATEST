import React from "react";
import { 
  TableContainer, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  Card 
} from "@mui/material";

const FinanceTable = ({ finance, users }) => {
  return (
    <TableContainer component={Card} style={{ background: "none" }}>
         <Table>
            <TableHead>
              <TableRow style={{ background: "#333" }}>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>Owner Name</TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>Propety Name</TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>Property Type</TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>Amount</TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>Payment Type</TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>Date</TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>Receipt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {finance.map((finance, index) => (
                <TableRow key={index}>
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
  );
};

export default FinanceTable;
