class fetchUserData {
    componentDidMount(callback) {
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
          this.setState({ users: data.users });
          callback(); // Invoke the callback after setting the state if needed
        });
    }
  }
  
  export default fetchUserData;
  