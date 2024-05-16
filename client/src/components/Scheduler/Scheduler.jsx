import React, { useState } from 'react';
import TEST_ID from './Scheduler.testid';
import propTypes from 'prop-types';

const styles = {
  container:
    'w-full border border-solid border-organizerGray flex flex-col min-h-0',
  quickOptions: 'm-3 flex flex-col',
  optionButton: 'px-2 py-1 border',
  optionButtonsRow: 'flex justify-between py-1',
  calendarView: 'm-3',
};

const CalendarMonthView = ({ selectedDate }) => {
  return (
    <div
      className={styles.calendarView}
      data-testid={TEST_ID.calendarMonthView}
    >
      {/* Calendar month view */}
      {selectedDate?.toString()}
    </div>
  );
};

const Scheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelection = (date) => {
    setSelectedDate(date);
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
    setSelectedDate(newDate);
  };

  return (
    <div className={styles.container} data-testid={TEST_ID.element}>
      {/* Quick options list */}
      <div className={styles.quickOptions}>
        <div className={styles.optionButtonsRow}>
          <button
            className={styles.optionButton}
            onClick={() => handleQuickOptionSelection('Today')}
          >
            Today
          </button>
          <button
            className={styles.optionButton}
            onClick={() => handleQuickOptionSelection('Tomorrow')}
          >
            Tomorrow
          </button>
          <button
            className={styles.optionButton}
            onClick={() => handleQuickOptionSelection('This weekend')}
          >
            This weekend
          </button>
        </div>
        <div className={styles.optionButtonsRow}>
          <button
            className={styles.optionButton}
            onClick={() => handleQuickOptionSelection('Next week')}
          >
            Next week
          </button>
          <button
            className={styles.optionButton}
            onClick={() => handleQuickOptionSelection('No date')}
          >
            No date
          </button>
        </div>
      </div>

      {/* Calendar month view */}
      <CalendarMonthView
        selectedDate={selectedDate}
        onDateSelection={handleDateSelection}
      />
    </div>
  );
};

export default Scheduler;

CalendarMonthView.propTypes = {
  selectedDate: propTypes.instanceOf(Date).isRequired,
  onDateSelection: propTypes.func.isRequired,
};
