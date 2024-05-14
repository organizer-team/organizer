import React from 'react';
import AddTaskForm from '../AddTaskForm';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TEST_ID from '../AddTaskForm.testid';

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
    expect(areaSelector).toHaveValue('Inbox');
  });

  it('renders close button', () => {
    const closeButton = screen.getByTestId(TEST_ID.closeButton);
    expect(closeButton).toBeInTheDocument();
  });

  it('renders send button', () => {
    const sendButton = screen.getByTestId(TEST_ID.sendButton);
    expect(sendButton).toBeInTheDocument();
  });
});
