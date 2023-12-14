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

const fetchFinance = async (setFinance, userId = null) => {
  const currentHostname = window.location.hostname;
  let baseUrl = "";
  if (currentHostname === "localhost") {
    baseUrl = "http://localhost:5000";
  } else {
    baseUrl = "https://decohoatest-server.vercel.app";
  }

  let getFinanceEndpoint = "/getFinance";
  if (userId) {
    getFinanceEndpoint += `?userId=${userId}`; // Modify the endpoint to include the userId if provided
  }

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

const handleEditFinanceSubmit = (
  e,
  finance,
  selectedFinance,
  editedUser,
  editedName,
  editedProperty,
  editedAmount,
  editedPaymentType,
  editedDate,
  editedReceipt,
  editedImage,
  setFinance,
  closeEditFinanceDialog
) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("image", editedImage);

  const editedFinance = {
    user: editedUser._id, 
    name: editedName,
    property: editedProperty,
    amount: editedAmount,
    paymentType: editedPaymentType,
    date: editedDate,
    receipt: editedReceipt,
    image: editedImage,
    token: localStorage.getItem("token"),
  };

  const currentHostname = window.location.hostname;
  let baseUrl = "";
  if (currentHostname === "localhost") {
    baseUrl = "http://localhost:5000"; // Local environment
  } else {
    baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
  }

  const financeId = selectedFinance._id; // Assuming _id is the finance's unique identifier
  const editFinanceEndpoint = `/editFinance/${financeId}`;
  const editFinanceUrl = `${baseUrl}${editFinanceEndpoint}`;

  fetch(editFinanceUrl, {
    method: "PUT", // Use PUT request to update the finance
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(editedFinance),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "ok") {
        alert("Finance edited successfully");
        const updatedFinances = finance.map((financeItem) => { // 'finance' is not defined here
          if (financeItem._id === financeId) {
            return {
              ...financeItem,
              ...editedFinance,
            };
          }
          return financeItem;
        });
        setFinance(updatedFinances); // 'setFinance' is not defined here
        closeEditFinanceDialog(); // 'closeEditFinanceDialog' is not defined here
      } else {
        alert("Failed to edit finance");
      }
    })
    .catch((error) => {
      console.error("Error editing finance:", error);
      alert("An error occurred while editing finance");
    });
};

const deleteFinance = (selectedFinance, setSelectedFinance, fetchFinance, setFinance) => {
  if (!selectedFinance) {
    return;
  }

  const confirmation = window.confirm("Are you sure you want to delete this finance?");

  if (confirmation) {
    const financeId = selectedFinance._id;

    const currentHostname = window.location.hostname;
    let baseUrl = "";
    if (currentHostname === "localhost") {
      baseUrl = "http://localhost:5000";
    } else {
      baseUrl = "https://decohoatest-server.vercel.app";
    }

    const deleteFinanceEndpoint = `/deleteFinance/${financeId}`;
    const deleteFinanceUrl = `${baseUrl}${deleteFinanceEndpoint}`;

    fetch(deleteFinanceUrl, {
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
          alert("Finance deleted successfully");
          setSelectedFinance(null);
          fetchFinance(setFinance); // Assuming you have a fetchFinance function to update the finance list
        } else {
          alert("Failed to delete finance");
        }
      })
      .catch((error) => {
        console.error("Error deleting finance:", error);
      });
  }
};


export {
  fetchFinance,
  addFinance,
  handleEditFinanceSubmit,
  deleteFinance, // Add the deleteFinance function to the export list
};