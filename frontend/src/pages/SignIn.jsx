import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleGoogleSignIn = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async ({ code }) => {
      try {
        await axios.post("/glogin", { code }, { withCredentials: true });
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
      await axios.post("/login", formData, { withCredentials: true });
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Sign In to TravelMate
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="example@mail.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 flex items-center justify-between">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <button
          onClick={() => handleGoogleSignIn()}
          className="mt-4 w-full border border-gray-300 py-2 flex items-center justify-center rounded-lg hover:bg-gray-100"
        >
          <FcGoogle className="mr-2 text-xl" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
