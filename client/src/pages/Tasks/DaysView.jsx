import React from 'react';
import DayBox from './DayBox';

const DaysView = () => {
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

  return (
    <div className="days-view">
      {daysOfWeek.map((day, index) => {
        const date = new Date(currentDate);
        date.setDate(firstDayOfWeek + index); // calculate the date for each day of the week
        return <DayBox key={index} name={day} date={date.getDate()} />;
      })}
    </div>
  );
};

export default DaysView;
