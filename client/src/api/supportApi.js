const fetchSupport = async (setSupport) => {
    try {
      const currentHostname = window.location.hostname;
      let baseUrl = "";
      if (currentHostname === "localhost") {
        baseUrl = "http://localhost:5000"; // Local environment
      } else {
        baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
      }
  
      const getSupportEndpoint = "/getSupport";
      const getSupportUrl = `${baseUrl}${getSupportEndpoint}`;
  
      const response = await fetch(getSupportUrl);
      const data = await response.json();
  
      console.log(data.support, "support");
      console.log(data); // Log the data to see its structure
  
      setSupport(data.support);
    } catch (error) {
      console.error("Error fetching support:", error);
    }
  };
  const addSupport = async (
    e,
    user,
    supportSubj,
    supportType,
    description,
    date,
    image,
  ) => {
    e.preventDefault();
    if (!user || !supportSubj || !supportType || !description || !date  ) {
      alert("All fields are required");
      return;
    }
  
    const newSupport = {
      user,
      user,
      supportSubj,
      supportType,
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
      const addSupportEndpoint = "/addSupport";
      const addSupportUrl = `${baseUrl}${addSupportEndpoint}`;
      const response = await fetch(addSupportUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(newSupport),
      });
  
      const data = await response.json();
  
      if (data.status === "ok") {
        alert("Support added successfully");
      } else {
        alert("Failed to add support");
      }
    } catch (error) {
      console.error("Error adding support: ", error);
      alert("An error occurred while adding support");
    }
  };

  const deleteSupport = async (selectedSupport, setSelectedSupport, setSupport) => {
    const supportId = selectedSupport._id;
    if (!supportId) {
      return;
    }
    const confirmation = window.confirm("Are you sure you want to delete this Support?");
  
    if (confirmation) {
      const supportId = selectedSupport._id;
      const currentHostname = window.location.hostname;
      let baseUrl = "";
      if (currentHostname === "localhost") {
        baseUrl = "http://localhost:5000"; // Local environment
      } else {
        baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
      }
  
      const deleteSupportEndpoint = `/deleteSupport/${supportId}`; // Include SupportId in the URL
      const deleteSupportUrl = `${baseUrl}${deleteSupportEndpoint}`;
  
      fetch(deleteSupportUrl, {
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
            alert("Support deleted successfully");
            setSelectedSupport(null);
            fetchSupport(setSupport);
          } else {
            alert("Failed to delete Support");
          }
        })
        .catch((error) => {
          console.error("Error deleting Support:", error);
        });
    }
  };

  const editSupport = async (supportId, editedSupport) => {
    try {
      const currentHostname = window.location.hostname;
      let baseUrl = "";
      if (currentHostname === "localhost") {
        baseUrl = "http://localhost:5000"; // Local environment
      } else {
        baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
      }
  
      const editSupportEndpoint = `/editSupport/${supportId}`;
      const editSupportUrl = `${baseUrl}${editSupportEndpoint}`;
  
      const response = await fetch(editSupportUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(editedSupport),
      });
  
      const data = await response.json();
  
      if (data.status === "ok") {
        alert("Support updated successfully");
      } else {
        alert("Failed to update support");
      }
    } catch (error) {
      console.error("Error updating Support: ", error);
      alert("An error occurred while updating Support");
    }
  };
  
  
  export { 
    fetchSupport, 
    addSupport, 
    deleteSupport, 
    editSupport
  };

