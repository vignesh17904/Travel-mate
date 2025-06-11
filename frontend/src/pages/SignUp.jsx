import React, { useState,useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext.js";

export default function SignUp() {
  const { fetchUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const handleGoogleSignUp = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async ({ code }) => {
      try {
        await axios.post(
          "/api/v1/users/gsignup",
          { code, role: formData.role },
          { withCredentials: true }
        );
       // await fetchUser(); 
        navigate("/");
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/v1/users/signup", formData, { withCredentials: true });
      navigate("/");
      //await fetchUser();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Create Your Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Create a password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            placeholder="Re-enter password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="user">User</option>
            <option value="hotelowner">Hotel Owner</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="user">User</option>
            <option value="hotelowner">Hotel Owner</option>
          </select>
          <button
            onClick={() => handleGoogleSignUp()}
            className="w-full border border-gray-300 py-2 flex items-center justify-center rounded-lg hover:bg-gray-100"
          >
            <FcGoogle className="mr-2 text-xl" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
