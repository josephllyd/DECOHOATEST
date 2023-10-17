import React from "react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
} from "@mui/material";

function PropertyTable({
  currentRows,
  handleRowClick,
  sortColumn,
  sortOrder,
  handleSort,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  properties,
}) {
  // Move the table rendering code here
  return (
   <div style={{ flex: 1, padding: "20px", fontSize: "20px" }}>
      <TableContainer component={Card} style={{ background: "none" }}>
        <Table>
          <TableHead>
            <TableRow style={{ background: "#333" }}>
              <TableCell
                  style={{ fontWeight: 'bold', color: 'white' }}
                  onClick={() => handleSort("category")}
                >
                  <TableSortLabel
                    active={sortColumn === "category"}
                    direction={sortOrder}
                  >
                    Category
                  </TableSortLabel>
              </TableCell>
              <TableCell
                style={{ fontWeight: 'bold', color: 'white' }}
                onClick={() => handleSort("name")}
              >
                <TableSortLabel
                  active={sortColumn === "name"}
                  direction={sortOrder}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell
                style={{ fontWeight: 'bold', color: 'white' }}
                onClick={() => handleSort("owner")}
              >
                <TableSortLabel
                  active={sortColumn === "owner"}
                  direction={sortOrder}
                >
                  Owner Id
                </TableSortLabel>
              </TableCell>
              <TableCell
                style={{ fontWeight: 'bold', color: 'white' }}
                onClick={() => handleSort("price")}
              >
                <TableSortLabel
                  active={sortColumn === "price"}
                  direction={sortOrder}
                >
                  Price
                </TableSortLabel>
              </TableCell>
              <TableCell
                style={{ fontWeight: 'bold', color: 'white' }}
                onClick={() => handleSort("description")}
              >
                <TableSortLabel
                  active={sortColumn === "description"}
                  direction={sortOrder}
                >
                  Description
                </TableSortLabel>
              </TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((property) => (
                <TableRow
                  key={property._id}
                  onClick={() => handleRowClick(property)} // Handle row click
                  style={{ cursor: "pointer" }} // Change cursor to pointer
                >
                  <TableCell>{property.category}</TableCell>
                  <TableCell>{property.name}</TableCell>
                  <TableCell>{property.owner}</TableCell>
                  <TableCell>Php {property.price ? property.price.toLocaleString() : 'N/A'}</TableCell>
                  <TableCell>{property.description}</TableCell>
                  
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
     {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[100, 50, 30, 20, 10]}
        component="div"
        count={properties.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)} // Correct prop name
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />

    </div>
  );
}

export default PropertyTable;
