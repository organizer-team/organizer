import React from 'react';
import TaskItem from '../TaskList/TaskItem';
import PropTypes from 'prop-types';

// Static tasks data
const staticTasks = [
  { id: 1, title: 'Write the doc', duration: '1 hour', area: 'Work' },
  {
    id: 2,
    title: 'Household chores',
    duration: '30 minutes',
    area: 'Personal',
  },
  { id: 3, title: 'Do groceries', duration: '45 minutes', area: 'Shopping' },
  // Add more static tasks as needed
];

const TaskList = ({ tasks }) => {
  // Use staticTasks if tasks prop is not provided
  const taskData = tasks || staticTasks;

  return (
    <div className="task-list sm:w-12 lg:w-max">
      {taskData.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      area: PropTypes.string.isRequired,
    })
  ),
};

export default TaskList;
