import React, { Component } from "react";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
  }

  componentDidMount() {
    // Get the current hostname
    const currentHostname = window.location.hostname;

    // Define the base URL for your API
    let baseUrl = "";

    // Check the hostname to determine the environment
    if (currentHostname === "localhost") {
      baseUrl = "http://localhost:5000"; // Local environment
    } else {
      baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
    }

    // Define the endpoint for the user data route
    const userDataEndpoint = "/userData";

    // Combine the base URL and endpoint to get the complete URL
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
        Welcome {this.state.userData.fname} ! <br />
        Email: <h1>{this.state.userData.email}</h1>
        <br />
      </div>
    );
  }
}


/* const Dashboard = () => {
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard */