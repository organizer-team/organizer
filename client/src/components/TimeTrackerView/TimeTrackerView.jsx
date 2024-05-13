import React from 'react';
import DateView from './DateView';
import DaysView from './DaysView';
const TimeTrackerView = () => {
  return (
    <div className="flex flex-col items-center bg-bisque">
      <DateView />
      <DaysView />
    </div>
  );
};
export default TimeTrackerView;
