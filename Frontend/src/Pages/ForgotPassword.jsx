import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send a request to your backend to handle the password reset
    // For now, we'll just simulate a success message
    toast.success("Password reset link sent to your email.");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#d2b48c] px-4">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">Forgot Password</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;