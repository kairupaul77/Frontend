import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function Register() {
  const { register, loading } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle normal registration and redirect to login
  const handleRegister = async () => {
    setError("");

    if (password !== repeatPassword) {
      setError("Passwords don't match");
      return;
    }

    const success = await register(name, email, password);
    if (success) {
      navigate("/login"); // Redirect to login page
    } else {
      setError("Registration failed. Please try again.");
    }
  };

  // Google Register
  const handleGoogleRegister = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const { data } = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          }
        );

        const success = await register(data.name, data.email, null, "google", codeResponse.access_token);
        if (success) {
          navigate("/login");
        } else {
          setError("Google registration failed. Please try again.");
        }
      } catch (err) {
        console.log("Google register error:", err);
        setError("Google registration failed. Please try again.");
      }
    },
    onError: (error) => {
      console.log("Register Failed:", error);
      setError("Google registration failed. Please try again.");
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h3 className="text-2xl font-bold text-center mb-4">Register</h3>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter Username"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter Email"
            required
          />
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg pr-10"
              placeholder="Password"
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </span>
          </div>
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-700">Repeat Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="w-full p-2 border rounded-lg pr-10"
              placeholder="Repeat Password"
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </span>
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600" disabled={loading}>
          {loading ? "Registering..." : "Sign Up"}
        </button>

        <div className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={handleGoogleRegister}
            className="w-full bg-red-500 text-white py-2 rounded-lg flex items-center justify-center hover:bg-red-600"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              alt="Google Logo"
              className="w-5 h-5 mr-2"
            />
            Sign up with Google
          </button>
        </div>
      </form>
    </div>
  );
}
