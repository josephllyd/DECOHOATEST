import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import UploadImage from "components/UploadImage";

const VehicleDialog = ({ open, onClose, onSave }) => {
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
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Vehicle</DialogTitle>
      <DialogContent>
        {/* Form fields for vehicle details */}
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
        {/* ... (add other fields as needed) */}
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleDialog;
