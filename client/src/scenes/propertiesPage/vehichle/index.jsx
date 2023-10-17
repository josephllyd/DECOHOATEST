import React, { Component } from "react";
import fetchData from "../../../api/vehiclesApi";

export default class Vehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
  }

  componentDidMount() {
    fetchData((data) => {
      console.log(data, "userData");
      this.setState({ userData: data.data });
      if (data.data === 'token expired') {
        alert("Token expired! Log in again.");
        window.localStorage.clear();
        window.location.href = "./signin";
      }
    });
  }

  render() {
    return (
      <div style={{ flex: 1, padding: "40px", fontSize: '20px' }}>
        Welcome to Vehicles Page {this.state.userData.fname}! 
      </div>
    );
  }
}
