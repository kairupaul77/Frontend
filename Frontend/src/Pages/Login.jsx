import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Login() {
  const { login, loading } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const { data } = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
          headers: {
            Authorization: `Bearer ${codeResponse.access_token}`,
            Accept: "application/json",
          },
        });

        const success = await login({ provider: "google", token: codeResponse.access_token });
        if (success) {
          navigate("/");
        } else {
          setError("Google login failed. Please try again.");
        }
      } catch (err) {
        console.log("Google login error:", err);
        setError("Google login failed. Please try again.");
      }
    },
    onError: (error) => {
      console.log("Login Failed:", error);
      setError("Google login failed. Please try again.");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const success = await login({ email, password });
    if (success) {
      navigate("/");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#d2b48c]">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h3 className="text-2xl font-bold text-center mb-4">Login</h3>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="mb-4">
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter Email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter Password"
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-4">
          Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
        </p>

        <div className="mt-4">
          <button type="button" onClick={handleGoogleLogin} className="w-full flex items-center justify-center bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Logo" className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>
        </div>

        <div className="flex justify-center space-x-4 mt-4 text-gray-500">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600"><FaFacebook size={24} /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400"><FaTwitter size={24} /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500"><FaInstagram size={24} /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700"><FaLinkedin size={24} /></a>
        </div>
      </form>
    </div>
  );
}

export default Login; // ✅ This correctly exports the Login component

