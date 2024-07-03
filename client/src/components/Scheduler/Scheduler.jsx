import React, { useState } from 'react';
import TEST_ID from './Scheduler.testid';
import CalendarMonthView from './CalendarMonthView/CalendarMonthView';
import TimeSelector from './TimeSelector/TimeSelector';
import propTypes from 'prop-types';

export const styles = {
  container:
    'w-full max-w-sm min-w-max border border-solid border-organizerGray-primary flex flex-col min-h-0',

  timeSelector: 'w-full border-b  border-b-organizerGray-primary',
  quickOptionsContainer:
    'w-full border-b border-b-organizerGray-primary flex-wrap',
  quickOptions: 'm-3 flex flex-col flex-wrap',
  optionButton:
    'px-2 py-1 border-2 border-transparent hover:border-organizerGray-primary rounded-md cursor-pointer',
  optionButtonsRow: 'flex justify-between py-1 group flex-wrap',
  calendarView: 'm-3 flex justify-center items-center',
};

const Scheduler = ({ dueDate, dueTime, onSelect }) => {
  const [selectedDate, setSelectedDate] = useState(dueDate || new Date());
  const [selectedTime, setSelectedTime] = useState(dueTime || null);

  const handleDateSelection = (date) => {
    let newDate = new Date(date);
    setSelectedDate(newDate);
    onSelect(newDate, selectedTime);
  };

  const handleQuickOptionSelection = (option) => {
    let newDate;
    newDate = new Date();
    switch (option) {
      case 'Today':
        break;
      case 'Tomorrow':
        newDate.setDate(newDate.getDate() + 1);
        break;
      case 'This weekend':
        newDate.setDate(newDate.getDate() + (6 - newDate.getDay()));
        break;
      case 'Next week':
        newDate.setDate(newDate.getDate() + (8 - newDate.getDay()));
        break;
      case 'No date':
        newDate = null;
        break;
    }
    setSelectedDate(newDate);
    onSelect(newDate, selectedTime);
  };

  return (
    <div className={styles.container} data-testid={TEST_ID.container}>
      <TimeSelector
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />
      {/* Quick options list */}
      <div
        className={styles.quickOptionsContainer}
        data-testid={TEST_ID.quickOptionsContainer}
      >
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
  dueTime: propTypes.instanceOf(Date),
  onSelect: propTypes.func.isRequired,
};
