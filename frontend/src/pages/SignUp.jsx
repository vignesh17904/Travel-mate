import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';

export default function SignUp() {
  const [role, setRole] = useState("user"); 

  const handleGoogleSignUp = useGoogleLogin({
  flow: 'auth-code',

  onSuccess: async (codeResponse) => {
    try {
      const { code } = codeResponse;
      console.log("Google login code:", code);
      const res = await axios.post(
        "/api/v1/users/gsignup", 
        { code },
        { withCredentials: true } 
      );

      console.log("Login successful:", res.data);

    
    } catch (err) {
      console.error("Google login failed:", err.response?.data || err.message);
    }
  },

  onError: (errorResponse) => {
    console.error("Google Login Error:", errorResponse);
  },
})

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Create Your Account
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 🔽 Role Dropdown */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Select Role</label>
            <select
              value={role}
              onChange={handleRoleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="owner">Hotel Owner</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <button
          onClick={handleGoogleSignUp}
          className="mt-4 w-full border border-gray-300 py-2 flex items-center justify-center rounded-lg hover:bg-gray-100 transition"
        >
          <FcGoogle className="mr-2 text-xl" />
          Continue with Google
        </button>
      </div>
    </div>
  );
}

