import React from 'react';
import AddTaskForm from '../AddTaskForm';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TEST_ID from '../AddTaskForm.testid';

describe('AddTaskForm', () => {
  it('renders the AddTaskForm component', () => {
    render(
      <MemoryRouter>
        <AddTaskForm toggleLeftSideMenu={() => {}} />
      </MemoryRouter>
    );

    // Assert that the component is rendered
    const AddTaskFormElement = screen.getByTestId(TEST_ID.element);
    expect(AddTaskFormElement).toBeInTheDocument();
  });
});
