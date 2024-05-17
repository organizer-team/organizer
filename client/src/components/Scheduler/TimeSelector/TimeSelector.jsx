import React from 'react';
import TEST_ID from './TimeSelector.testid';
import propTypes from 'prop-types';
import { styles } from '../Scheduler';

// Function to format the date object's time into HH:MM format
const formatTime = (date) => {
  if (!date) {
    return '';
  }
  let hours = date.getHours();
  let minutes = date.getMinutes();
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes;
};

const TimeSelector = ({ selectedDate, setSelectedDate }) => {
  const handleTimeChange = (event) => {
    const time = event.target.value.split(':');
    const newDate = selectedDate
      ? new Date(selectedDate.getTime())
      : new Date();
    newDate.setHours(time[0], time[1], 0);
    setSelectedDate(newDate);
  };

  const handleQuickOptionSelection = (option) => {
    let newDate = new Date();
    switch (option) {
      case 'Now':
        newDate = new Date();
        newDate.setSeconds(0);
        break;
      case 'Morning':
        newDate.setHours(9, 0, 0);
        break;
    }
    setSelectedDate(newDate);
  };

  return (
    <div data-testid={TEST_ID.container}>
      <input
        type="time"
        value={formatTime(selectedDate)}
        onChange={handleTimeChange}
      />
      <div className={styles.quickOptions}>
        <div className={styles.optionButtonsRow}>
          <button
            className={styles.optionButton}
            type={'button'}
            onClick={() => handleQuickOptionSelection('Now')}
            data-testid={TEST_ID.nowButton}
          >
            Now
          </button>
          <button
            className={styles.optionButton}
            type={'button'}
            onClick={() => handleQuickOptionSelection('Morning')}
            data-testid={TEST_ID.morningButton}
          >
            Morning
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeSelector;

TimeSelector.propTypes = {
  selectedDate: propTypes.instanceOf(Date),
  setSelectedDate: propTypes.func.isRequired,
};
