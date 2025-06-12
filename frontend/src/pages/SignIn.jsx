import React, { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../context/UserContext.js";
import AxiosInstance from "../utils/ApiConfig.js";
export default function SignIn() {
  const { fetchUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleGoogleSignIn = useGoogleLogin({
  flow: "auth-code",
  onSuccess: async ({ code }) => {
    try {
      await AxiosInstance.post("v1/users/glogin", { code });
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
    await AxiosInstance.post("v1/users/login", formData);
    navigate("/");
  } catch (err) {
    console.error(err.response?.data || err.message);
    setErrorMessage("Incorrect email or password");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col justify-center items-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Sign In to TravelMate
        </h2>

        {errorMessage && (
          <div className="text-red-600 text-sm text-center mb-4">{errorMessage}</div>
        )}

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

      <p className="mt-4 text-sm text-gray-600">
        New to TravelMate?{" "}
        <Link to="/SignUp" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
