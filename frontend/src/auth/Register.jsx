import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Register = ({ setIsLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/api/users/register", data);
      alert("Registration successful!");
      // Go to Login
      switchToLogin();
    } catch (error) {
      if(error.response.data){  
        alert(error.response.data.message);
      }else{
        alert("Registration failed!");
      }
      console.error("Registration failed:", error);
    }
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };

  return (
    <>
    <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 py-4 shadow-md">
        <h1 className="text-3xl font-extrabold text-white text-center tracking-wide">
          Code Canvas
        </h1>
    </div>

    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
  
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* ID Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID:
            </label>
            <input
              type="text"
              {...register("id", { required: "ID is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.id && (
              <p className="text-red-500 text-sm mt-1">{errors.id.message}</p>
            )}
          </div>
  
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name:
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
  
          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password:
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all duration-300 shadow-md"
          >
            Register
          </button>
        </form>
  
        {/* Already have an account? */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <button
            onClick={switchToLogin}
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </button>
        </p>
      </div>
    </div>
    </>
  );  
};

export default Register;
