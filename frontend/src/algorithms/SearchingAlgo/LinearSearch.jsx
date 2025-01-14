import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Header from '../../layouts/Header';
import UserInput from '../Animations/UserInput';
import ArrayDisplay from '../Animations/ArrayDisplay';
import LinearSearchModal from './LinearSearchModal';

const LinearSearch = () => {
  const [array, setArray] = useState([]);
  const [isRandomInput, setIsRandomInput] = useState(true);
  const [numElements, setNumElements] = useState(10); // Default number of elements
  const [target, setTarget] = useState(42); // Default target value
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate(); // Initialize the navigate function
  const { id, name } = location.state || { id: "N/A", name: "N/A" };
  const pageName = 'Linear Search';

  useEffect(() => {
    if (isRandomInput) {
      generateRandomArray(numElements);
    }
  }, [numElements, isRandomInput]);

  const generateRandomArray = (size) => {
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100));
    setArray(newArray);
  };

  const handleUserInputSubmit = (userArray) => {
    setArray(userArray);
    setIsRandomInput(false);
  };

  return (
    <>
      <Header
        pageName={pageName}
        userId={id}
        userName={name}
      />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <UserInput
          numElements={numElements}
          isRandomInputChecked={isRandomInput}
          isUserInputChecked={!isRandomInput}
          onRandomInputChange={() => {
            setIsRandomInput(true);
            generateRandomArray(numElements);
          }}
          onUserInputChange={() => setIsRandomInput(false)}
          onNumElementsChange={(e) => setNumElements(Number(e.target.value))}
          onNumElementsBlur={() => {
            if (numElements < 1 || numElements > 50) {
              setNumElements(10); // Reset to default if invalid
            }
          }}
          onModalSubmit={handleUserInputSubmit}
        />

        <ArrayDisplay
          arrayElements={array}
          onSortArray={(order) => {
            const sortedArray = [...array].sort((a, b) => (order === 'asc' ? a - b : b - a));
            setArray(sortedArray);
          }}
        />

        {/* Button to open the modal */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          onClick={() => setIsModalOpen(true)}
        >
          Start Linear Search Animation
        </button>

        {/* Animation Modal */}
        <LinearSearchModal
          id={id}
          name={name}
          topic={pageName}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          array={array}
          target={target}
        />
        
      </div>
    </>
  );
};

export default LinearSearch;


// To use this Modal just by passing 4 props

// import React, { useState } from "react";
// import LinearSearchModal from "./LinearSearchModal";

// const AnotherComponent = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const arrayData = [5, 10, 15, 20, 25];
//   const targetValue = 15;

//   return (
//     <div>
//       <button
//         onClick={() => setIsModalOpen(true)}
//         className="bg-blue-500 text-white px-4 py-2"
//       >
//         Open Linear Search Modal
//       </button>

//       <LinearSearchModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         array={arrayData}
//         target={targetValue}
//       />
//     </div>
//   );
// };

// export default AnotherComponent;
