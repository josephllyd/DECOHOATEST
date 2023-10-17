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
  
  const addFinanceData = (financeData, callback) => {
    const currentHostname = window.location.hostname;
    let baseUrl = "";
    if (currentHostname === "localhost") {
      baseUrl = "http://localhost:5000"; // Local environment
    } else {
      baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
    }
    const addFinanceEndpoint = "/addFinance";
    const addFinanceUrl = `${baseUrl}${addFinanceEndpoint}`;
    fetch(addFinanceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(financeData),
    })
      .then((res) => res.json())
      .then((data) => {
        callback(data);
      })
      .catch((error) => {
        console.error("Error adding finance data:", error);
        callback({ message: "Failed to add finance data" });
      });
  };
  
  export { fetchData, addFinanceData };
  