import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Header from '../layouts/Header';

const Algolist = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize the navigate function
  const { id, name } = location.state || { id: "N/A", name: "N/A" };
  const pageName = 'Algorithm List';

  return (
    <>
      <Header
        pageName={pageName}
        userId={id}
        userName={name}
      />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <button
        onClick={() => {
          navigate('/algolist/linearsearch', { state: { id: id, name: name } });
        }}
        className="px-4 py-2 mb-4 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Linear Search
      </button>
      </div>
    </>
  );
};

export default Algolist;
