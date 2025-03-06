import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch current user
  const fetchCurrentUser = async (token) => {
    try {
      const response = await fetch("https://pafaan-l0b6.onrender.com/current_user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          await refreshToken();
        }
        return;
      }

      const userData = await response.json();
      console.log("User data:", userData);
      sessionStorage.setItem("role", userData.role);

      if (userData.id) {
        setUser({ ...userData, isAdmin: userData.role === "admin" });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Refresh JWT Token
  const refreshToken = async () => {
    try {
      const res = await fetch("https://pafaan-l0b6.onrender.com/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: sessionStorage.getItem("refresh_token") }),
      });

      if (!res.ok) {
        logout();
        return;
      }

      const data = await res.json();
      sessionStorage.setItem("token", data.access_token);
      fetchCurrentUser(data.access_token);
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log("Token from sessionStorage:", token);
    if (token) fetchCurrentUser(token);
  }, []);

  // Email & Password Login
  const login = async ({ email, password, provider, token }) => {
    setLoading(true);
    try {
      const res = await fetch("https://pafaan-l0b6.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(provider ? { provider, token } : { email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      console.log(data);

      sessionStorage.setItem("token", data.access_token);
      sessionStorage.setItem("refresh_token", data.refresh_token);
      console.log("Token stored in sessionStorage:", data.access_token);
      await fetchCurrentUser(data.access_token);
      toast.success(provider ? `Continued with ${provider}` : "Logged in successfully");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register User
  const register = async (username, email, password) => {
    setLoading(true);
    try {
      const res = await fetch("https://pafaan-l0b6.onrender.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      toast.success("Registration successful");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout User
  const logout = async () => {
    try {
      await fetch("https://pafaan-l0b6.onrender.com/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refresh_token");
    setUser(null);
    toast.success("Logged out");
  };

  // Google Login
  const loginWithGoogle = async (email) => {
    try {
      const res = await fetch("https://pafaan-l0b6.onrender.com/login_with_google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const response = await res.json();
      console.log("Google login response:", response);

      if (response.access_token) {


        sessionStorage.setItem("token", response.access_token);
        sessionStorage.setItem("refresh_token", response.refresh_token);
        console.log("Token stored in sessionStorage:", response.access_token);
        await fetchCurrentUser(response.access_token);

        toast.success("Google Login Successful");
        return true;
      } else {
        throw new Error("Google login failed");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed");
    }
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout, loginWithGoogle, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
