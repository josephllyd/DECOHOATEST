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
  import AddUpdatesDialog from "./addUpdates";
  import { fetchUsers, handleEditUser, useUserData } from "api/usersApi";
  import {fetchUpdates, addUpdates, deleteUpdate} from "api/updatesApi"
  import { Search } from "@mui/icons-material";
  import { useTheme } from "@mui/material/styles";

  const Update = () => {
    const userData = useUserData();
    const theme = useTheme();
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ _id: "", name: "" }); 
    const [updateSubj, setUpdateSubj] = useState("");
    const [updateType, setUpdateType] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddUpdateDialogOpen, setIsAddUpdateDialogOpen] = useState(false);
    const [update, setUpdates] = useState([]); 
    const [selectedUpdate, setSelectedUpdate] = useState(null);

    const handleOpenAddUpdateDialog = () => {
      setIsAddUpdateDialogOpen(true);
    };

    const handleCloseAddUpdateDialog = () => {
      setIsAddUpdateDialogOpen(false);
      setUser({ _id: "", name: "" });
      setUpdateSubj("");
      setUpdateType("");
      setDate("");
      setDescription("");
      setImage("");
    };


    useEffect(() => {
      //fetchUsers(setUsers);
      fetchUpdates(setUpdates);
    }, []);

    const handleCardClick = (event, selectedUpdate) => {
      setAnchorEl(event.currentTarget);
      setSelectedUser(user);
      setSelectedUpdate(selectedUpdate);
    };

    const handleClose = () => {
      setAnchorEl(null);
      setSelectedUser(null);
    };

    const handleDeleteUpdate = async () => {
      console.log("Selected Update:", selectedUpdate);
      if (selectedUpdate) {
          deleteUpdate(selectedUpdate, setSelectedUpdate, setUpdates);
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
    
      const filteredUpdate = update.filter((updates) => {
        const updatesSubj = updates.updateSubj ? updates.updateSubj.toLowerCase() : '';
        const updatesType = updates.updateType ? updates.updateType.toLowerCase() : '';
        const updatesDescription = updates.description ? updates.description.toLowerCase() : '';
        const updatesDate = updates.date ? updates.date.toLowerCase() : '';
        return (
          updatesSubj.includes(searchQuery.toLowerCase()) ||
          updatesType.includes(searchQuery.toLowerCase()) ||
          updatesDate.includes(searchQuery.toLowerCase()) ||
          updatesDescription.includes(searchQuery.toLowerCase())
        );
      });
    
      return filteredUpdate;
    }; 
    


    return (
      <div style={{ flex: 1, padding: "20px", fontSize: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Fab variant="extended" size="small" color="primary" style={{ background: `#F2643D`, padding: "20px" }}  
              onClick={handleOpenAddUpdateDialog}>
            <AddIcon /> Update
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
          {update &&
          handleSearch().map((updates, index) => (
              <Grid item key={index} xs={12} sm={4} md={4}>
                <Card style={{ marginBottom: "20px", fontSize: 13 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    src={updates.image}
                    alt="updates photo"
                    onClick={(e) => handleCardClick(e, updates)}
                  />
                  <CardContent style={{ fontSize: 13 }}>
                    <div>
                      <strong>Update Subject: </strong> {updates.updateSubj}
                    </div>
                    <div>
                      <strong> Update Type: </strong> {updates.updateType}
                    </div>
                    <div>
                      <strong>Update Description: </strong> {updates.description}
                    </div>
                    <div>
                      <strong>Date: </strong> {updates.date}
                    </div>
                  </CardContent>
                  <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", padding: "5px", paddingLeft: "13px" }}>
                    <IconButton onClick={(e) => handleCardClick(e, updates)}>
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
          {selectedUpdate && (
            <div>
              <MenuItem onClick={() => handleEditUser(selectedUser.id, {})}>Edit</MenuItem>
              <MenuItem onClick={handleDeleteUpdate}>Delete</MenuItem>
              <MenuItem onClick={() => handleEditUser(selectedUser.id, {})}>Disable User</MenuItem>
              <MenuItem onClick={() => handleEditUser(selectedUser.id, {})}>View User</MenuItem>
            </div>
          )}
        </Popover>

        {/* Pop-up dialog for update details */}
        <AddUpdatesDialog
            isAddUpdateDialogOpen={isAddUpdateDialogOpen}
            handleOpenAddUpdateDialog={handleOpenAddUpdateDialog}
            handleCloseAddUpdateDialog={handleCloseAddUpdateDialog}
            users={users}
            user={user}
            setUser={setUser}
            updateSubj={updateSubj}
            setUpdateSubj={setUpdateSubj}
            updateType={updateType}
            setUpdateType={setUpdateType}
            description={description}
            setDescription={setDescription}
            date={date}
            setDate={setDate}
            image={image}
            setImage={setImage}
            addUpdates={addUpdates}
        />
      </div>
    );
  };

  export default Update;
