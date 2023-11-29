import { useState, useEffect } from "react";

const fetchUsers = (setUsers) => {
  const currentHostname = window.location.hostname;
  let baseUrl = "";
  if (currentHostname === "localhost") {
    baseUrl = "http://localhost:5000"; // Local environment
  } else {
    baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
  }

  const getUsersEndpoint = "/getUsers";
  const getUsersUrl = `${baseUrl}${getUsersEndpoint}`;

  fetch(getUsersUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.users, "users");
      setUsers(data.users); // setting users here
    });
};

const componentDidMount = () => {
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
      console.log(data, "userData");
      this.setState({ userData: data.data });
      if (data.data === 'token expired') {
        alert("Token expired! Log in again.");
        window.localStorage.clear();
        window.location.href = "./signin";
      }
    });
}

const handleEditUser = (userId, newData, setUsers) => {
  const currentHostname = window.location.hostname;
  let baseUrl = "";
  if (currentHostname === "localhost") {
    baseUrl = "http://localhost:5000"; // Local environment
  } else {
    baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
  }

  const editUserEndpoint = `/editUser/${userId}`;
  const editUserUrl = `${baseUrl}${editUserEndpoint}`;

  fetch(editUserUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data); // Handle the response data accordingly
      // You can fetch the updated users again after editing
      fetchUsers(setUsers); 
    })
    .catch((error) => console.error("Error:", error));
};

const editUser = async (currentUserId, editedUser) => {
  try {
    const currentHostname = window.location.hostname;
    let baseUrl = "";
    if (currentHostname === "localhost") {
      baseUrl = "http://localhost:5000"; // Local environment
    } else {
      baseUrl = "https://decohoatest-server.vercel.app"; // Vercel environment
    }

    const editUserEndpoint = `/editCurrentUser/${currentUserId}`;
    const editUserUrl = `${baseUrl}${editUserEndpoint}`;

    const response = await fetch(editUserUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(editedUser),
    });

    const data = await response.json();

    if (data.status === "ok") {
      alert("User updated successfully");
    } else {
      alert("Failed to update User");
    }
  } catch (error) {
    console.error("Error updating User: ", error);
    alert("An error occurred while updating User");
  }
};

const useUserData = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
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
        console.log(data, "userData");
        setUserData(data.data);
        if (data.data === 'token expired') {
          alert("Token expired! Log in again.");
          window.localStorage.clear();
          window.location.href = "./signin";
        }
      });
  }, []);

  return userData;
};
export { 
  fetchUsers, 
  componentDidMount, 
  handleEditUser, 
  useUserData,
  editUser 
};
