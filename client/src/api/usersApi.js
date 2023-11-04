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

export { fetchUsers };
