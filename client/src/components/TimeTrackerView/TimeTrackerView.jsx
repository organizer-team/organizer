import React from 'react';
import DateView from './DateView';
import DaysView from './DaysView';
import PropTypes from 'prop-types';
const TimeTrackerView = ({ onDayBoxClick }) => {
  return (
    <div className="flex flex-col items-center bg-bisque">
      <DateView />
      <DaysView onDayBoxClick={onDayBoxClick} />
    </div>
  );
};
TimeTrackerView.propTypes = {
  onDayBoxClick: PropTypes.func.isRequired,
};
export default TimeTrackerView;
