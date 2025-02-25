import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      fetchUserProfile(token);
    } else {
      setUser(null);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      console.log("Stored token:", token);
      const res = await fetch("http://127.0.0.1:5000/current_user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        sessionStorage.removeItem("token");
        setUser(null);
        toast.error("Session expired. Please log in again.");
        return;
      }

      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error(error);
      setUser(null);
    }
  };

  const login = async ({ email, password, provider, token }) => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          provider ? { provider, token } : { email, password }
        ),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
  
      sessionStorage.setItem("token", data.access_token);
      await fetchUserProfile(data.access_token);
      toast.success(provider ? `Continued with ${provider}` : "Logged in successfully");
      return true; // Indicate success
    } catch (error) {
      toast.error(error.message);
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };
  

  const register = async (username, email, password) => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
  
      toast.success("Registration successful");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout, loading, fetchUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
