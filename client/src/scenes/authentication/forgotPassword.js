import React, { Component } from "react";
import { Link } from "react-router-dom";
import logoImage from "../../assets/homelogo.png";
import "../../assets/unsplash_uB2iZgZSQtQ.png"
import forgotPassImage from "../../assets/undraw_mobile_encryption_re_yw3o.svg"

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email } = this.state;

    if (!email) {
      alert("Please fill in the email field.");
      return;
    } else {
      alert("Reset password link sent to your email.");
      window.location.href = "./signin";
    }

    console.log(email);
    const currentHostname = window.location.hostname;
    let baseUrl = "";
    if (currentHostname === "localhost") {
      baseUrl = "http://localhost:5000"; // Local environment
    } else {
      baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
    }

    const loginEndpoint = "/forgot-password";
    const loginUrl = `${baseUrl}${loginEndpoint}`;

    // fetch request
    fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          alert("Reset password link sent to your email.");
         // window.localStorage.setItem("token", data.data);
          //window.localStorage.setItem("loggedIn", true);
          window.location.href = "./signin";
        } else {
          alert("Something went wrong! Email does not exist. You may sign up.");
          window.location.href = "./signup";
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
  };

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
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                paddingLeft: "70px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px",
                }}
              >
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
                
                <div style={{ flex: 1, padding: "80px" }}>
                  <form onSubmit={this.handleSubmit}>
                    <h3>Forgot Password</h3>
                    <div className="mb-3">
                      <label>Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        onChange={(e) => this.setState({ email: e.target.value })}
                      />
                    </div>
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn"
                        style={{ background: `#F2643D` }}
                      >
                        Submit
                      </button>
                    </div>
                    <p className="forgot-password text-right">
                      Dont have an account? <a href="/signup">Sign Up</a>
                    </p>
                  </form>
                </div>
                <div style={{ flex: 1, display: window.innerWidth > 768 ? 'block' : 'none', alignItems: 'center', justifyContent: 'center', 
                              paddingTop: "10px",
                              paddingLeft: "80px",
                              paddingRight: "0px",
                              paddingBottom: "80px"}}>
                  <img src={forgotPassImage} alt="Sign Up" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
              </div>
              
          </div>
        </div>
      </div>
    );
  };
};