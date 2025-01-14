import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, onSubmit, numElements }) => {
  const [inputValues, setInputValues] = useState(Array(numElements).fill(''));

  useEffect(() => {
    if (isOpen) {
      setInputValues(Array(numElements).fill(''));
    }
  }, [isOpen, numElements]);

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const handleSubmit = () => {
    const validNumbers = inputValues.map((val) => parseInt(val, 10)).filter((val) => !isNaN(val));
    if (validNumbers.length === numElements) {
      onSubmit(validNumbers);
      onClose(); // Close the modal after successful submission
    } else {
      alert('Please fill in all fields with valid numbers.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-4/5 max-w-md max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600 focus:outline-none"
          onClick={onClose}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        {/* Modal Title */}
        <div className="text-2xl font-semibold mb-6 text-center">Enter Numbers</div>

        {/* Modal Content */}
        <div className="space-y-4">
          {Array.from({ length: numElements }).map((_, index) => (
            <div key={index}>
              <label className="block text-gray-700 mb-1">
                Element {index + 1}:
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={inputValues[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 mt-6 w-full"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Modal;
