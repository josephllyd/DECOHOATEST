import React, { Component } from "react";
import { Link } from "react-router-dom";
import logoImage from "../../assets/homelogo.png";
import "../../assets/unsplash_uB2iZgZSQtQ.png";
import ForgotPassword from "./forgotPassword";
import signUpImage from "../../assets/undraw_sign_up_n6im.svg"
import signInImage from "../../assets/undraw_my_personal_files_re_3q0p.svg"

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      rememberMe: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // Check if email and password are stored in localStorage
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (storedEmail && storedPassword) {
      this.setState({
        email: storedEmail,
        password: storedPassword,
        rememberMe: true,
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
  
    const { email, password, rememberMe } = this.state; 

    if (!email || !password) {
      alert("Please fill in both email and password fields.");
      return; // Prevent further execution if fields are empty
    }
  
    console.log(email, password);

    if (rememberMe) {
      // Store email and password in localStorage
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    } else {
      // Remove email and password from localStorage
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }

    const currentHostname = window.location.hostname;
    let baseUrl = "";
    if (currentHostname === "localhost") {
      baseUrl = "http://localhost:5000"; // Local environment
    } else {
      baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
    }
 
    const loginEndpoint = "/login";
    const loginUrl = `${baseUrl}${loginEndpoint}`;

    // Create the fetch request
    fetch(loginUrl, {
      method: "POST",
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
          alert("Wrong email or password!");
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
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
        <div style={{ display: "flex", flex: 1, flexGrow: 2, flexDirection: "row" }}>
            <div style={{ flex: 1, display: window.innerWidth > 768 ? 'block' : 'none', alignItems: 'center', justifyContent: 'center', 
                          paddingTop: "10px",
                          paddingLeft: "80px",
                          paddingRight: "0px",
                          paddingBottom: "80px"}}>
              <img src={signInImage} alt="Sign Up" style={{ maxWidth: '100%', height: 'auto' }} />
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
                    checked={this.state.rememberMe}
                    onChange={(e) => this.setState({ rememberMe: e.target.checked })}
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
               <a href="/forgotPassword"  element={<ForgotPassword />}>Forgot Password?</a>
            </p>
          </form>
        </div>
        </div>
      </div>
      </div>
      </div>
    );
  }
  

}