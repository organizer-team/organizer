import React from 'react';
import Scheduler from '../Scheduler';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TEST_ID from '../Scheduler.testid';

describe('Scheduler', () => {
  const mockOnSelect = jest.fn();

  // Rendering: Check if the Scheduler component renders without crashing.
  it('renders the Scheduler component', () => {
    render(
      <MemoryRouter>
        <Scheduler onSelect={mockOnSelect} />
      </MemoryRouter>
    );

    // Assert that the component is rendered
    const schedulerContainer = screen.getByTestId(TEST_ID.container);
    expect(schedulerContainer).toBeInTheDocument();
  });

  // Quick options: Check if the quick options buttons are rendered.
  it('renders the quick options', () => {
    render(
      <MemoryRouter>
        <Scheduler onSelect={mockOnSelect} />
      </MemoryRouter>
    );

    const quickOptions = [
      'Today',
      'Tomorrow',
      'This weekend',
      'Next week',
      'No date',
    ];
    quickOptions.forEach((option) => {
      const optionElement = screen.getByText(option);
      expect(optionElement).toBeInTheDocument();
    });
  });

  // Quick options: Check if the quick options buttons trigger the correct date selection.
  it('selects the correct date when a quick option is clicked', () => {
    const onSelect = jest.fn();
    render(
      <MemoryRouter>
        <Scheduler onSelect={onSelect} />
      </MemoryRouter>
    );

    const quickOptions = [
      { option: 'Today', getDate: () => new Date() },
      {
        option: 'Tomorrow',
        getDate: () => {
          const date = new Date();
          date.setDate(date.getDate() + 1);
          return date;
        },
      },
      {
        option: 'This weekend',
        getDate: () => {
          const date = new Date();
          date.setDate(date.getDate() + (6 - date.getDay()));
          return date;
        },
      },
      {
        option: 'Next week',
        getDate: () => {
          const date = new Date();
          date.setDate(date.getDate() + (8 - date.getDay()));
          return date;
        },
      },
      { option: 'No date', getDate: () => null },
    ];

    quickOptions.forEach(({ option, getDate }) => {
      const expectedDate = getDate();

      const optionButton = screen.getByText(option);
      fireEvent.click(optionButton);

      if (expectedDate) {
        expectedDate.setMilliseconds(0);
        const receivedDate = new Date(onSelect.mock.calls[0][0]);
        receivedDate.setMilliseconds(0);
        expect(receivedDate).toEqual(expectedDate);
      } else {
        expect(onSelect.mock.calls[0][0]).toBeNull();
      }

      onSelect.mockClear(); // Clear the mock function's calls for the next iteration
    });
  });

  // Date selection: Check if the date selection is triggered correctly.
  it('selects the correct date when a date is clicked', () => {
    render(
      <MemoryRouter>
        <Scheduler onSelect={mockOnSelect} />
      </MemoryRouter>
    );

    const date = new Date();
    date.setHours(0, 0, 0, 0); // Set the time to midnight
    const dateButton = screen.getByText(date.getDate());
    fireEvent.click(dateButton);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(date);

    const otherDate = new Date();
    otherDate.setDate(otherDate.getDate() + 1);
    otherDate.setHours(0, 0, 0, 0);
    const otherDateButton = screen.getByText(otherDate.getDate());
    fireEvent.click(otherDateButton);
  });
});
