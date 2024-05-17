import React, { useState, useEffect } from 'react';
import TEST_ID from './Scheduler.testid';
import CalendarMonthView from './CalendarMonthView/CalendarMonthView';
import propTypes from 'prop-types';

const styles = {
  container:
    'w-fit border border-solid border-organizerGray-primary flex flex-col min-h-0',
  quickOptions: 'm-3 flex flex-col',
  optionButton:
    'px-2 py-1 border-2 border-transparent hover:border-organizerGray-primary rounded-md cursor-pointer',
  optionButtonsRow: 'flex justify-between py-1',
  calendarView: 'my-3',
};

const Scheduler = ({ onSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  // State for the time input
  const [time, setTime] = useState(formatTime(selectedDate));

  // Update the time state whenever selectedDate changes
  useEffect(() => {
    setTime(formatTime(selectedDate));
  }, [selectedDate]);

  const handleDateSelection = (date) => {
    let newDate = new Date(date);
    newDate.setHours(selectedDate.getHours());
    newDate.setMinutes(selectedDate.getMinutes());
    setSelectedDate(newDate);
    onSelect(newDate);
  };

  const handleQuickOptionSelection = (option) => {
    let newDate;
    switch (option) {
      case 'Today':
        newDate = new Date();
        break;
      case 'Tomorrow':
        newDate = new Date();
        newDate.setDate(newDate.getDate() + 1);
        break;
      case 'This weekend':
        newDate = new Date();
        newDate.setDate(newDate.getDate() + (6 - newDate.getDay()));
        break;
      case 'Next week':
        newDate = new Date();
        newDate.setDate(newDate.getDate() + (8 - newDate.getDay()));
        break;
      case 'No date':
        newDate = null;
        break;
    }
    if (newDate && selectedDate) {
      newDate.setHours(selectedDate.getHours());
      newDate.setMinutes(selectedDate.getMinutes());
    }
    setSelectedDate(newDate);
    onSelect(newDate);
  };

  const handleTimeSelection = (event) => {
    const newTime = event.target.value;
    let newDate = new Date(selectedDate);
    newDate.setHours(newTime.split(':')[0]);
    newDate.setMinutes(newTime.split(':')[1]);
    setSelectedDate(newDate);
    setTime(newTime);
  };

  return (
    <div className={styles.container} data-testid={TEST_ID.container}>
      <div>
        {' '}
        <input
          aria-label="Time"
          type="time"
          value={time}
          onChange={handleTimeSelection}
        />{' '}
      </div>
      {/* Quick options list */}
      <div className={styles.quickOptions} data-testid={TEST_ID.quickOptions}>
        <div className={`${styles.optionButtonsRow} group`}>
          <button
            className={styles.optionButton}
            onClick={() => handleQuickOptionSelection('Today')}
            data-testid={TEST_ID.todayButton}
          >
            Today
          </button>
          <button
            className={styles.optionButton}
            onClick={() => handleQuickOptionSelection('Tomorrow')}
            data-testid={TEST_ID.tomorrowButton}
          >
            Tomorrow
          </button>
          <button
            className={styles.optionButton}
            onClick={() => handleQuickOptionSelection('This weekend')}
            data-testid={TEST_ID.thisWeekendButton}
          >
            This weekend
          </button>
        </div>
        <div className={styles.optionButtonsRow}>
          <button
            className={styles.optionButton}
            onClick={() => handleQuickOptionSelection('Next week')}
            data-testid={TEST_ID.nextWeekButton}
          >
            Next week
          </button>
          <button
            className={styles.optionButton}
            onClick={() => handleQuickOptionSelection('No date')}
            data-testid={TEST_ID.noDateButton}
          >
            No date
          </button>
        </div>
      </div>
      {/* Calendar view */}
      <div className={styles.calendarView} data-testid={TEST_ID.calendarView}>
        <CalendarMonthView
          onSelect={handleDateSelection}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
};

export default Scheduler;

Scheduler.propTypes = {
  onSelect: propTypes.func.isRequired,
};
