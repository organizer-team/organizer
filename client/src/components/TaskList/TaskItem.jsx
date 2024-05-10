import React from 'react';
import PropTypes from 'prop-types';

const TaskItem = ({ task }) => {
  return (
    <div className="flex items-center p-4 rounded-md bg-white shadow-md">
      <input type="checkbox" className="mr-4" />
      <div className="flex-grow">
        <h3 className="text-lg font-medium">{task.title}</h3>
        <p className="text-sm text-gray-500">{task.duration}</p>
        <p className="text-sm text-gray-500">{task.area}</p>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskItem;
