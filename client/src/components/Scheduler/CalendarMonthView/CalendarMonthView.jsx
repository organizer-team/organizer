import React from 'react';
import propTypes from 'prop-types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendarStyle.css';

const CalendarMonthView = ({ selectedDate, onDateSelection }) => {
  return (
    <div className="custom-calendar">
      <Calendar
        value={selectedDate}
        onChange={onDateSelection}
        calendarType={'iso8601'}
      />
    </div>
  );
};

export default CalendarMonthView;

CalendarMonthView.propTypes = {
  selectedDate: propTypes.instanceOf(Date).isRequired,
  onDateSelection: propTypes.func.isRequired,
};
