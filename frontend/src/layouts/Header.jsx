import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ pageName, userId, userName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/", { replace: true });
  };

  const handleUserPage = () => {
    navigate(`/user/${userId}`, { state: { id: userId, name: userName } }); // Navigate to user page with user data
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-5 rounded-b-3xl shadow-xl relative">
      {/* Overlay for depth */}
      <div className="absolute inset-0 bg-black opacity-30 rounded-b-xl"></div>

      <div className="relative z-10 flex justify-between items-center">
        {/* Page Title */}
        <div className="text-center mb-4">
      {/* Code Canvas Heading */}
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 tracking-wide">
        Code Canvas
      </h1>
      </div>

      <div className="text-center text-3xl font-extrabold text-gray-300 tracking-wide">
        {/* Dynamic pageName */}
        <span className="relative">
          {pageName}
          {/* <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-400 to-green-400 rounded-full"></span> */}
        </span>
      </div>

        {/* User Info and Logout Buttons */}
        <div className="flex items-center space-x-8">
          <button
            className="bg-gradient-to-r from-blue-600 to-blue-800 py-3 px-8 rounded-lg text-sm font-medium shadow-md transform hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center space-x-3"
            onClick={handleUserPage}
          >
            {/* <span className="text-xl">{userName}</span>
            <span className="text-sm text-gray-200">ID: {userId}</span> */}
            {userId}
          </button>

          <button
            className="bg-gradient-to-r from-red-500 to-red-700 py-3 px-8 rounded-lg text-sm font-medium shadow-md transform hover:scale-105 hover:shadow-xl transition-all duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
