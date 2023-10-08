import React from 'react';
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  Person3Outlined,
} from "@mui/icons-material";
import FlexBetween from 'components/FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from 'state';
import profileImage from "assets/profile.jpeg"
import { AppBar, IconButton, InputBase, Toolbar, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';


const Navbar = ( {
    isSidebarOpen, 
    setIsSidebarOpen 
}) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    return <AppBar
        sx={{
            position: "static",
            background:"none",
            boxShadow: "none",
        }}
    >
        <Toolbar sx={{ justifyContent: "space-between"}}>
            {/* LEFT SIDE */}
            <FlexBetween>
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <MenuIcon/>
                </IconButton>
            </FlexBetween>

            {/* RIGHT SIDE */}
            <FlexBetween gap="1.5rem">
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlined sx={{ fontSize: "25px"}} />
                    ) : (
                        <LightModeOutlined sx={{ fontSize: "25px"}}/>
                    )}
                </IconButton>
                <Link to="/profile"> 
                    <IconButton>
                        <Person3Outlined sx={{ fontSize: "25px"}} />
                    </IconButton>
                </Link>
            </FlexBetween>
        </Toolbar>
    </AppBar>
}

export default Navbar