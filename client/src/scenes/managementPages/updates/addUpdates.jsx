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

const AddUpdatesDialog = ( props) => {
    const {
        isAddUpdateDialogOpen,
        handleCloseAddUpdateDialog,
        updateSubj,
        setUpdateSubj,
        updateType,
        setUpdateType,
        description,
        setDescription,
        date,
        setDate,
        image,
        setImage,
        users,
        user,
        setUser,
        addUpdates,
      } = props;
  

  return (
    <Dialog open={isAddUpdateDialogOpen} onClose={handleCloseAddUpdateDialog}>
        <DialogTitle>Add Update Data</DialogTitle>
        <DialogContent>
            <form onSubmit={(e) => addUpdates( 
                e,
                user,
                updateSubj,
                updateType,
                description,
                date,
                image,
                )}>
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
                    label="Update Subject"
                    name="name"
                    type="name"
                    value={updateSubj}
                    onChange={(e) => setUpdateSubj(e.target.value)}
                    fullWidth required
                /><br/><br/>
                  <TextField
                    label="Update Type"
                    name="name"
                    type="name"
                    value={updateType}
                    onChange={(e) => setUpdateType(e.target.value)}
                    fullWidth required
                /><br/><br/>
                <TextField
                    label="Update Description"
                    name="Update Description"
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
            <Button onClick={handleCloseAddUpdateDialog}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
                Add 
            </Button>
            </DialogActions>
            </form>
        </DialogContent>
    </Dialog>
  );
};

export default AddUpdatesDialog;
