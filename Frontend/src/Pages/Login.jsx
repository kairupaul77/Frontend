import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext.jsx";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // Import Lucide icons
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const { login, loginWithGoogle, loading } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const success = await login({ email, password });

    if (success) {
      navigate("/home");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  // Handle Google Login
  const handleGoogleLogin =  async (credential) => {
    const user_details = jwtDecode(credential);
    console.log("Decoded Google credential:", user_details);
    
    // Use the dedicated login_with_google function from context


    const success = await loginWithGoogle(user_details.email);

    if (success) {
      navigate("/home");
    }
  };
 


  // Handle GitHub Login
  const handleGitHubLogin = () => {
    window.location.href = "http://localhost:5000/authorize_github";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h3>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4 bg-red-100 p-2 rounded-lg">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 disabled:bg-gray-400"
          >
            Sign in
          </button>

          <div className="text-center text-gray-600 mt-4">
            Not yet registered?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </div>

          <div className="text-center mt-2">
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Social Login Buttons */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-4 flex gap-4">
              <GoogleLogin
                onSuccess={credentialResponse => {
                  handleGoogleLogin(credentialResponse.credential);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              /> 

              {/* <button
                type="button"
                onClick={handleGitHubLogin}
                className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-gray-900 transition duration-300"
              >
                <img
                  src="https://github.com/favicon.ico"
                  alt="GitHub"
                  className="w-5 h-5"
                />
                GitHub
              </button> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}