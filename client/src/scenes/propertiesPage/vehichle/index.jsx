import React, { useEffect, useState } from "react";
import {
  Fab,
  InputBase,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  MenuItem,
  Popover,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FlexBetween from "components/FlexBetween";
import VehicleDialog from "./addVehicleDialog";
import { fetchUsers, handleEditUser, useUserData } from "api/usersApi";
import { fetchVehicles, deleteVehicle, addVehicle, editVehicle } from "api/vehiclesApi";
import { Search } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import UploadImage from "components/UploadImage";

const Vehicle = () => {

  
  const userData = useUserData();
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ _id: "", name: "" }); 
  const [vehicleName, setVehicleName] = useState("");
  const [parkingNo, setParkingNo] = useState("");
  const [plateNo, setPlateNo] = useState("");
  const [brand, setBrand] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddVehicleDialogOpen, setIsAddVehicleDialogOpen] = useState(false);
  const [vehicles, setVehicles] = useState([]); 
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicle, setVehicle] = useState([]);
  const [isEditPropertyDialogOpen, setIsEditPropertyDialogOpen] = useState(false);



  const handleOpenAddVehicleDialog = () => {
    setIsAddVehicleDialogOpen(true);
  };

  const handleCloseAddVehicleDialog = () => {
    setIsAddVehicleDialogOpen(false);
    setUser({ _id: "", name: "" });
    setVehicleName("");
    setParkingNo("");
    setPlateNo("");
    setBrand("");
    setDate("");
    setDescription("");
    setImage("");
  };

  useEffect(() => {
    //fetchUsers(setUsers);
    fetchVehicles(setVehicles);
  }, []);

  const handleCardClick = (event, selectedVehicle) => {
    if (selectedVehicle) {
      setAnchorEl(event.currentTarget);
      setSelectedVehicle(selectedVehicle);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleDeleteVehicle = async () => {
    if (selectedVehicle && selectedVehicle._id) {
      console.log("Selected Vehicle:", selectedVehicle);
      deleteVehicle(selectedVehicle, setSelectedVehicle, setVehicles);
      setAnchorEl(null);
    }
  };
  

  
  useEffect(() => {
    const currentHostname = window.location.hostname;
    let baseUrl = "";
    if (currentHostname === "localhost") {
      baseUrl = "http://localhost:5000"; // Local environment
    } else {
      baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
    }

    const getUsersEndpoint = "/getUsers";
    const getUsersUrl = `${baseUrl}${getUsersEndpoint}`;

    fetch(getUsersUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.users, "users");
        setUsers(data.users);
      });
  }, []);


  const handleSearch = () => {
  
    const filteredVehicle = vehicles.filter((vehicle) => {
      const vehiclesName = vehicle.vehicleName ? vehicle.vehicleName.toLowerCase() : '';
      const parkingsNumber = vehicle.parkingNo ? vehicle.parkingNo.toLowerCase() : '';
      const plateNumber = vehicle.plateNo ? vehicle.plateNo.toLowerCase() : '';
      const vehicleBrand = vehicle.brand ? vehicle.brand.toLowerCase() : '';
      const vehicleDescription = vehicle.description ? vehicle.description.toLowerCase() : '';
      const vehicleDate = vehicle.date ? vehicle.date.toLowerCase() : '';
      return (
        vehiclesName.includes(searchQuery.toLowerCase()) ||
        parkingsNumber.includes(searchQuery.toLowerCase()) ||
        plateNumber.includes(searchQuery.toLowerCase()) ||
        vehicleBrand.includes(searchQuery.toLowerCase()) ||
        vehicleDescription.includes(searchQuery.toLowerCase()) ||
        vehicleDate.includes(searchQuery.toLowerCase())
      );
    });
  
    return filteredVehicle;
  }; 

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editedVehicleName, setEditedVehicleName] = useState("");
    const [editedParkingNo, setEditedParkingNo] = useState("");
    const [editedPlateNo, setEditedPlateNo] = useState("");
    const [editedBrand, setEditedBrand] = useState("");
    const [editedDate, setEditedDate] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const [editedImage, setEditedImage] = useState("");

    const handleOpenEditDialog = (selectedVehicle) => {
      setIsEditDialogOpen(true);
      setEditedVehicleName(selectedVehicle.vehicleName);
      setEditedParkingNo(selectedVehicle.parkingNo);
      setEditedPlateNo(selectedVehicle.plateNo);
      setEditedBrand(selectedVehicle.brand);
      setEditedDate(selectedVehicle.date);
      setEditedDescription(selectedVehicle.description);
      setEditedImage(selectedVehicle.image);
      setSelectedVehicle(selectedVehicle);
    };

    const closeEditPropertyDialog = () => {
      setIsEditDialogOpen(false);
    };

    const handleEditVehicle = async () => {
      const editedVehicle = {
        vehicleName: editedVehicleName,
        parkingNo: editedParkingNo,
        plateNo: editedPlateNo,
        brand: editedBrand,
        date: editedDate,
        description: editedDescription,
        image: editedImage,
        token: localStorage.getItem("token"),
      };
    
      await editVehicle(selectedVehicle._id, editedVehicle);
    
      // Close the edit dialog and update the vehicles list
      setIsEditDialogOpen(false);
      fetchVehicles(setVehicles);
    };

    const vehicleId = selectedVehicle ? selectedVehicle._id : null;
    console.log("selectedVehicle:", selectedVehicle);
    
  return (
    <div style={{ flex: 1, padding: "20px", fontSize: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Fab variant="extended" size="small" color="primary" style={{ background: `#F2643D`, padding: "20px" }}  
            onClick={handleOpenAddVehicleDialog}>
          <AddIcon /> Vehicle
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
          <IconButton onClick={handleSearch}>
            <Search />
          </IconButton>
        </FlexBetween>
      </div>
      <br />
      <Grid container spacing={2}>
        {vehicles &&
         handleSearch().map((vehicle, index) => (
            <Grid item key={index} xs={12} sm={4} md={3}>
              <Card style={{ marginBottom: "20px", fontSize: 13 }}>
                <CardMedia
                  component="img"
                  height="140"
                  src={vehicle.image}
                  alt="vehicle photo"
                  onClick={(e) => handleCardClick(e, vehicle)}
                />
                <CardContent style={{ fontSize: 13 }}>
                  <div>
                    <strong>Vehicle Name: </strong> {vehicle.vehicleName}
                  </div>
                  <div>
                    <strong>Parking No: </strong> {vehicle.parkingNo}
                  </div>
                  <div>
                    <strong>Plate No: </strong> {vehicle.plateNo}
                  </div>
                  <div>
                    <strong>Brand: </strong> {vehicle.brand}
                  </div>
                  <div>
                    <strong>Description: </strong> {vehicle.description}
                  </div>
                  <div>
                    <strong>Date: </strong> {vehicle.date}
                  </div>
                </CardContent>
                  <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", padding: "5px", paddingLeft: "13px" }}>
                    {selectedVehicle && (
                      <IconButton onClick={(e) => handleCardClick(e, vehicle)}>
                        <MoreHorizIcon />
                      </IconButton>
                    )}
                  </div>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {selectedVehicle && (
          <div>
            <MenuItem onClick={() => handleOpenEditDialog(selectedVehicle)}>Edit</MenuItem>
            <MenuItem onClick={handleDeleteVehicle}>Delete</MenuItem>
            <MenuItem onClick={() => handleEditUser(selectedVehicle.id, {})}>Disable User</MenuItem>
            <MenuItem onClick={() => handleEditUser(selectedVehicle.id, {})}>View User</MenuItem>
          </div>
        )}
      </Popover>

       {/* Pop-up dialog for vehicle details */}
       <VehicleDialog
          isAddVehicleDialogOpen={isAddVehicleDialogOpen}
          handleOpenAddVehicleDialog={handleOpenAddVehicleDialog}
          handleCloseAddVehicleDialog={handleCloseAddVehicleDialog}
          users={users}
          user={user}
          setUser={setUser}
          vehicleName={vehicleName}
          setVehicleName={setVehicleName}
          parkingNo={parkingNo}
          setParkingNo={setParkingNo}
          plateNo={plateNo}
          setPlateNo={setPlateNo}
          brand={brand}
          setBrand={setBrand}
          description={description}
          setDescription={setDescription}
          date={date}
          setDate={setDate}
          image={image}
          setImage={setImage}
          addVehicle={addVehicle}
      />

          {/*Edit property diaglog*/}
      <Dialog
        open={isEditDialogOpen}
        onClose={closeEditPropertyDialog}
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>Edit Property</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditVehicle}>
          <TextField
                    label="Vehicle Name"
                    name="name"
                    type="name"
                    value={editedVehicleName}
                    onChange={(e) => setEditedVehicleName(e.target.value)}
                    fullWidth required
                /><br/><br/>
                <TextField
                    label="Parking Number"
                    name="parking number"
                    type="name"
                    value={editedParkingNo}
                    onChange={(e) => setEditedParkingNo(e.target.value)}
                    fullWidth required
                /><br/><br/>
                <TextField
                    label="Plate Number"
                    name="plate number"
                    value={editedPlateNo}
                    onChange={(e) => setEditedPlateNo(e.target.value)}
                    fullWidth required
                /><br/><br/>
                <TextField
                    label="Vehicle Brand"
                    name="brand"
                    type="name"
                    value={editedBrand}
                    onChange={(e) => setEditedBrand(e.target.value)}
                    fullWidth required
                /><br/><br/>
                <TextField
                    label="Vehicle Description"
                    name="Vehicle Description"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    fullWidth required
                /><br/><br/>
                <UploadImage 
                    value={image}
                    onImageChange={(url) => setImage(url)}
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

    </div>
  );
};

export default Vehicle;
