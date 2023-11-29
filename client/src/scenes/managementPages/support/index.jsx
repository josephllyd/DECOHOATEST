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
    DialogActions,
    Button,
  } from "@mui/material";
  import AddIcon from "@mui/icons-material/Add";
  import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
  import FlexBetween from "components/FlexBetween";
  import AddSupportDialog from "./addSupport";
  import { fetchUsers, handleEditUser, useUserData } from "api/usersApi";
  import { fetchSupport, addSupport, deleteSupport, editSupport } from "api/supportApi";
  import { Search } from "@mui/icons-material";
  import { useTheme } from "@mui/material/styles";
import UploadImage from "components/UploadImage";

  const Support= () => {
    const userData = useUserData();
    const theme = useTheme();
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ _id: "", name: "" }); 
    const [supportSubj, setSupportSubj] = useState("");
    const [supportType, setSupportType] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddSupportDialogOpen, setIsAddSupportDialogOpen] = useState(false);
    const [support, setSupport] = useState([]); 
    const [supports, setSupports] = useState([]); 
    const [selectedSupport, setSelectedSupport] = useState(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editedSupportSubj, setEditedSupportSubj] = useState("");
    const [editedSupportType, setEditedSupportType] = useState("");
    const [editedDate, setEditedDate] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const [editedImage, setEditedImage] = useState("");

    const handleOpenEditDialog = (selectedSupport) => {
      setIsEditDialogOpen(true);
      setEditedSupportSubj(selectedSupport.supportSubj);
      setEditedSupportType(selectedSupport.supportType);
      setEditedDate(selectedSupport.date);
      setEditedDescription(selectedSupport.description);
      setEditedImage(selectedSupport.image);
      setSelectedSupport(selectedSupport);
    };

    const closeEditPropertyDialog = () => {
      setIsEditDialogOpen(false);
    };

    const handleEditSupport = async () => {
      const editedSupport = {
        supportSubj: editedSupportSubj,
        supportType: editedSupportType,
        date: editedDate,
        description: editedDescription,
        image: editedImage,
        token: localStorage.getItem("token"),
      };
    
      await editSupport(selectedSupport._id, editedSupport);
      setIsEditDialogOpen(false);
      fetchSupport(setSupport);
    };

    const handleOpenAddSupportDialog = () => {
      setIsAddSupportDialogOpen(true);
    };

    const handleCloseAddSupportDialog = () => {
      setIsAddSupportDialogOpen(false);
      setUser({ _id: "", name: "" });
      setSupportSubj("");
      setSupportType("");
      setDate("");
      setDescription("");
      setImage("");
    };


    useEffect(() => {
      //fetchUsers(setUsers);
      fetchSupport(setSupport);
    }, []);

    const handleCardClick = (event, selectedSupport) => {
      setAnchorEl(event.currentTarget);
      setSelectedUser(user);
      setSelectedSupport(selectedSupport);
    };

    const handleClose = () => {
      setAnchorEl(null);
      setSelectedUser(null);
    };

    const handleDeleteSupport = async () => {
      console.log("Selected Support:", selectedSupport);
      if (selectedSupport) {
          deleteSupport(selectedSupport, setSelectedSupport, setSupport);
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
    
      const filteredSupport = support.filter((support) => {
        const supportSubj = support.supportSubj ? support.supportSubj.toLowerCase() : '';
        const supportType = support.supportType ? support.supportType.toLowerCase() : '';
        const supportDescription = support.description ? support.description.toLowerCase() : '';
        const supportDate = support.date ? support.date.toLowerCase() : '';
        return (
          supportSubj.includes(searchQuery.toLowerCase()) ||
          supportType.includes(searchQuery.toLowerCase()) ||
          supportDate.includes(searchQuery.toLowerCase()) ||
          supportDescription.includes(searchQuery.toLowerCase())
        );
      });
    
      return filteredSupport;
    }; 
    


    return (
      <div style={{ flex: 1, padding: "20px", fontSize: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Fab variant="extended" size="small" color="primary" style={{ background: `#F2643D`, padding: "20px" }}  
              onClick={handleOpenAddSupportDialog}>
            <AddIcon /> Support
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
          {support &&
          handleSearch().map((support, index) => (
              <Grid item key={index} xs={12} sm={4} md={2}>
                <Card style={{ marginBottom: "20px", fontSize: 13 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    src={support.image}
                    alt="support photo"
                    onClick={(e) => handleCardClick(e, support)}
                  />
                  <CardContent style={{ fontSize: 13 }}>
                    <div>
                      <strong>Support Subject: </strong> {support.supportSubj}
                    </div>
                    <div>
                      <strong> Support Type: </strong> {support.supportType}
                    </div>
                    <div>
                      <strong>Support Description: </strong> {support.description}
                    </div>
                    <div>
                      <strong>Date: </strong> {support.date}
                    </div>
                  </CardContent>
                  <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", padding: "5px", paddingLeft: "13px" }}>
                    <IconButton onClick={(e) => handleCardClick(e, support)}>
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
          {selectedSupport && (
            <div>
              <MenuItem onClick={() => handleOpenEditDialog(selectedSupport)}>Edit</MenuItem>
              <MenuItem onClick={handleDeleteSupport}>Delete</MenuItem>
              <MenuItem onClick={() => handleEditUser(selectedUser.id, {})}>Disable User</MenuItem>
              <MenuItem onClick={() => handleEditUser(selectedUser.id, {})}>View User</MenuItem>
            </div>
          )}
        </Popover>

        {/* Pop-up dialog for support details */}
        <AddSupportDialog
            isAddSupportDialogOpen={isAddSupportDialogOpen}
            handleOpenAddSupportDialog={handleOpenAddSupportDialog}
            handleCloseAddSupportDialog={handleCloseAddSupportDialog}
            users={users}
            user={user}
            setUser={setUser}
            supportSubj={supportSubj}
            setSupportSubj={setSupportSubj}
            supportType={supportType}
            setSupportType={setSupportType}
            description={description}
            setDescription={setDescription}
            date={date}
            setDate={setDate}
            image={image}
            setImage={setImage}
            addSupport={addSupport}
        />

                 {/*Edit property diaglog*/}
      <Dialog
        open={isEditDialogOpen}
        onClose={closeEditPropertyDialog}
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>Edit Property</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditSupport}>
          <TextField
                    label="Support Subject"
                    name="name"
                    type="name"
                    value={editedSupportSubj}
                    onChange={(e) => setEditedSupportSubj(e.target.value)}
                    fullWidth required
                /><br/><br/>
                <TextField
                    label="Support Type"
                    name="name"
                    type="name"
                    value={editedSupportType}
                    onChange={(e) => setEditedSupportType(e.target.value)}
                    fullWidth required
                /><br/><br/>
                <TextField
                    label="Support Description"
                    name="Support Description"
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

  export default Support;
