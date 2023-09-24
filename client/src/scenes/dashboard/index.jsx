import React, { Component } from "react";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
  }

  componentDidMount() {
    fetch("decohoatest-server.vercel.app/userData",  {
      method: "POST",
      crossDomain: true,
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
        if(data.data=='token expired') {
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
      <div style={{flex: 1, padding: "40px", fontSize: '20px'}}>
        Welcome {this.state.userData.fname} ! <br/>
        Email: <h1>{this.state.userData.email}</h1>
        <br/>        
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