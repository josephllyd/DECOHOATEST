import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes, Link } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "scenes/home/Home";
import Login from "scenes/authentication/login";
import SignUp from "scenes/authentication/signup";
import ForgotPassword from "scenes/authentication/forgotPassword";

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
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
