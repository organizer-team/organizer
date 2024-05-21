import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DayBox from './DayBox';

const DaysView = ({ onDayBoxClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
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

  const getStartOfWeek = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const startOfWeek = getStartOfWeek(new Date(currentDate));

  const handleDayBoxClick = (date) => {
    const selectedMonth = currentDate.getMonth();
    const selectedYear = currentDate.getFullYear();
    onDayBoxClick(date, selectedMonth, selectedYear);
    setSelectedDate(date);
  };

  const handlePrevWeek = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 7);
      return newDate;
    });
  };

  const handleNextWeek = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 7);
      return newDate;
    });
  };

  useEffect(() => {
    const today = new Date();
    const isCurrentWeek =
      today >= getStartOfWeek(currentDate) &&
      today <=
        new Date(
          getStartOfWeek(currentDate).setDate(
            getStartOfWeek(currentDate).getDate() + 6
          )
        );

    if (!isCurrentWeek) {
      setSelectedDate(getStartOfWeek(currentDate).getDate() + 3);
    } else {
      setSelectedDate(today.getDate());
    }
  }, [currentDate]);

  return (
    <div className="flex justify-between items-center">
      <button
        onClick={handlePrevWeek}
        className="px-4 py-2 bg-gray-300 rounded"
      >
        {'<'}
      </button>
      <div className="flex flex-row justify-between flex-grow mx-4">
        {daysOfWeek.map((day, index) => {
          const date = new Date(startOfWeek);
          date.setDate(startOfWeek.getDate() + index);
          const dateNumber = date.getDate();
          const isSelected = dateNumber === selectedDate;

          return (
            <DayBox
              onDayBoxClick={() => handleDayBoxClick(dateNumber)}
              key={index}
              name={day}
              date={dateNumber}
              isSelected={isSelected}
            />
          );
        })}
      </div>
      <button
        onClick={handleNextWeek}
        className="px-4 py-2 bg-gray-300 rounded"
      >
        {'>'}
      </button>
    </div>
  );
};

DaysView.propTypes = {
  onDayBoxClick: PropTypes.func.isRequired,
};

export default DaysView;
