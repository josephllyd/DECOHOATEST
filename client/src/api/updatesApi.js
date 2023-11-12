const fetchUpdates = async (setUpdates) => {
    try {
      const currentHostname = window.location.hostname;
      let baseUrl = "";
      if (currentHostname === "localhost") {
        baseUrl = "http://localhost:5000"; // Local environment
      } else {
        baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
      }
  
      const getUpdatesEndpoint = "/getUpdates";
      const getUpdatesUrl = `${baseUrl}${getUpdatesEndpoint}`;
  
      const response = await fetch(getUpdatesUrl);
      const data = await response.json();
  
      console.log(data.updates, "updates");
      console.log(data); // Log the data to see its structure
  
      setUpdates(data.updates);
    } catch (error) {
      console.error("Error fetching updates:", error);
    }
  };
  const addUpdates = async (
    e,
    user,
    updateSubj,
    updateType,
    description,
    date,
    image,
  ) => {
    e.preventDefault();
    if (!user || !updateSubj || !updateType || !description || !date  ) {
      alert("All fields are required");
      return;
    }
  
    const newUpdates = {
      user,
      user,
      updateSubj,
      updateType,
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
      const addUpdatesEndpoint = "/addUpdates";
      const addUpdatesUrl = `${baseUrl}${addUpdatesEndpoint}`;
      const response = await fetch(addUpdatesUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(newUpdates),
      });
  
      const data = await response.json();
  
      if (data.status === "ok") {
        alert("Updates added successfully");
      } else {
        alert("Failed to add update");
      }
    } catch (error) {
      console.error("Error adding updates: ", error);
      alert("An error occurred while adding update");
    }
  };

  export { fetchUpdates, addUpdates};