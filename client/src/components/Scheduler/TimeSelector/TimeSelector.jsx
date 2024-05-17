import React from 'react';
import TEST_ID from './TimeSelector.testid';
import propTypes from 'prop-types';

export const styles = {
  quickOptions: 'm-3 flex flex-col',
  optionButton:
    'px-2 py-1 border-2 border-transparent hover:border-organizerGray-primary rounded-md cursor-pointer',
  optionButtonsRow: 'flex justify-between py-1 group flex-wrap',
  timeSelector: 'w-full border-b  border-b-organizerGray-primary',
};

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
        newDate.setDate(selectedDate.getDate());
        newDate.setMonth(selectedDate.getMonth());
        newDate.setFullYear(selectedDate.getFullYear());
        newDate.setHours(9, 0, 0);
        break;
      case 'Afternoon':
        newDate.setDate(selectedDate.getDate());
        newDate.setMonth(selectedDate.getMonth());
        newDate.setFullYear(selectedDate.getFullYear());
        newDate.setHours(12, 0, 0);
        break;
      case 'Evening':
        newDate.setDate(selectedDate.getDate());
        newDate.setMonth(selectedDate.getMonth());
        newDate.setFullYear(selectedDate.getFullYear());
        newDate.setHours(18, 0, 0);
        break;
      case 'Night':
        newDate.setDate(selectedDate.getDate());
        newDate.setMonth(selectedDate.getMonth());
        newDate.setFullYear(selectedDate.getFullYear());
        newDate.setHours(21, 0, 0);
        break;
    }
    setSelectedDate(newDate);
  };

  return (
    <div data-testid={TEST_ID.container} className={styles.timeSelector}>
      <div className={styles.quickOptions}>
        <div className={styles.optionButtonsRow}>
          <input
            className={styles.optionButton}
            type="time"
            value={formatTime(selectedDate)}
            onChange={handleTimeChange}
          />
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
        <div className={styles.optionButtonsRow}>
          <button
            className={styles.optionButton}
            type={'button'}
            onClick={() => handleQuickOptionSelection('Afternoon')}
            data-testid={TEST_ID.afternoonButton}
          >
            Afternoon
          </button>
          <button
            className={styles.optionButton}
            type={'button'}
            onClick={() => handleQuickOptionSelection('Evening')}
            data-testid={TEST_ID.eveningButton}
          >
            Evening
          </button>
          <button
            className={styles.optionButton}
            type={'button'}
            onClick={() => handleQuickOptionSelection('Night')}
            data-testid={TEST_ID.nightButton}
          >
            Night
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
