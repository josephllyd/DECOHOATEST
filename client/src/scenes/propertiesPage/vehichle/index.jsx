import React, { Component } from "react";

export default class Vehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
  }

  componentDidMount() {
    const currentHostname = window.location.hostname;
    let baseUrl = "";
    if (currentHostname === "localhost") {
      baseUrl = "http://localhost:5000"; // Local environment
    } else {
      baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
    }

    const userDataEndpoint = "/userData";
    const userDataUrl = `${baseUrl}${userDataEndpoint}`;

    fetch(userDataUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
        if (data.data === 'token expired') {
          alert("Token expired! Log in again.");
          window.localStorage.clear();
          window.location.href = "./signin";
        }
      });
  }

  logOut = () => {
    window.localStorage.clear();
    window.location.href = "./signin";
  }
  render() {
    return (
        <div style={{ flex: 1, padding: "40px", fontSize: '20px' }}>
            Welcome to Vehicles Page {this.state.userData.fname}! 
        </div>
    );
  }
}