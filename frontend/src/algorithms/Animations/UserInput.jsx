import React, { useState } from 'react';
import Modal from './Modal';

const UserInput = ({
  numElements,
  target,
  isRandomInputChecked,
  isUserInputChecked,
  onRandomInputChange,
  onUserInputChange,
  onNumElementsChange,
  onNumElementsBlur,
  onTargetChange,
  onModalSubmit,
  isRunning,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRandomInputChange = () => {
    onRandomInputChange();
    setIsModalOpen(false);
  };

  const handleUserInputChange = () => {
    onUserInputChange();
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = (numbers) => {
    onModalSubmit(numbers);
    setIsModalOpen(false);
  };

  return (
    <div className="mt-20 mx-5 flex flex-col md:flex-row items-center justify-center bg-gray-50 p-6 rounded-lg shadow-md">
      {/* Number of Elements */}
      <div className="flex items-center w-60 mr-5">
        <label
          htmlFor="number-of-elements"
          className="block text-gray-800 text-lg font-medium mb-2"
        >
          Number of elements:
        </label>
        <input
          className="border border-gray-300 rounded-md py-3 px-4 w-2/3 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all text-lg"
          type="number"
          id="number-of-elements"
          value={numElements}
          onChange={onNumElementsChange}
          onBlur={onNumElementsBlur}
          disabled={isRunning}
        />
      </div>

      {/* Random Input Checkbox */}
      <div className="flex items-center mr-5">
        <input
          className="form-checkbox h-6 w-6 text-gray-700 transition-all"
          type="checkbox"
          id="random-input"
          checked={isRandomInputChecked}
          onChange={handleRandomInputChange}
          disabled={isRunning}
        />
        <label
          htmlFor="random-input"
          className="ml-2 text-gray-800 text-lg font-medium"
        >
          Random Input
        </label>
      </div>

      {/* User Input Checkbox */}
      <div className="flex items-center mr-10">
        <input
          className="form-checkbox h-6 w-6 text-gray-700 transition-all"
          type="checkbox"
          id="user-input"
          checked={isUserInputChecked}
          onChange={handleUserInputChange}
          disabled={isRunning}
        />
        <label
          htmlFor="user-input"
          className="ml-2 text-gray-800 text-lg font-medium"
        >
          User Input
        </label>
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          numElements={numElements}
        />
      </div>

      {/* Target Value (Aligned to the right) */}
      <div className="flex items-center ml-auto w-60 mr-5">
        <label
          htmlFor="target-value"
          className="block text-gray-800 text-lg font-medium mb-2"
        >
          Target value:
        </label>
        <input
          className="border border-gray-300 rounded-md py-3 px-4 w-2/3 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all text-lg"
          type="number"
          id="target-value"
          value={target}
          onChange={(e) => onTargetChange(Number(e.target.value))}
          disabled={isRunning}
        />
      </div>
    </div>
  );
};

export default UserInput;
