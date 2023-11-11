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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FlexBetween from "components/FlexBetween";
import VehicleDialog from "./addVehicleDialog";
import { fetchUsers, handleEditUser, useUserData } from "api/usersApi";
import { fetchVehicles, fetchData, addVehicle } from "api/vehiclesApi";
import { Search } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

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

  const handleCardClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
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
            <Grid item key={index} xs={12} sm={4} md={2}>
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
                  <IconButton onClick={(e) => handleCardClick(e, user)}>
                    <MoreHorizIcon />
                  </IconButton>
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
        {selectedUser && (
          <div>
            <MenuItem onClick={() => handleEditUser(selectedUser.id, {})}>Edit</MenuItem>
            <MenuItem onClick={() => handleEditUser(selectedUser.id, {})}>Delete</MenuItem>
            <MenuItem onClick={() => handleEditUser(selectedUser.id, {})}>Disable User</MenuItem>
            <MenuItem onClick={() => handleEditUser(selectedUser.id, {})}>View User</MenuItem>
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
    </div>
  );
};

export default Vehicle;
