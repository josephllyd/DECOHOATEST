import React from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Card } from "@mui/material";

const FinanceTable = ({ finance }) => {
  // Your JSX code
  return (
    <TableContainer component={Card} style={{ background: "none" }}>
         <Table>
            <TableHead>
              <TableRow style={{ background: "#333" }}>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>User</TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>Name</TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>Property</TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>Payment Type</TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>Date</TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>Receipt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {finance.map((finance, index) => (
                <TableRow key={index}>
                  <TableCell>{finance.user}</TableCell>
                  <TableCell>{finance.name}</TableCell>
                  <TableCell>{finance.property}</TableCell>
                  <TableCell>{finance.paymentType}</TableCell>
                  <TableCell>{finance.date}</TableCell>
                  <TableCell>{finance.receipt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
    </TableContainer>
  );
};

export default FinanceTable;
