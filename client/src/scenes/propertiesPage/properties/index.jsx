import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Typography,
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
  ListItemText, // Import TablePagination
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FlexBetween from "components/FlexBetween";
import { PersonPinCircleRounded, Search } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import jsPDF from "jspdf";


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
  const [isEditPropertyDialogOpen, setIsEditPropertyDialogOpen] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [image, setImage] = useState(null);
  const theme = useTheme();

  const handleRowClick = (property) => {
    setSelectedProperty(property);
  };

  const handleClosePropertyOptions = () => {
    setSelectedProperty(null);
  };

  const handleOption1Click = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOption3Click = () => {
    generatePDFReport();
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const openAddPropertyDialog = () => {
    setIsAddPropertyDialogOpen(true);
  };

  const closeAddPropertyDialog = () => {
    setIsAddPropertyDialogOpen(false);
    setName("");
    setPrice("");
    setCategory("");
    setDescription("");
    setCategory("");
    setImage(null);
  };

  const handleImageChange = (e) => {
    // Set the uploaded image in the state
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !description || !category || !image) {
      alert("All fields are required, including the image");
      return;
    }
  
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("token", localStorage.getItem("token"));
  
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
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("Property added successfully");
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

  

    const handleDeleteProperty = () => {
      if (!selectedProperty) {
        return;
      }
    
      // Show a confirmation dialog
      const confirmation = window.confirm("Are you sure you want to delete this property?");
    
      if (confirmation) {
        const propertyId = selectedProperty._id; // Assuming _id is the property's unique identifier
    
        const currentHostname = window.location.hostname;
        let baseUrl = "";
        if (currentHostname === "localhost") {
          baseUrl = "http://localhost:5000"; // Local environment
        } else {
          baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
        }
    
        const deletePropertyEndpoint = `/deleteProperty/${propertyId}`;
        const deletePropertyUrl = `${baseUrl}${deletePropertyEndpoint}`;
    
        fetch(deletePropertyUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "ok") {
              alert("Property deleted successfully");
              setSelectedProperty(null);
              fetchProperties();
            } else {
              alert("Failed to delete property");
            }
          })
          .catch((error) => {
            console.error("Error deleting property:", error);
          });
      }
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
      const sortedProperties = sortProperties(sortColumn, sortOrder);
      return sortedProperties.filter((property) => filteredProperties.includes(property));
    };

    const generatePDFReport = () => {
      if (!selectedProperty) {
        return;
      }
    
      const doc = new jsPDF();
      doc.text(`Property Report for ${selectedProperty.name}`, 10, 10);
      doc.text(`Owner: ${selectedProperty.owner}`, 10, 20);
      doc.text(`Price: Php ${selectedProperty.price.toLocaleString()}`, 10, 30);
      doc.text(`Description: ${selectedProperty.description}`, 10, 40);
      doc.text(`Category: ${selectedProperty.category}`, 10, 50);
    
      // Save the PDF with a unique name, e.g., property_report_123.pdf
      const fileName = `property_report_${selectedProperty._id}.pdf`;
      doc.save(fileName);
    };
    
   const sortedProperties = sortProperties(sortColumn, sortOrder);
   // const currentRows = sortedAndFilteredProperties.slice(indexOfFirstRow, indexOfLastRow) 
   //   || sortedProperties.slice(indexOfFirstRow, indexOfLastRow);

      const openEditPropertyDialog = () => {
        setIsEditPropertyDialogOpen(true);
      
        // Populate edited property details with selected property's data
        if (selectedProperty) {
          setEditedName(selectedProperty.name);
          setEditedPrice(selectedProperty.price);
          setEditedDescription(selectedProperty.description);
          setEditedCategory(selectedProperty.category);
        }
      };
      
      // Step 5: Close the Edit Property dialog
      const closeEditPropertyDialog = () => {
        setIsEditPropertyDialogOpen(false);
      };
      
      // Step 6: Handle the submission of edited property details
      const handleEditPropertySubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
      
        const editedProperty = {
          name: editedName,
          price: editedPrice,
          description: editedDescription,
          category: editedCategory,
          token: localStorage.getItem("token"),
        };
      
        const currentHostname = window.location.hostname;
        let baseUrl = "";
        if (currentHostname === "localhost") {
          baseUrl = "http://localhost:5000"; // Local environment
        } else {
          baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
        }
      
        const propertyId = selectedProperty._id; // Assuming _id is the property's unique identifier
        const editPropertyEndpoint = `/editProperty/${propertyId}`;
        const editPropertyUrl = `${baseUrl}${editPropertyEndpoint}`;
      
        fetch(editPropertyUrl, {
          method: "PUT", // Use PUT request to update the property
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(editedProperty),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "ok") {
              alert("Property edited successfully");
              // Update the property details in the frontend (state)
              const updatedProperties = properties.map((property) => {
                if (property._id === propertyId) {
                  return {
                    ...property,
                    ...editedProperty,
                  };
                }
                return property;
              });
              setProperties(updatedProperties);
              closeEditPropertyDialog();
            } else {
              alert("Failed to edit property");
            }
          });
      };


  return (
    
    <div style={{ flex: 1, padding: "40px", fontSize: "20px" }}>
      <div style={{  display: "flex",
        justifyContent: "space-between",
        alignItems: "center"}}
      >
        <Fab
          variant="extended"
          size="small"
          color="primary"
          onClick={openAddPropertyDialog}
          style={{ background: `#F2643D`, padding: '20px'}}
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
        <Table >
          <TableHead onChange={fetchProperties}>
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
                  <TableCell>Php {property.price.toLocaleString()}</TableCell>
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

      {/* Property Options Dialog */}
      <Dialog
        open={selectedProperty !== null}
        onClose={handleClosePropertyOptions}
       
      >
        <DialogTitle sx={{ fontWeight: 'bold' , padding: '20px'}}>Property Options</DialogTitle>
        <List sx={{ pt: 0 }}>
          <ListItem disableGutters>
            <ListItemButton onClick={handleOption1Click}>
              <ListItemText primary="View Property" />
            </ListItemButton>
          </ListItem>
          <ListItem disableGutters>
            <ListItemButton onClick={openEditPropertyDialog}>
              <ListItemText primary="Edit Property" />
            </ListItemButton>
          </ListItem>
          <ListItem disableGutters>
            <ListItemButton onClick={handleDeleteProperty}>
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

      {/*Edit property diaglog*/}
      <Dialog
        open={isEditPropertyDialogOpen}
        onClose={closeEditPropertyDialog}
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>Edit Property</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditPropertySubmit}>
          <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
              >
                <MenuItem value="Townhouse Unit">TownHouse</MenuItem>
                <MenuItem value="2 Bedroom Unit">2 Bedroom Unit</MenuItem>
                <MenuItem value="3 Bedroom Unit">3 Bedroom Unit</MenuItem>
                <MenuItem value="1 Bedroom Unit">1 Bedroom Unit</MenuItem>
                <MenuItem value="Studio Unit">Studio Unit</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Name"
              type="text"
              name="name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Price"
              type="number"
              name="price"
              value={editedPrice}
              onChange={(e) => setEditedPrice(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Description"
              type="text"
              name="description"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              fullWidth
              required
            />
            <DialogActions>
              <Button onClick={closeEditPropertyDialog} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save Changes
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
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
      <DialogTitle sx={{ fontWeight: 'bold' }}>Add Property</DialogTitle>
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
            /><br/><br/>
            <TextField
              label="Price"
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              required
            /><br/><br/>
            <TextField
              label="Description"
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              required
            /><br/><br/>
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
            </FormControl><br/><br/>
            <InputLabel>Add image: </InputLabel><br/>
            <input  label="Add image" type="file" 
              onChange={handleImageChange} 
            />
            <DialogActions>
              <Button onClick={closeAddPropertyDialog} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="contained">
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
