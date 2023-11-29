const fetchData = (callback) => {
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
        callback(data);
      });
  };
  
  const fetchVehicles = async (setVehicle) => {
    try {
      const currentHostname = window.location.hostname;
      let baseUrl = "";
      if (currentHostname === "localhost") {
        baseUrl = "http://localhost:5000"; // Local environment
      } else {
        baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
      }
  
      const getVehicleEndpoint = "/getVehicle";
      const getVehicleUrl = `${baseUrl}${getVehicleEndpoint}`;
  
      const response = await fetch(getVehicleUrl);
      const data = await response.json();
  
      console.log(data.vehicle, "vehicle");
      console.log(data); // Log the data to see its structure
  
      setVehicle(data.vehicle); // Assuming data.vehicle is an array of vehicles
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };
  const addVehicle = async (
    e,
    user,
    vehicleName,
    parkingNo,
    plateNo,
    brand,
    description,
    date,
    image,
  ) => {
    e.preventDefault();
    if (!user || !vehicleName || !parkingNo || !plateNo || !brand || !description || !date ) {
      alert("All fields are required");
      return;
    }
  
    const newVehicle = {
      user,
      vehicleName,
      parkingNo,
      plateNo,
      brand,
      description,
      date,
      image,
      token: localStorage.getItem("token"),
    };
  
    try {
      const currentHostname = window.location.hostname;
      let baseUrl = "";
      if (currentHostname === "localhost") {
        baseUrl = "http://localhost:5000"; // Local environment
      } else {
        baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
      }
      const addVehicleEndpoint = "/addVehicle";
      const addVehicleUrl = `${baseUrl}${addVehicleEndpoint}`;
      const response = await fetch(addVehicleUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(newVehicle),
      });
  
      const data = await response.json();
  
      if (data.status === "ok") {
        alert("Vehicle added successfully");
      } else {
        alert("Failed to add vehicle");
      }
    } catch (error) {
      console.error("Error adding vehicle: ", error);
      alert("An error occurred while adding vehicle");
    }
  };
  

  const deleteVehicle = async (selectedVehicle, setSelectedVehicle, setVehicles) => {
    const vehicleId = selectedVehicle._id;
    if (!vehicleId) {
      return;
    }
    const confirmation = window.confirm("Are you sure you want to delete this vehicle?");
  
    if (confirmation) {
      const vehicleId = selectedVehicle._id;
      const currentHostname = window.location.hostname;
      let baseUrl = "";
      if (currentHostname === "localhost") {
        baseUrl = "http://localhost:5000"; // Local environment
      } else {
        baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
      }
  
      const deleteVehicleEndpoint = `/deleteVehicle/${vehicleId}`; // Include vehicleId in the URL
      const deleteVehicleUrl = `${baseUrl}${deleteVehicleEndpoint}`;
  
      fetch(deleteVehicleUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            alert("Vehicle deleted successfully");
            setSelectedVehicle(null);
            fetchVehicles(setVehicles);
          } else {
            alert("Failed to delete vehicle");
          }
        })
        .catch((error) => {
          console.error("Error deleting vehicle:", error);
        });
    }
  };

  
const editVehicle = async (vehicleId, editedVehicle) => {
  try {
    const currentHostname = window.location.hostname;
    let baseUrl = "";
    if (currentHostname === "localhost") {
      baseUrl = "http://localhost:5000"; // Local environment
    } else {
      baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
    }

    const editVehicleEndpoint = `/editVehicle/${vehicleId}`;
    const editVehicleUrl = `${baseUrl}${editVehicleEndpoint}`;

    const response = await fetch(editVehicleUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(editedVehicle),
    });

    const data = await response.json();

    if (data.status === "ok") {
      alert("Vehicle updated successfully");
    } else {
      alert("Failed to update vehicle");
    }
  } catch (error) {
    console.error("Error updating vehicle: ", error);
    alert("An error occurred while updating vehicle");
  }
};

  export { 
    fetchData, 
    fetchVehicles, 
    addVehicle, 
    deleteVehicle, 
    editVehicle 
  };


  