import React from 'react';
import AddTaskIcon from '../../assets/add-task.svg';

const AddTaskButton = () => {
  const handleClick = () => {
    // Handle click event to add a new task
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-2 rounded-full shadow-md mt-10"
    >
      <img src={AddTaskIcon} alt="Add Task" className="w-6 h-6" />{' '}
      {/* Plus icon */}
    </button>
  );
};

export default AddTaskButton;
