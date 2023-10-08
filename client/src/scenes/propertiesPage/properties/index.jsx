import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination, // Import TablePagination
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Properties = () => {
  const [isAddPropertyDialogOpen, setIsAddPropertyDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchProperties();
  }, []);

  const openAddPropertyDialog = () => {
    setIsAddPropertyDialogOpen(true);
  };

  const closeAddPropertyDialog = () => {
    setIsAddPropertyDialogOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !description || !category) {
      alert("All fields are required");
      return;
    }

    const newProperty = {
      name,
      price,
      description,
      category,
      token: localStorage.getItem("token"), // Get the user's token from local storage
    };

    const currentHostname = window.location.hostname;
    let baseUrl = "";
    if (currentHostname === "localhost") {
      baseUrl = "http://localhost:5000"; // Local environment
    } else {
      baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
    }
    const addPropertyEndpoint = "/addProperty";
    const addPropertyUrl = `${baseUrl}${addPropertyEndpoint}`;
    fetch(addPropertyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(newProperty),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("Property added successfully");
          // Fetch properties again to update the list
          fetchProperties();
        } else {
          alert("Failed to add property");
        }
      });
  };

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

  const indexOfLastRow = (page + 1) * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = properties.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div style={{ flex: 1, padding: "20px", fontSize: "20px" }}>
      <Fab
        variant="extended"
        size="small"
        color="primary"
        onClick={openAddPropertyDialog}
        style={{ background: `#F2643D` }}
      >
        <AddIcon /> Property
      </Fab>
      <br/><br/>
      {/* Table to display properties */}
      <TableContainer component={Card}  style={{ background: "none" }}>
        <Table>
          <TableHead>
            <TableRow style={{ background: "#333" }}>
              <TableCell style={{ fontWeight: 'bold', color: 'white' }}>Name</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: 'white' }}>Price</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: 'white' }}>Description</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: 'white' }}>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((property) => (
              <TableRow key={property._id}>
                <TableCell>{property.name}</TableCell>
                <TableCell>{property.price}</TableCell>
                <TableCell>{property.description}</TableCell>
                <TableCell>{property.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
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

      {/* Add Property Dialog */}
      <Dialog open={isAddPropertyDialogOpen} onClose={closeAddPropertyDialog}>
        <DialogTitle>Add Property</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Price"
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Description"
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Category"
              type="text"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              fullWidth
              required
            />
            <DialogActions>
              <Button onClick={closeAddPropertyDialog} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Add Property
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Properties;
