import React, { useState } from 'react';
import TEST_ID from './Scheduler.testid';
import CalendarMonthView from './CalendarMonthView/CalendarMonthView';
import TimeSelector from './TimeSelector/TimeSelector';
import propTypes from 'prop-types';

export const styles = {
  container:
    'w-fit border border-solid border-organizerGray-primary flex flex-col min-h-0',
  quickOptions: 'm-3 flex flex-col',
  optionButton:
    'px-2 py-1 border-2 border-transparent hover:border-organizerGray-primary rounded-md cursor-pointer',
  optionButtonsRow: 'flex justify-between py-1 group',
  calendarView: 'my-3',
};

const Scheduler = ({ dueDate, onSelect }) => {
  const [selectedDate, setSelectedDate] = useState(
    dueDate ? dueDate : new Date()
  );

  const handleDateSelection = (date) => {
    let newDate = new Date(date);
    newDate.setHours(selectedDate.getHours());
    newDate.setMinutes(selectedDate.getMinutes());
    setSelectedDate(newDate);
    onSelect(newDate);
  };

  const handleQuickOptionSelection = (option) => {
    let newDate;
    newDate = new Date();
    newDate.setSeconds(0);
    switch (option) {
      case 'Today':
        newDate = new Date();
        break;
      case 'Tomorrow':
        newDate = new Date();
        newDate.setDate(newDate.getDate() + 1);
        break;
      case 'This weekend':
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

  return (
    <div className={styles.container} data-testid={TEST_ID.container}>
      <div>
        <TimeSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      {/* Quick options list */}
      <div className={styles.quickOptions} data-testid={TEST_ID.quickOptions}>
        <div className={styles.optionButtonsRow}>
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
  dueDate: propTypes.instanceOf(Date),
  onSelect: propTypes.func.isRequired,
};
