import React from 'react';
import propTypes from 'prop-types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendarStyle.css';
import TEST_ID from './CalendarMonthView.testid';

const CalendarMonthView = ({ selectedDate, onSelect }) => {
  return (
    <div data-testid={TEST_ID.container}>
      <Calendar
        value={selectedDate || undefined}
        onChange={onSelect}
        calendarType={'iso8601'}
      />
    </div>
  );
};

export default CalendarMonthView;

CalendarMonthView.propTypes = {
  selectedDate: propTypes.oneOfType([
    propTypes.instanceOf(Date),
    propTypes.oneOf([null]),
  ]),
  onSelect: propTypes.func.isRequired,
};
