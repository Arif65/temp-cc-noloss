import React from "react";
import { useLocation } from "react-router-dom";

const isArraySortedAscending = (array) => {
  return array.every((value, index) => index === 0 || array[index - 1] <= value);
};

const isArraySortedDescending = (array) => {
  return array.every((value, index) => index === 0 || array[index - 1] >= value);
};

const ArrayDisplay = ({ arrayElements, onSortArray }) => {
  const location = useLocation();
  const { item } = location.state || { item: "" };

  return (
    <>
      {arrayElements.length > 0 && (
        <div className="flex flex-col items-center mt-20 px-6">
          {/* Sorting Buttons for Binary Search */}
          {item === "Binary Search" && (
            <div className="mb-6 flex space-x-6">
              {!isArraySortedAscending(arrayElements) && (
                <button
                  onClick={() => onSortArray("asc")}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 text-lg transition-all"
                >
                  Sort Asc
                </button>
              )}
              {!isArraySortedDescending(arrayElements) && (
                <button
                  onClick={() => onSortArray("desc")}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-500 text-lg transition-all"
                >
                  Sort Desc
                </button>
              )}
            </div>
          )}

          {/* Array Display Section */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Array Elements:</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {arrayElements.map((element, index) => (
                <span
                  key={index}
                  className="border border-gray-300 px-6 py-3 rounded-md bg-gray-100 text-2xl text-center text-gray-800"
                >
                  {element}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArrayDisplay;
