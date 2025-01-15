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
      
      <div className="flex flex-col justify-center items-center h-5/6 bg-gradient-to-br from-blue-100 to-indigo-100 p-10">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Choose an Algorithm
          </h2>

          {/* Search Algorithms */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">Searching Algorithms</h3>
            <button
              onClick={() => {
                navigate('/algolist/linearsearch', { state: { id: id, name: name } });
              }}
              className="w-full px-6 py-3 mb-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              Linear Search
            </button>
            <button
              onClick={() => {
                navigate('/algolist/binarysearch', { state: { id: id, name: name } });
              }}
              className="w-full px-6 py-3 mb-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              Binary Search
            </button>
            <button
              onClick={() => {
                navigate('/algolist/ternarysearch', { state: { id: id, name: name } });
              }}
              className="w-full px-6 py-3 mb-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              Ternary Search
            </button>
          </div>

          {/* Sorting Algorithms */}
          <div>
            <h3 className="text-2xl font-bold text-gray-700 mb-4">Sorting Algorithms</h3>
            <button
              onClick={() => {
                navigate('/algolist/bubblesort', { state: { id: id, name: name } });
              }}
              className="w-full px-6 py-3 mb-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              Bubble Sort
            </button>
            <button
              onClick={() => {
                navigate('/algolist/selectionsort', { state: { id: id, name: name } });
              }}
              className="w-full px-6 py-3 mb-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              Selection Sort
            </button>
            <button
              onClick={() => {
                navigate('/algolist/insertionsort', { state: { id: id, name: name } });
              }}
              className="w-full px-6 py-3 mb-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              Insertion Sort
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Algolist;
