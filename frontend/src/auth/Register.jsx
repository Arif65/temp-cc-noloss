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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ID Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">ID:</label>
            <input
              type="text"
              {...register("id", { required: "ID is required" })}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.id && (
              <p className="text-red-500 text-sm mt-1">{errors.id.message}</p>
            )}
          </div>

          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Name:</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600">Password:</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition-all duration-300"
          >
            Register
          </button>
        </form>

        {/* Already have an account? */}
        <button
          onClick={switchToLogin}
          className="w-full mt-4 text-blue-500 hover:underline text-sm"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default Register;
