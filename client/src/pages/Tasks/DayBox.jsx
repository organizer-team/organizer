import React from 'react';
import PropTypes from 'prop-types';
import './DayBox.css';
const DayBox = ({ name, date }) => {
  const currentDate = new Date();
  const todayDate = currentDate.getDate();

  const isToday = date === todayDate;

  return (
    <div className={`day-box ${isToday ? 'today' : ''}`}>
      <div className="day-name">{name.slice(0, 3)}</div>
      <div className="date">{date}</div>
    </div>
  );
};

DayBox.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.number,
};

export default DayBox;
