import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "../../assets/homelogo.png";
import "../../assets/unsplash_uB2iZgZSQtQ.png";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
  
    const { email, password } = this.state; 

    if (!email || !password) {
      alert("Please fill in both email and password fields.");
      return; // Prevent further execution if fields are empty
    }
  
    console.log(email, password);
    fetch("decohoatest-server.vercel.app/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") { 
          alert("Login Successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);
          window.location.href = "./dashboard";
        } else {
          // Handle incorrect password or user not found here
          alert("Wrong email or password!");
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
      <div className="auth-wrapper">
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
            <h3>Sign In</h3>
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
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
  
            <div className="d-grid">
              <button type="submit" className="btn" style={{background: `#F2643D`}}>
                Sign In
              </button>
            </div>
            <p className="forgot-password text-right">
              Dont have an account? <a href="/signup">Sign Up</a>
            </p>
            <p className="forgot-password text-right">
               <a href="/forgotPassword">Forgot Password?</a>
            </p>
          </form>
        </div>
        </div>
      </div>
      </div>
    );
  }
  

}