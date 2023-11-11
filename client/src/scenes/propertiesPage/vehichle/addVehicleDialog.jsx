import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from "@mui/material";
import UploadImage from "components/UploadImage";

const VehicleDialog = ( props) => {
    const {
        isAddVehicleDialogOpen,
        handleCloseAddVehicleDialog,
        vehicleName,
        setVehicleName,
        parkingNo,
        setParkingNo,
        plateNo,
        setPlateNo,
        brand,
        setBrand,
        description,
        setDescription,
        date,
        setDate,
        image,
        setImage,
        users,
        user,
        setUser,
        addVehicle,
      } = props;
  

  return (
    <Dialog open={isAddVehicleDialogOpen} onClose={handleCloseAddVehicleDialog}>
        <DialogTitle>Add Vehicle Data</DialogTitle>
        <DialogContent>
            <form onSubmit={(e) => addVehicle(e, user, vehicleName, parkingNo, plateNo, brand, description, date, image)}>
                <TextField
                    select
                    label="User"
                    name="user"
                    SelectProps={{
                        native: true,
                    }}
                    value={user._id} // Adjust the value
                    onChange={(e) => setUser({ 
                        _id: e.target.value, 
                        name: e.currentTarget.textContent 
                    })} // Adjust the setUser function
                    fullWidth
                    required
                >
                <option value=""></option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>
                        {`${user.fname} ${user.lname}`}
                        </option>
                    ))}
                </TextField><br/><br/>
                <TextField
                    label="Vehicle Name"
                    name="name"
                    type="name"
                    value={vehicleName}
                    onChange={(e) => setVehicleName(e.target.value)}
                    fullWidth required
                /><br/><br/>
                <TextField
                    label="Parking Number"
                    name="parking number"
                    type="name"
                    value={parkingNo}
                    onChange={(e) => setParkingNo(e.target.value)}
                    fullWidth required
                /><br/><br/>
                <TextField
                    label="Plate Number"
                    name="plate number"
                    value={plateNo}
                    onChange={(e) => setPlateNo(e.target.value)}
                    fullWidth required
                /><br/><br/>
                <TextField
                    label="Vehicle Brand"
                    name="brand"
                    type="name"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    fullWidth required
                /><br/><br/>
                <TextField
                    label="Vehicle Description"
                    name="Vehicle Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth required
                /><br/><br/>
                <TextField
                  label="Date"
                  name="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  fullWidth required
                /><br/><br/>
                <UploadImage  
                    value={image}
                    onImageChange={(url) => setImage(url)}
                />
        
            <DialogActions>
            <Button onClick={handleCloseAddVehicleDialog}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
                Add 
            </Button>
            </DialogActions>
            </form>
        </DialogContent>
    </Dialog>
  );
};

export default VehicleDialog;


/*
  <TextField
          label="Vehicle Name"
          name="vehicleName"
          value={vehicleData.vehicleName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
         <TextField
          label="Parking Number"
          name="parkingNo"
          value={vehicleData.parkingNo}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
         <TextField
          label="Plate Number"
          name="plateNo"
          value={vehicleData.plateNo}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
         <TextField
          label="Vehicle Brand"
          name="brand"
          value={vehicleData.brand}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
         <TextField
          label="Vehicle Description"
          name="description"
          value={vehicleData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
         <TextField
          label="Vehicle Description"
          name="description"
          value={vehicleData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <UploadImage  
            value={vehicleData.image}
            onImageChange={(url) => setImage(url)}
        />
  open, onClose, onSave
  const [vehicleData, setVehicleData] = useState({
    vehicleName: "",
    parkingNo: "",
    plateNo: "",
    brand: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const setImage = (url) => {
    setVehicleData((prevData) => ({
      ...prevData,
      image: url,
    }));
  };

  const handleSave = () => {
    onSave(vehicleData);
  }; */