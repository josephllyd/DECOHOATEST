import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes, Link } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Properties from "scenes/propertiesPage/properties";
import Finance from "scenes/propertiesPage/finance";
import Vehicle from "scenes/propertiesPage/vehichle";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "scenes/home/Home";
import Login from "scenes/authentication/login";
import SignUp from "scenes/authentication/signup";
import ForgotPassword from "scenes/authentication/forgotPassword";
import Profile from "scenes/memberPages/profile";
import Members from "scenes/memberPages/members";
import Support from "scenes/managementPages/support";
import Settings from "scenes/managementPages/settings";
import Updates from "scenes/managementPages/updates";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  // Redirect to login if not logged in
  if (isLoggedIn !== "true") {
    return (
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              {/* Redirect to login when trying to access the dashboard */}
              <Route path="/dashboard" element={<Navigate to="/signin" />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    );
  }

  // Render dashboard for logged-in users
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/vehicle" element={<Vehicle />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/members" element={<Members />} />
              <Route path="/updates" element={<Updates />} />
              <Route path="/vehicle" element={<Vehicle />} />
              <Route path="/support" element={<Support />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
