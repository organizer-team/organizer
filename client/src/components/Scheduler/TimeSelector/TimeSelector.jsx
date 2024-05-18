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

const TimeSelector = ({ selectedTime, setSelectedTime }) => {
  const hours = selectedTime?.getHours().toString().padStart(2, '0');
  const minutes = selectedTime?.getMinutes().toString().padStart(2, '0');
  const formattedTime = selectedTime ? `${hours}:${minutes}` : '';

  const handleTimeChange = (event) => {
    const time = event.target.value.split(':');
    const newTime = selectedTime
      ? new Date(selectedTime.getTime())
      : new Date();
    newTime.setHours(time[0], time[1], 0);
    setSelectedTime(newTime);
  };

  const handleQuickOptionSelection = (option) => {
    let newTime = null; // set to null initially
    switch (option) {
      case 'No time':
        break;
      case 'Now':
        newTime = new Date();
        break;
      case 'Morning':
        newTime = new Date();
        newTime.setHours(9, 0, 0);
        break;
      case 'Afternoon':
        newTime = new Date();
        newTime.setHours(12, 0, 0);
        break;
      case 'Evening':
        newTime = new Date();
        newTime.setHours(18, 0, 0);
        break;
      case 'Night':
        newTime = new Date();
        newTime.setHours(21, 0, 0);
        break;
    }
    setSelectedTime(newTime);
  };

  return (
    <div data-testid={TEST_ID.container} className={styles.timeSelector}>
      <div className={styles.quickOptions}>
        <div className={styles.optionButtonsRow}>
          <input
            className={styles.optionButton}
            type="time"
            value={formattedTime}
            onChange={handleTimeChange}
            data-testid={TEST_ID.timeInput}
          />
          <button
            className={styles.optionButton}
            type={'button'}
            onClick={() => handleQuickOptionSelection('No time')}
            data-testid={TEST_ID.noTimeButton}
          >
            No time
          </button>
          <button
            className={styles.optionButton}
            type={'button'}
            onClick={() => handleQuickOptionSelection('Now')}
            data-testid={TEST_ID.nowButton}
          >
            Now
          </button>
        </div>
        <div className={styles.optionButtonsRow}>
          <button
            className={styles.optionButton}
            type={'button'}
            onClick={() => handleQuickOptionSelection('Morning')}
            data-testid={TEST_ID.morningButton}
          >
            Morning
          </button>
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
  selectedTime: propTypes.instanceOf(Date),
  setSelectedTime: propTypes.func.isRequired,
};
