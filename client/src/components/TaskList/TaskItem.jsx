import React from 'react';
import PropTypes from 'prop-types';

const TaskItem = ({ task }) => {
  // Format the duration to display as "start-end" time range
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    return `${parseInt(hours, 10)}:${minutes}`; // Ensure leading zero is removed from hours
  };

  const startTime = formatTime(task.duration.start);
  const endTime = formatTime(task.duration.end);

  return (
    <div className="flex items-center p-4 rounded-md bg-lightBg shadow-md w-4/5 mt-10 mx-auto">
      <button className="bg-transparent border-blue-500 border-2 p-4 rounded-md">
        <span className="sr-only">Button Label</span>
      </button>

      <div className="flex flex-col justify-start flex-grow">
        <h3 className="text-lg font-medium text-blue-700">{task.title}</h3>
        <p className="text-sm text-gray-500">{`${startTime}-${endTime}`}</p>{' '}
        {/* Display time range */}
        <p className="text-sm text-gray-500">{task.area}</p>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    duration: PropTypes.shape({
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
    }).isRequired,
    area: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskItem;
