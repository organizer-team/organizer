import React, { useState, useEffect, useRef } from 'react';
import TEST_ID from './AddTaskForm.testid';

const styles = {
  container:
    'w-full border border-solid border-organizerGray flex flex-col min-h-0',
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
};

const AddTaskForm = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [area, setArea] = useState('Inbox');

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
            onClick={() => {}}
            className={styles.dueDate}
            data-testid={TEST_ID.dueDateSelector}
          >
            Due date
          </button>
          <button
            type="button"
            onClick={() => {}}
            className={styles.colourSelector}
            data-testid={TEST_ID.colourSelector}
          >
            Colour
          </button>
        </div>
        <div className={styles.areaRow}>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className={styles.areaSelector}
            data-testid={TEST_ID.areaSelector}
          >
            <option value="Inbox">Inbox</option>
            {/* Add other areas */}
            <option value="Area1">Area1</option>
            <option value="Area2">Area2</option>
            <option value="Area3">Area3</option>
          </select>
          <div>
            <button
              type="button"
              onClick={() => {}}
              className={styles.closeButton}
              data-testid={TEST_ID.closeButton}
            >
              Close
            </button>
            <button
              type="submit"
              className={styles.sendButton}
              data-testid={TEST_ID.sendButton}
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
