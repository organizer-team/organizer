import React, { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import useFetch from '../../hooks/useFetch';

import TEST_ID from './AddTaskForm.testid';
import Popup from '../Popup/Popup';
import Scheduler from '../Scheduler/Scheduler';
import ColourSelector from '../ColourSelector/ColourSelector';
import AreaSelector from '../AreaSelector/AreaSelector';

const styles = {
  container: 'w-full border border-solid border-organizerGray flex flex-col ',
  form: 'm-3 flex flex-col space-y-4 overflow-hidden max-h-[80vh]',
  nameInput: 'w-full focus:outline-none',
  description: 'w-full focus:outline-none resize-none min-h-0',
  buttonRow: 'flex space-x-2 ',
  areaRow: 'flex justify-between',
  areaSelector: 'border px-2 py-1 border-solid border-organizerGray',
  closeButton:
    'mr-2 px-2 py-1 inline-block border border-solid border-organizerGray',
  sendButton: 'inline-block px-2 py-1 border border-solid border-organizerGray',
  dueDate: 'border px-2 py-1 border-solid border-organizerGray',
  colourSelector: 'border px-2 py-1 border-solid border-organizerGray',
  colourButton: {
    Red: 'bg-red-500 border-red-700 hover:bg-red-600 hover:border-red-600',
    Green:
      'bg-green-500 border-green-700 hover:bg-green-600 hover:border-green-600',
    Blue: 'bg-blue-500 border-blue-700 hover:bg-blue-600 hover:border-blue-600',
    Yellow:
      'bg-yellow-500 border-yellow-700 hover:bg-yellow-600 hover:border-yellow-600',
    Purple:
      'bg-purple-500 border-purple-700 hover:bg-purple-600 hover:border-purple-600',
    Orange:
      'bg-orange-500 border-orange-700 hover:bg-orange-600 hover:border-orange-600',
    Black:
      'bg-black border-black hover:bg-gray-700 hover:border-gray-700 text-white',
  },
};

const AddTaskForm = ({ onClose }) => {
  // Task details
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');

  const { performFetch } = useFetch(
    '/task/create',
    () => {
      // Close the form
      onClose();
    },
    'POST'
  );

  const handleClose = () => {
    if (taskName || description) {
      const confirmClose = window.confirm(
        'You have unsaved changes. Are you sure you want to close?'
      );
      if (!confirmClose) {
        return;
      }
    }
    // Close the window
    onClose();
  };

  const handleSend = () => {
    let endTime = dueDate ? dueDate.toISOString() : null;
    if (dueTime) {
      endTime = new Date(endTime);
      endTime.setHours(dueTime.getHours());
      endTime.setMinutes(dueTime.getMinutes());
      endTime.setSeconds(0);
      endTime = endTime.toISOString();
    }

    // Create the task object
    const task = {
      name: taskName,
      description: description,
      colour: colour,
      start_time: new Date().toISOString(),
      due_time: endTime,
      area: area, // areadId
    };
    // Send the task
    performFetch(task);
  };

  // Scheduler
  const [dueDate, setDueDate] = useState(null);
  const [dueTime, setDueTime] = useState(null);
  const [showScheduler, setShowScheduler] = useState(false);

  const handleDateSelect = (date, time) => {
    setDueDate(date);
    setDueTime(time);
    setShowScheduler(false);
  };

  const toggleScheduler = () => {
    setShowScheduler(!showScheduler);
  };

  // Colour selector
  const [colour, setColour] = useState(null);
  const [showColourSelector, setShowColourSelector] = useState(false);

  const toggleColourSelector = () => {
    setShowColourSelector(!showColourSelector);
  };

  const handleColourSelect = (colour) => {
    setColour(colour);
    setShowColourSelector(false);
  };

  // Area selector
  const [area, setArea] = useState('Inbox');
  const [showAreaSelector, setShowAreaSelector] = useState(false);

  const toggleAreaSelector = () => {
    setShowAreaSelector(!showAreaSelector);
  };

  const handleAreaSelect = (area) => {
    setArea(area);
    setShowAreaSelector(false);
  };

  // Resize form
  const formRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (formRef.current) {
        const formTop = formRef.current.getBoundingClientRect().top;
        const availableHeight = window.innerHeight - formTop;
        formRef.current.style.maxHeight = `${availableHeight * 0.95}px`;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Overfill
  const textAreaRef = useRef(null);
  useEffect(() => {
    textAreaRef.current.style.height = 'inherit';
    const scrollHeight = textAreaRef.current.scrollHeight;
    textAreaRef.current.style.height = `${scrollHeight}px`;
  }, [description]);

  return (
    <>
      <div className={styles.container} data-testid={TEST_ID.container}>
        <form ref={formRef} className={styles.form} data-testid={TEST_ID.form}>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Task name"
            className={styles.nameInput}
            data-testid={TEST_ID.nameInput}
          />
          <textarea
            ref={textAreaRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            style={{ minHeight: '20px', maxHeight: '100vh', overflow: 'auto' }}
            className={styles.description}
            data-testid={TEST_ID.description}
          />
          <div className={styles.buttonRow}>
            <button
              type="button"
              onClick={toggleScheduler}
              className={styles.dueDate}
              data-testid={TEST_ID.dueDateSelector}
            >
              {dueDate
                ? `${dueDate.toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })} ${
                    dueTime
                      ? dueTime.toLocaleTimeString(undefined, {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : ''
                  }`
                : 'Due date'}
            </button>
            <button
              type="button"
              onClick={toggleColourSelector}
              className={`${styles.colourSelector} ${colour ? styles.colourButton[colour] : ''}`}
              data-testid={TEST_ID.colourSelector}
            >
              {colour ? colour : 'Colour'}
            </button>
          </div>
          <div className={styles.areaRow}>
            <button
              type="button"
              onClick={toggleAreaSelector}
              className={styles.areaSelector}
              data-testid={TEST_ID.areaSelector}
            >
              {area}
            </button>
            <div>
              <button
                type="button"
                onClick={handleClose}
                className={styles.closeButton}
                data-testid={TEST_ID.closeButton}
              >
                Close
              </button>
              <button
                type="button"
                disabled={!taskName}
                className={styles.sendButton}
                onClick={handleSend}
                data-testid={TEST_ID.sendButton}
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
      {showScheduler && (
        <Popup isOpen={showScheduler} onClose={toggleScheduler} darken={false}>
          <Scheduler
            dueDate={dueDate}
            dueTime={dueTime}
            onSelect={handleDateSelect}
          />
        </Popup>
      )}
      {showColourSelector && (
        <Popup
          isOpen={showColourSelector}
          onClose={toggleColourSelector}
          darken={false}
        >
          <ColourSelector setColour={handleColourSelect} />
        </Popup>
      )}
      {showAreaSelector && (
        <Popup
          isOpen={showAreaSelector}
          onClose={toggleAreaSelector}
          darken={false}
        >
          <div>
            <AreaSelector setArea={handleAreaSelect} />
          </div>
        </Popup>
      )}
    </>
  );
};

AddTaskForm.propTypes = {
  onClose: propTypes.func,
};

export default AddTaskForm;
