async function postLogin(username, password) {
    try {
        console.log("Login payload:", { username, password });

        const response = await fetch("http://localhost:3000/api-token-auth/", {
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
        const data = await response.json().catch(() => {
          console.error("Error parsing login error response.");
          throw new Error(fallbackError);
        });
    
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