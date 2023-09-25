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
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { fname, lname, email, password, cpassword } = this.state;
  
    // Check if any of the required fields are empty
    if (!fname || !lname || !email || !password || !cpassword) {
      alert("All fields are required");
      return; // Return early to prevent further execution
    }
  
    // Check if the password is at least 6 characters long
    if (password.length < 6) {
      alert("Passwords must be at least 6 characters");
      return; // Return early to prevent further execution
    }
  
    // Check if the passwords match
    if (password !== cpassword) {
      alert("Passwords do not match");
      return; // Return early to prevent further execution
    }
  
    // Get the current hostname
    const currentHostname = window.location.hostname;

    // Define the base URL for your API
    let baseUrl = "";

    // Check the hostname to determine the environment
    if (currentHostname === "localhost") {
      baseUrl = "http://localhost:5000"; // Local environment
    } else {
      baseUrl = "http://decohoatest-client.vercel.app"; // Vercel environment
    }

    // Define the endpoint for the sign-up route
    const signupEndpoint = "/signup";

    // Combine the base URL and endpoint to get the complete URL
    const signupUrl = `${baseUrl}${signupEndpoint}`;

    // All checks passed, proceed with registration
    console.log(fname, lname, email, password, cpassword);
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
        <div style={{flex: 1, padding: "80px"}}>
          <form onSubmit={this.handleSubmit}>
            <h3>Sign Up</h3>
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
