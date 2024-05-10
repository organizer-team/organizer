import React from 'react';
import TEST_ID from './Tasks.testid.js';
import TimeTrackerView from './TimeTrackerView.jsx';

const Tasks = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <TimeTrackerView />
    </div>
  );
};

export default Tasks;
