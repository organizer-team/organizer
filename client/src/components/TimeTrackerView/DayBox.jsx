import React from 'react';
import PropTypes from 'prop-types';
import './DayBox.css';

const DayBox = ({ name, date, onDayBoxClick, isSelected }) => {
  const handleClick = () => {
    onDayBoxClick(date);
  };

  return (
    <div
      className={`border border-none text-center box-content w-8 box-content p-3 mx-1 ${
        isSelected
          ? 'bg-gradient-to-br from-blue-500 to-emerald-500 text-white rounded-xl'
          : 'rounded-md'
      }`}
      onClick={handleClick}
    >
      <div className="font-bold text-l">{name.slice(0, 3)}</div>
      <div className="text-base">{date}</div>
    </div>
  );
};

DayBox.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onDayBoxClick: PropTypes.func.isRequired,
};

export default DayBox;
