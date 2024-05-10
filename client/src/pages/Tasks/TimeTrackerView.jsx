import React from 'react';
import './TimeTrackerView.css';
import DateView from './DateView';
import DaysView from './DaysView';
const TimeTrackerView = () => {
  return (
    <div className="time-tracker-view">
      <DateView />
      <DaysView />
    </div>
  );
};
export default TimeTrackerView;
