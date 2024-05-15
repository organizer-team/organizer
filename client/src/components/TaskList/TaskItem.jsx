import React from 'react';
import PropTypes from 'prop-types';

const TaskItem = ({ task }) => {
  const { title, start_time, end_time, area } = task;

  // Format the time to display as "start-end" time range
  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const startTime = formatTime(start_time);
  const endTime = formatTime(end_time);

  return (
    <div className="flex items-center p-4 rounded-md bg-lightBg shadow-md w-4/5 mt-10 mx-auto">
      <button
        className="bg-transparent border-blue-500 border-2 p-4 rounded-md"
        style={{ backgroundColor: area.color_code }}
      >
        <span className="sr-only">Button Label</span>
      </button>

      <div className="flex flex-col justify-start flex-grow">
        <h3 className="text-lg font-medium text-blue-700">{title}</h3>
        <p className="text-sm text-gray-500">{`${startTime}-${endTime}`}</p>
        <p className="text-sm text-gray-500">{area.title}</p>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    start_time: PropTypes.string.isRequired,
    end_time: PropTypes.string.isRequired,
    area: PropTypes.shape({
      title: PropTypes.string.isRequired,
      color_code: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default TaskItem;
