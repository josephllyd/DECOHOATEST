const handleSubmit = (e, name, price, description, category) => {
 
  
    const newProperty = {
      name,
      price,
      description,
      category,
      token: localStorage.getItem("token"), // Get the user's token from local storage
    };
  
    const currentHostname = window.location.hostname;
    let baseUrl = "";
    if (currentHostname === "localhost") {
      baseUrl = "http://localhost:5000"; // Local environment
    } else {
      baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
    }
    const addPropertyEndpoint = "/addProperty";
    const addPropertyUrl = `${baseUrl}${addPropertyEndpoint}`;
    fetch(addPropertyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(newProperty),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("Property added successfully");
          fetchProperties();
        } else {
          alert("Failed to add property");
        }
      });
  };

  const fetchProperties = (setProperties) => {
    const currentHostname = window.location.hostname;
    let baseUrl = "";
    if (currentHostname === "localhost") {
      baseUrl = "http://localhost:5000"; // Local environment
    } else {
      baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
    }
  
    const getPropertiesEndpoint = "/getProperties";
    const getPropertiesUrl = `${baseUrl}${getPropertiesEndpoint}`;
  
    fetch(getPropertiesUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.properties, "properties");
        setProperties(data.properties); // Use setProperties to update the state
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  };
  

const handleDeleteProperty = (selectedProperty, setSelectedProperty, setProperties) => {
    if (!selectedProperty) {
      return;
    }
  
    const confirmation = window.confirm("Are you sure you want to delete this property?");
  
    if (confirmation) {
      const propertyId = selectedProperty._id; // Assuming _id is the property's unique identifier
  
      const currentHostname = window.location.hostname;
      let baseUrl = "";
      if (currentHostname === "localhost") {
        baseUrl = "http://localhost:5000"; // Local environment
      } else {
        baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
      }
  
      const deletePropertyEndpoint = `/deleteProperty/${propertyId}`;
      const deletePropertyUrl = `${baseUrl}${deletePropertyEndpoint}`;
  
      fetch(deletePropertyUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            alert("Property deleted successfully");
            setSelectedProperty(null);
            fetchProperties();
          } else {
            alert("Failed to delete property");
          }
        })
        .catch((error) => {
          console.error("Error deleting property:", error);
        });
    }
  };
  
  const editProperty = (selectedProperty, editedProperty, properties, setProperties, closeEditPropertyDialog) => {
    const currentHostname = window.location.hostname;
    const token = localStorage.getItem("token");
    let baseUrl = "";
    if (currentHostname === "localhost") {
      baseUrl = "http://localhost:5000"; // Local environment
    } else {
      baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
    }
  
    const propertyId = selectedProperty._id; // Assuming _id is the property's unique identifier
    const editPropertyEndpoint = `/editProperty/${propertyId}`;
    const editPropertyUrl = `${baseUrl}${editPropertyEndpoint}`;
  
    fetch(editPropertyUrl, {
      method: "PUT", // Use PUT request to update the property
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editedProperty),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("Property edited successfully");
          // Update the property details in the frontend (state)
          const updatedProperties = properties.map((property) => {
            if (property._id === propertyId) {
              return {
                ...property,
                ...editedProperty,
              };
            }
            return property;
          });
          setProperties(updatedProperties);
          closeEditPropertyDialog();
        } else {
          alert("Failed to edit property");
        }
      });
  };
  
  export {handleSubmit, fetchProperties, handleDeleteProperty, editProperty };
  