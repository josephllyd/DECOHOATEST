const addFinance = async (
  e,
  user,
  name,
  property,
  amount,
  paymentType,
  date,
  receipt,
  image,
) => {
  e.preventDefault();
  if (!user || !name || !property || !amount || !paymentType || !date || !receipt ) {
    alert("All fields are required");
    return;
  }

  const newFinance = {
    user,
    name,
    property,
    amount,
    paymentType,
    date,
    receipt,
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
    const addFinanceEndpoint = "/addFinance";
    const addFinanceUrl = `${baseUrl}${addFinanceEndpoint}`;
    const response = await fetch(addFinanceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(newFinance),
    });

    const data = await response.json();

    if (data.status === "ok") {
      alert("Finance added successfully");
    } else {
      alert("Failed to add finance");
    }
  } catch (error) {
    console.error("Error adding finance: ", error);
    alert("An error occurred while adding finance");
  }
};

const fetchFinance = (setFinance) => {
  const currentHostname = window.location.hostname;
  let baseUrl = "";
  if (currentHostname === "localhost") {
    baseUrl = "http://localhost:5000"; // Local environment
  } else {
    baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
  }

  const getFinanceEndpoint = "/getFinance";
  const getFinanceUrl = `${baseUrl}${getFinanceEndpoint}`;

  fetch(getFinanceUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.finance, "finance");
      setFinance(data.finance);
    })
    .catch((error) => {
      console.error("Error fetching finance:", error);
    });
};

export {fetchFinance, addFinance};