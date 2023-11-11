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
  
  const fetchVehicles = (callback) => {
    const currentHostname = window.location.hostname;
    let baseUrl = "";
    if (currentHostname === "localhost") {
      baseUrl = "http://localhost:5000"; // Local environment
    } else {
      baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
    }
  
    const getVehiclesEndpoint = "/getVehicle";
    const getVehiclesUrl = `${baseUrl}${getVehiclesEndpoint}`;
  
    fetch(getVehiclesUrl)
      .then((res) => res.json())
      .then((data) => {
        if (callback && typeof callback === "function") {
          callback(data); // Call the callback function with the fetched data
        }
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
      });
  };
  
  const addVehicle = (vehicleData) => {
    const currentHostname = window.location.hostname;
    let baseUrl = "";
    if (currentHostname === "localhost") {
      baseUrl = "http://localhost:5000"; // Local environment
    } else {
      baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
    }
  
    const addVehicleEndpoint = "/addVehicle";
    const addVehicleUrl = `${baseUrl}${addVehicleEndpoint}`;
  
    fetch(addVehicleUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(vehicleData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          console.log("Vehicle added successfully");
          // Optionally, you can perform additional actions after adding the vehicle
        } else {
          console.error("Failed to add vehicle");
        }
      })
      .catch((error) => {
        console.error("Error adding vehicle:", error);
      });
  };

export { fetchData, fetchVehicles, addVehicle };


  