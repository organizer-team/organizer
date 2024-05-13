import React from 'react';
import TEST_ID from './Tasks.testid.js';
import TimeTrackerView from '../../components/TimeTrackerView/TimeTrackerView.jsx';
import TaskList from '../../components/TaskList/TaskList.jsx';
import AddTaskButton from '../../components/AddTaskButton/AddTaskButton.jsx';

const Tasks = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <TimeTrackerView />
      <TaskList />
      <AddTaskButton />
    </div>
  );
};

export default Tasks;
