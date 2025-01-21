import { createContext, useState, useCallback, useMemo } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
    const token = window.localStorage.getItem("token");
    const user = window.localStorage.getItem("user");
    try {
        const parsedUser = user ? JSON.parse(user) : null;
      return {
        token: token || null,
        user: parsedUser,
      };
    } catch (error) {
      console.error("Error parsing user data:", error);
      return {
        token: token || null,
        user: null,
      };
    }
});

  console.log("AuthContext.Provider initialized with:", { auth });

  const signup = async (payload) => {
    try {
        console.log("Signup payload:", payload);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Signup response status:", response.status);

      if (!response.ok) {
        let errorMessage = "Signup failed";
        try {
          const errorData = await response.json();
          errorMessage = errorData.details || errorMessage;
        } catch (error) {
          console.error("Error parsing signup response:", error);
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      setAuth({ token: data.token, user: data.user });
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("user", JSON.stringify(data.user));

      console.log("Signup successful:", data.user);
    } catch (error) {
      console.error("Error during signup:", error.message);
      throw error;
    }
  };

  const login = async ({ username, password }) => {
    try {
      console.log("Login payload:", { username, password });
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api-token-auth/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      console.log("Login response status:", response.status);

      if (!response.ok) {
        let errorMessage = "Invalid username or password";
        try {
          const errorData = await response.json();
          errorMessage = errorData.details || errorMessage;
        } catch (error) {
          console.error("Error parsing login response:", error);
        }
        throw new Error("Invalid username or password");
      }

      const data = await response.json();

      setAuth({ token: data.token, user: data.user });
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("user", JSON.stringify(data.user));

      console.log("Login successful:", data.user);
    } catch (error) {
      console.error("Error during login:", error.message);
      throw error;
    }
  };

  const logout = useCallback(() => {
    setAuth({ token: null, user: null });
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    console.log("User logged out.");
  }, []);

  const contextValue = useMemo(() => ({ auth, login, logout, signup }), [auth, login, logout, signup]);

  return (
    <AuthContext.Provider value={contextValue}>
      {console.log("AuthProvider rendered with:", contextValue)}
      {children || null}
    </AuthContext.Provider>
  );
};