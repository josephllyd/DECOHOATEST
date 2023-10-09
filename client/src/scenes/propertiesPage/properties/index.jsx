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
  TableSortLabel,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  InputBase,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText, // Import TablePagination
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FlexBetween from "components/FlexBetween";
import { PersonPinCircleRounded, Search } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const Properties = () => {
  const [isAddPropertyDialogOpen, setIsAddPropertyDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [currentRows, setCurrentRows] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [open, setOpen] = React.useState(false);
  


  const handleOption1Click = () => {
    setOpen(true);
    //alert("Option 1 clicked");
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOption2Click = () => {
    // Handle Option 2 click here
    // You can perform any action you want for Option 2
    // For example, display a message or perform an operation
    alert("Option 2 clicked");
  };

  const handleOption3Click = () => {
    // Handle Option 3 click here
    // You can perform any action you want for Option 3
    // For example, display a message or perform an operation
    alert("Option 3 clicked");
  };

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
  //const currentRows = properties.slice(indexOfFirstRow, indexOfLastRow);

    //sorting function
    const sortProperties = (column, order) => {
      let sortedProperties = [...properties];
      sortedProperties.sort((a, b) => {
        const valueA = column === 'price' ? parseFloat(a[column]) : a[column];
        const valueB = column === 'price' ? parseFloat(b[column]) : b[column];

        if (valueA < valueB) return order === 'asc' ? -1 : 1;
        if (valueA > valueB) return order === 'asc' ? 1 : -1;
        return 0;
      });
      return sortedProperties;
    };


    const handleSort = (column) => {
      if (column === sortColumn) {
        // Toggle sort order if the same column is clicked
        const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newSortOrder);
      } else {
        // Set new sorting column and default to ascending order
        setSortColumn(column);
        setSortOrder("asc");
      }
    };

   // const currentRows = sortedProperties.slice(indexOfFirstRow, indexOfLastRow);

   useEffect(() => {
    const sortedAndFilteredProperties = handleSearch();
    setCurrentRows(sortedAndFilteredProperties.slice(indexOfFirstRow, indexOfLastRow));
  }, [searchQuery, sortColumn, sortOrder]);

    const handleSearch = () => {
      const filteredProperties = properties.filter((property) => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const priceString = property.price ? property.price.toString() : ''; // Convert price to string or use an empty string if it's undefined
        return (
          (property.name && property.name.toLowerCase().includes(lowerCaseQuery)) ||
          (property.owner && property.owner.toLowerCase().includes(lowerCaseQuery)) ||
          (priceString && priceString.includes(lowerCaseQuery)) ||
          (property.description && property.description.toLowerCase().includes(lowerCaseQuery)) ||
          (property.category && property.category.toLowerCase().includes(lowerCaseQuery))
        );
      });
      // Sort the filtered properties
      const sortedProperties = sortProperties(sortColumn, sortOrder);

      // Return the sorted and filtered properties
      return sortedProperties.filter((property) => filteredProperties.includes(property));
    };
  
   // const sortedAndFilteredProperties = handleSearch();
  
   const sortedProperties = sortProperties(sortColumn, sortOrder);
   // const currentRows = sortedAndFilteredProperties.slice(indexOfFirstRow, indexOfLastRow) 
   //   || sortedProperties.slice(indexOfFirstRow, indexOfLastRow);
    const theme = useTheme();

    const handleRowClick = (property) => {
      setSelectedProperty(property);
    };
  
    const handleClosePropertyOptions = () => {
      setSelectedProperty(null);
    };

  return (
    <div style={{ flex: 1, padding: "20px", fontSize: "20px" }}>
      <div style={{  display: "flex",
        justifyContent: "space-between",
        alignItems: "center"}}
      >
        <Fab
          variant="extended"
          size="small"
          color="primary"
          onClick={openAddPropertyDialog}
          style={{ background: `#F2643D` }}
        >
          <AddIcon /> Property
        </Fab>
        <FlexBetween
          backgroundColor={theme.palette.background.alt}
          borderRadius="9px"
          gap="3rem"
          padding="0.1rem 1.5rem"
        >
          <InputBase
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
            <IconButton>
              <Search/>
            </IconButton>
        </FlexBetween>
      </div>
      <br/>
      {/* Table to display properties */}
      <TableContainer component={Card} style={{ background: "none" }}>
        <Table>
          <TableHead>
            <TableRow style={{ background: "#333" }}>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((property) => (
                <TableRow
                  key={property._id}
                  onClick={() => handleRowClick(property)} // Handle row click
                  style={{ cursor: "pointer" }} // Change cursor to pointer
                >
                  <TableCell>{property.name}</TableCell>
                  <TableCell>{property.owner}</TableCell>
                  <TableCell>Php {property.price.toLocaleString()}</TableCell>
                  <TableCell>{property.description}</TableCell>
                  <TableCell>{property.category}</TableCell>
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

      {/* Property Options Dialog */}
      <Dialog
        open={selectedProperty !== null}
        onClose={handleClosePropertyOptions}
      >
        <DialogTitle>Property Option</DialogTitle>
        <List sx={{ pt: 0 }}>
          <ListItem disableGutters>
            <ListItemButton onClick={handleOption1Click}>
              <ListItemText primary="View Property" />
            </ListItemButton>
          </ListItem>
          <ListItem disableGutters>
            <ListItemButton onClick={handleOption2Click}>
              <ListItemText primary="Delete Property" />
            </ListItemButton>
          </ListItem>
          <ListItem disableGutters>
            <ListItemButton onClick={handleOption3Click}>
              <ListItemText primary="Generate Report" />
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
           Property Details
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
            {selectedProperty ? (
              <div>
                <Typography variant="h6">Name: {selectedProperty.name}</Typography>
                <Typography>Owner: {selectedProperty.owner}</Typography>
                <Typography>Price: Php {selectedProperty.price.toLocaleString()}</Typography>
                <Typography>Description: {selectedProperty.description}</Typography>
                <Typography>Category: {selectedProperty.category}</Typography>
              </div>
            ) : (
              <Typography>No property selected</Typography>
            )}
          </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>

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
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="Townhouse Unit">TownHouse</MenuItem>
                <MenuItem value="2 Bedroom Unit">2 Bedroom Unit</MenuItem>
                <MenuItem value="3 Bedroom Unit">3 Bedroom Unit</MenuItem>
                <MenuItem value="1 Bedroom Unit">1 Bedroom Unit</MenuItem>
                <MenuItem value="Studio Unit">Studio Unit</MenuItem>
                {/* Add more options as needed */}
              </Select>
            </FormControl>
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
