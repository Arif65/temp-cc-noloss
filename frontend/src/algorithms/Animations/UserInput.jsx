import React, { useState } from 'react';
import Modal from './Modal';

const UserInput = ({
  numElements,
  
  isRandomInputChecked,
  isUserInputChecked,
  
  onRandomInputChange,
  onUserInputChange,

  onNumElementsChange,
  onNumElementsBlur,
  
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
    <div className='mx-5 flex items-center justify-center'>
      {/* TextBox */}
      <div className='flex items-center w-40 mr-5'>
        <label htmlFor="number-of-elements"
          className='block text-gray-600 text-sm font-medium mb-1'
        >
          Number of elements:
        </label>
        <input
        className=' border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 w-2/3'
          type="number"
          id="number-of-elements"
          value={numElements}
          onChange={onNumElementsChange}
          onBlur={onNumElementsBlur}
          disabled={isRunning}
        />
      </div>
      {/* CheckBox 1 */}
      <div className='flex items-center mr-3'>
        <input
          className='form-checkbox h-5 w-5 text-blue-500'
          type="checkbox"
          id="random-input"
          checked={isRandomInputChecked}
          onChange={handleRandomInputChange}
          disabled={isRunning}
        />
        <label htmlFor="random-input"
          className='ml-2 text-gray-600 text-sm font-medium'
        >
          Random Input
        </label>
      </div>
      {/* CheckBox 2 */}
      <div className='flex items-center'>
        <input
          className='form-checkbox h-5 w-5 text-blue-500'
          type="checkbox"
          id="user-input"
          checked={isUserInputChecked}
          onChange={handleUserInputChange}
          disabled={isRunning}
        />
        <label htmlFor="user-input"
          className='ml-2 text-gray-600 text-sm font-medium'
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
    </div>
  );
};

export default UserInput;