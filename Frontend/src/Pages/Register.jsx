import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { GoogleLogin } from "@react-oauth/google";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { jwtDecode } from "jwt-decode";

export default function Register() {
  const { register, loading } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle normal registration and redirect to login
  const handleRegister = async () => {
    if (password !== repeatPassword) {
      return;
    }

    const success = await register(name, email, password);
    if (success) {
      navigate("/login"); // Redirect to login page
    }
  };

  // Handle Google Register
  const handleGoogleSignUp = async (credentialResponse) => {
    try {
      const user_details = jwtDecode(credentialResponse.credential);
      const success = await register(user_details.name, user_details.email, "google_oauth_user");
      if (success) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Google Sign-Up Failed", error);
    }
  };

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

        {/* Social Login Buttons */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSignUp}
              onError={() => console.log("Google Sign-Up Failed")}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
