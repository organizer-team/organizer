import React from 'react';
import TEST_ID from './CalendarMonthView.testid';
import propTypes from 'prop-types';

const CalendarMonthView = ({ selectedDate, onDateSelection }) => {
  return (
    <div
      className={styles.calendarView}
      data-testid={TEST_ID.calendarMonthView}
    >
      {/* Calendar month view */}
      {selectedDate?.toString()}
    </div>
  );
};

export default CalendarMonthView;

CalendarMonthView.propTypes = {
  selectedDate: propTypes.instanceOf(Date).isRequired,
  onDateSelection: propTypes.func.isRequired,
};
