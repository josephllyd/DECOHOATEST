import React, { Component } from "react";
import { Link } from "react-router-dom";
import logoImage from "../../assets/homelogo.png";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      cpassword: "",
      userType: "",
      adminPassword: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      fname,
      lname,
      email,
      password,
      cpassword,
      userType,
      adminPassword
    } = this.state;

    if (
      !fname ||
      !lname ||
      !email ||
      !password ||
      !cpassword ||
      !userType 
     // Admin password required if userType is Admin
    ) {
      alert("All fields are required");
      return;
    }
  
    if (password.length < 6) {
      alert("Passwords must be at least 6 characters");
      return; 
    }
    // Check if the passwords match
    if (password !== cpassword) {
      alert("Passwords do not match");
      return; 
    }

    if (userType === "Admin" && adminPassword !== "adminpass") {
      alert("Incorrect admin password");
      return;
    }
  
    // Get the current hostname
    const currentHostname = window.location.hostname;
    let baseUrl = "";

    if (currentHostname === "localhost") {
      baseUrl = "http://localhost:5000"; // Local environment
    } else {
      baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
    }

    const signupEndpoint = "/signup";
    const signupUrl = `${baseUrl}${signupEndpoint}`;
    const formattedUserType = userType.toLowerCase();
    console.log(fname, lname, email, password, cpassword, formattedUserType, adminPassword);
    fetch(signupUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fname,
        email,
        lname,
        password,
        cpassword,
        userType: formattedUserType, 
        adminPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          alert("Registration Successful");
          window.location.href = "./dashboard";
        } else {
          alert("Something went wrong");
        }
      });
  }

  render() {
    return (
      <div
        className="app"
        style={{
          backgroundColor: "black",
        }}
      >
        <div className="auth-inner">
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px", paddingLeft: "70px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px" }}>
            <a href="/">
              <img src={logoImage} alt="DECOHOA Logo" />
            </a>
            <ul className="links">
              <Link to="/signup">Sign Up</Link>
              <Link to="/signin">Sign in</Link>
            </ul>
          </div>
        </div>
        <div 
          style={{
            flex: 1, 
            paddingTop: "10px",
            paddingLeft: "80px",
            paddingRight: "80px",
            paddingBottom: "80px"}}>
          <form onSubmit={this.handleSubmit}>
            <h3>Sign Up</h3>
         {/* New input field for user type as radio buttons */}
         <div className="mb-3">
          <label >Choose User Type: </label>
            <label style={{ padding: "5px"}}>
              <input
                type="radio"
                value="User"
                checked={this.state.userType === "User"}
                onChange={() => this.setState({ userType: "User" })}
              />
              User
            </label>
            <label style={{ padding: "5px"}}>
              <input
                type="radio"
                value="Admin"
                checked={this.state.userType === "Admin"}
                onChange={() => this.setState({ userType: "Admin" })}
              />
              Admin
            </label>
          
        </div>

        {/* New input field for admin password if user type is Admin */}
        {this.state.userType === "Admin" && (
          <div className="mb-3">
            <label>Admin Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter admin password"
              onChange={(e) => this.setState({ adminPassword: e.target.value })}
            />
          </div>
        )}
            <div className="mb-3">
              <label>First name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                onChange={(e) => this.setState({ fname: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label>Last name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                onChange={(e) => this.setState({ lname: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                onChange={(e) => this.setState({ cpassword: e.target.value })}
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn" style={{background: `#F2643D`}}>
                Sign Up
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered ? <a href="/signin">Sign in</a>
            </p>
          </form>
        </div>
        </div>
      </div>
    );
  }
}

