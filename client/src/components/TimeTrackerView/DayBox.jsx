import React from 'react';
import PropTypes from 'prop-types';
import './DayBox.css';
const DayBox = ({ name, date }) => {
  const currentDate = new Date();
  const todayDate = currentDate.getDate();

  const isToday = date === todayDate;

  return (
    <div
      className={`border border-none text-center box-content  w-1/7 box-content p-3 ${isToday ? 'bg-today text-white' : ''}`}
    >
      <div className="font-bold text-l">{name.slice(0, 3)}</div>
      <div className="text-base">{date}</div>
    </div>
  );
};

DayBox.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.number,
};

export default DayBox;
