import React from 'react';
import DayBox from './DayBox';
import { useState } from 'react';
import PropTypes from 'prop-types';

const DaysView = ({ onDayBoxClick }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const firstDayOfWeek =
    currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // calculate the date of the first day of the week

  const handleDayBoxClick = (date) => {
    const selectedMonth = currentDate.getMonth();
    const selectedYear = currentDate.getFullYear();
    // pass the selected date, month, and year directly to onDayBoxClick
    onDayBoxClick(date, selectedMonth, selectedYear);
    setSelectedDate(date);
  };

  return (
    <div className="flex flex-row justify-between">
      {daysOfWeek.map((day, index) => {
        const date = new Date(currentDate);
        date.setDate(firstDayOfWeek + index); // calculate the date for each day of the week
        const dateNumber = date.getDate();
        const isSelected = dateNumber === selectedDate;

        return (
          <DayBox
            onDayBoxClick={handleDayBoxClick}
            key={index}
            name={day}
            date={dateNumber}
            isSelected={isSelected}
          />
        );
      })}
    </div>
  );
};
DaysView.propTypes = {
  onDayBoxClick: PropTypes.func.isRequired,
};

export default DaysView;
