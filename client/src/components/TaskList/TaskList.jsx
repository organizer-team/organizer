import React from 'react';
import TaskItem from '../TaskList/TaskItem';
import PropTypes from 'prop-types';

// import PropTypes from 'prop-types';

// Static tasks data
// const staticTasks = [
//   {
//     id: 1,
//     title: 'Write the doc',
//     duration: { start: '13:00', end: '14:00' },
//     area: 'Work',
//   },
//   {
//     id: 2,
//     title: 'Household chores',
//     duration: { start: '09:00', end: '09:30' },
//     area: 'Personal',
//   },
//   {
//     id: 3,
//     title: 'Do groceries',
//     duration: { start: '15:00', end: '15:45' },
//     area: 'Shopping',
//   },
// ];

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
