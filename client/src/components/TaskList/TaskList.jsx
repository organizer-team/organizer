import React from 'react';
import TaskItem from '../TaskList/TaskItem';
import PropTypes from 'prop-types';

const TaskList = ({ tasks }) => {
  // Use staticTasks if tasks prop is not provided
  const taskData = tasks;

  return (
    <div className="">
      {tasks.length === 0 ? (
        <p>No tasks to show.</p>
      ) : (
        taskData.map((task) => <TaskItem key={task.id} task={task} />)
      )}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      duration: PropTypes.string,
      area: PropTypes.string,
    })
  ),
};

export default TaskList;
