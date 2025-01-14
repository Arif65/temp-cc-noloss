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
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">{pageName}</div>

      <div className="flex items-center space-x-4">
        <button
          className="bg-blue-600 py-2 px-4 rounded hover:bg-blue-700"
          onClick={handleUserPage}
        >
          {userName} (ID: {userId})
        </button>

        <button
          className="bg-red-600 py-2 px-4 rounded hover:bg-red-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;