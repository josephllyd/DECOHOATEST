// propertiesApi.js
const fetchProperties = () => {
    // Your fetch properties function implementation
  };
  
  const handleSubmit = async ( e, name, price, description, category, image) => {
    e.preventDefault();
    if (!name || !price || !description || !category) {
      alert("All fields are required");
      return;
    }

    const newProperty = {
      name,
      price,
      description,
      category,
      image,
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
  
  const handleDeleteProperty = (selectedProperty) => {
    // Your delete property function implementation
  };
  
  const handleEditPropertySubmit = (editedProperty, selectedProperty) => {
    // Your edit property submit function implementation
  };
  
  export { 
    fetchProperties, 
    handleSubmit,
    handleDeleteProperty, 
    handleEditPropertySubmit 
  };
  