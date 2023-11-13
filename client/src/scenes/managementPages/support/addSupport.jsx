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

const AddSupportDialog = ( props) => {
    const {
        isAddSupportDialogOpen,
        handleCloseAddSupportDialog,
        supportSubj,
        setSupportSubj,
        supportType,
        setSupportType,
        description,
        setDescription,
        date,
        setDate,
        image,
        setImage,
        users,
        user,
        setUser,
        addSupport,
      } = props;
  

  return (
    <Dialog open={isAddSupportDialogOpen} onClose={handleCloseAddSupportDialog}>
        <DialogTitle>Add Support Data</DialogTitle>
        <DialogContent>
            <form onSubmit={(e) => addSupport( 
                e,
                user,
                supportSubj,
                supportType,
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
                    label="Support Subject"
                    name="name"
                    type="name"
                    value={supportSubj}
                    onChange={(e) => setSupportSubj(e.target.value)}
                    fullWidth required
                /><br/><br/>
                  <TextField
                    label="Support Type"
                    name="name"
                    type="name"
                    value={supportType}
                    onChange={(e) => setSupportType(e.target.value)}
                    fullWidth required
                /><br/><br/>
                <TextField
                    label="Support Description"
                    name="Support Description"
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
            <Button onClick={handleCloseAddSupportDialog}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
                Add 
            </Button>
            </DialogActions>
            </form>
        </DialogContent>
    </Dialog>
  );
};

export default AddSupportDialog;
