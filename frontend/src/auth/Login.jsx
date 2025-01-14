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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        
        {/* ID Field */}
        <div className="mb-4">
          <label className="block text-sm">ID</label>
          <input
            type="text"
            {...register("id", { required: "ID is required" })}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.id && <p className="text-red-500 text-sm">{errors.id.message}</p>}
        </div>
        
        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-sm">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all"
        >
          Login
        </button>

        {/* Forgot Password Button */}
        {/* <button
          type="button"
          onClick={handleForgotPassword}
          className="w-full mt-4 text-blue-500 hover:underline text-sm"
        >
          Forgot Password?
        </button> */}

        {/* Switch to Register Button */}
        <button
          type="button"
          onClick={switchToRegister}
          className="w-full mt-4 text-blue-500 hover:underline text-sm"
        >
          Don't have an account? Register
        </button>
      </form>
    </div>
  );
};

export default Login;