import React from 'react';
import AddTaskForm from '../AddTaskForm';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TEST_ID from '../AddTaskForm.testid';
import TEST_ID_SCHEDULER from '../../Scheduler/Scheduler.testid';

describe('AddTaskForm', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <AddTaskForm />
      </MemoryRouter>
    );
  });

  it('renders the AddTaskForm component', () => {
    const container = screen.getByTestId(TEST_ID.container);
    expect(container).toBeInTheDocument();
  });

  it('renders task name input', () => {
    const nameInput = screen.getByTestId(TEST_ID.nameInput);
    expect(nameInput).toBeInTheDocument();
  });

  it('renders description textarea', () => {
    const description = screen.getByTestId(TEST_ID.description);
    expect(description).toBeInTheDocument();
  });

  it('renders due date selector', () => {
    const dueDateSelector = screen.getByTestId(TEST_ID.dueDateSelector);
    expect(dueDateSelector).toBeInTheDocument();
  });

  it('renders colour selector', () => {
    const colourSelector = screen.getByTestId(TEST_ID.colourSelector);
    expect(colourSelector).toBeInTheDocument();
  });

  it('renders area selector with default value as Inbox', () => {
    const areaSelector = screen.getByTestId(TEST_ID.areaSelector);
    expect(areaSelector).toBeInTheDocument();
    expect(areaSelector).toHaveTextContent('Inbox');
  });

  it('renders close button', () => {
    const closeButton = screen.getByTestId(TEST_ID.closeButton);
    expect(closeButton).toBeInTheDocument();
  });

  it('renders send button', () => {
    const sendButton = screen.getByTestId(TEST_ID.sendButton);
    expect(sendButton).toBeInTheDocument();
  });

  it('send button is disabled by default', () => {
    const sendButton = screen.getByTestId(TEST_ID.sendButton);
    expect(sendButton).toBeDisabled();
  });

  it('send button is enabled when task name is entered', async () => {
    const nameInput = screen.getByTestId(TEST_ID.nameInput);
    const sendButton = screen.getByTestId(TEST_ID.sendButton);
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'Task name' } });
    });
    expect(sendButton).toBeEnabled();
  });

  it('send button sends fetch to the server', async () => {
    const nameInput = screen.getByTestId(TEST_ID.nameInput);
    const sendButton = screen.getByTestId(TEST_ID.sendButton);
    fireEvent.change(nameInput, { target: { value: 'Task name' } });

    const fetch = jest.spyOn(global, 'fetch');

    await act(async () => {
      fireEvent.click(sendButton);
    });

    expect(fetch).toHaveBeenCalled();
  });

  it('opens scheduler on date selection button click', () => {
    const dateSelectionButton = screen.getByTestId(TEST_ID.dueDateSelector);
    fireEvent.click(dateSelectionButton);
    const scheduler = screen.getByTestId(TEST_ID_SCHEDULER.container);
    expect(scheduler).toBeInTheDocument();
  });

  it('renders quick options list and calendar month view in scheduler', () => {
    const dateSelectionButton = screen.getByTestId(TEST_ID.dueDateSelector);
    fireEvent.click(dateSelectionButton);
    const quickOptions = screen.getByTestId(TEST_ID_SCHEDULER.quickOptions);
    const calendarMonthView = screen.getByTestId(
      TEST_ID_SCHEDULER.calendarView
    );
    expect(quickOptions).toBeInTheDocument();
    expect(calendarMonthView).toBeInTheDocument();
  });

  it('The component should return the date (change the state of the passed object) according to the users choice.', async () => {
    const dateSelectionButton = screen.getByTestId(TEST_ID.dueDateSelector);
    fireEvent.click(dateSelectionButton);
    const date = screen.getByTestId(TEST_ID_SCHEDULER.nextWeekButton);
    fireEvent.click(date);

    const dateText = () => {
      const date = new Date();
      // Next monday
      date.setDate(date.getDate() + ((1 + 7 - date.getDay()) % 7));
      return date.toLocaleDateString();
    };

    const updatedDates = await screen.queryAllByText(dateText);

    expect(updatedDates.length).toBeGreaterThan(0);
  });
});
