import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setIsLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
        const response = await axios.post("http://localhost:3000/api/users/login", data);  // Sending ID as part of URL
        alert("Login successful!: " + response.data.id + ' ' + response.data.name);
        console.log(response.data); 

        // go to list
        navigate("/algolist", { state: { id: response.data.id, name: response.data.name } });
    } catch (error) {
        if (error.response && error.response.data) {
            alert(error.response.data.message);  
        } else {
            alert("Login failed!");
        }
        console.error("Login failed:", error);
    }
};
  const handleForgotPassword = () => {
    alert("Redirecting to forgot password page...");
    // Add redirection or modal logic for forgot password here
  };

  const switchToRegister = () => {
    setIsLogin(false);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 py-4 shadow-md">
        <h1 className="text-3xl font-extrabold text-white text-center tracking-wide">
          Code Canvas
        </h1>
      </div>
  
      {/* Login Form */}
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-purple-200">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-lg w-96"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Welcome Back
          </h2>
  
          {/* ID Field */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID
            </label>
            <input
              type="text"
              {...register("id", { required: "ID is required" })}
              className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {errors.id && (
              <p className="text-red-500 text-xs mt-1">{errors.id.message}</p>
            )}
          </div>
  
          {/* Password Field */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
          >
            Login
          </button>
  
          {/* Switch to Register Button */}
          <button
            type="button"
            onClick={switchToRegister}
            className="w-full mt-4 text-blue-600 hover:underline text-sm font-medium text-center"
          >
            Don't have an account? Register
          </button>
        </form>
      </div>
    </>
  );
  
  
};

export default Login;