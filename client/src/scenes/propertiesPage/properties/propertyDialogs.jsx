import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Button,
} from "@mui/material";

function AddPropertyDialog({
  isAddPropertyDialogOpen,
  closeAddPropertyDialog,
  name,
  price,
  description,
  category,
  setName,
  setPrice,
  setDescription,
  setCategory,
  handleSubmit,
}) {
  return (
    <Dialog open={isAddPropertyDialogOpen} onClose={closeAddPropertyDialog}>
      <DialogTitle>Add Property</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
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
            </Select>
          </FormControl>
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
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeAddPropertyDialog}>Cancel</Button>
        <Button type="submit" color="primary" onClick={handleSubmit}>
          Add Property
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function EditPropertyDialog({
  isEditPropertyDialogOpen,
  closeEditPropertyDialog,
  editedName,
  editedPrice,
  editedDescription,
  editedCategory,
  setEditedName,
  setEditedPrice,
  setEditedDescription,
  setEditedCategory,
  handleEditPropertySubmit,
}) {
  return (
    <Dialog open={isEditPropertyDialogOpen} onClose={closeEditPropertyDialog}>
      <DialogTitle>Edit Property</DialogTitle>
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
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeEditPropertyDialog}>Cancel</Button>
        <Button type="submit" color="primary" onClick={handleEditPropertySubmit}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function PropertyOptionsDialog({
  selectedProperty,
  handleClosePropertyOptions,
  handleOption1Click,
  openEditPropertyDialog,
  handleDeleteProperty,
  handleOption3Click,
}) {
  return (
    <Dialog
      open={selectedProperty !== null}
      onClose={handleClosePropertyOptions}
    >
      <DialogTitle>Property Options</DialogTitle>
      <List>
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
  );
}

export { AddPropertyDialog, EditPropertyDialog, PropertyOptionsDialog };
