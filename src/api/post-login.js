async function postLogin(username, password) {
    try {
        console.log("Login payload:", { username, password });

        // const response = await fetch(`${import.meta.env.VITE_API_URL}/api-token-auth/`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // body: JSON.stringify({
        //     "username": username,
        //     "password": password,
      // }),
        const response = await fetch(`http://127.0.0.1:8000/api-token-auth/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "username": username,
          "password": password,
        }),
    });

    console.log("Login response status:", response.status);

    if (!response.ok) {

        const fallbackError = `Error trying to login`;
        console.error("Login error response:", response.status, response.statusText);
        
        const data = await response.json();
        if (!data.user || typeof data.user !== "object") {
          console.error("Invalid user data in login response:", data);
          throw new Error("Failed to login: Invalid user data received.");
        }
    
        console.error("Login error response:", data);
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
      }
    
      const data = await response.json();
      console.log("Login response data:", data);
      console.log("Token from response:", data.token);
      console.log("User from response:", data.user);    
      return data;
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  }
    
export default postLogin; 